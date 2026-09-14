// Sincroniza a Vercel com o portfólio: todo projeto novo na Vercel vira um card em src/data/projects.ts.
//
// Roda sozinho pelo GitHub Actions (.github/workflows/sincronizar-vercel.yml) e também à mão:
//   VERCEL_TOKEN=... node scripts/sincronizar-vercel.mjs              aplica
//   VERCEL_TOKEN=... node scripts/sincronizar-vercel.mjs --seco       só mostra o que faria
//   node scripts/sincronizar-vercel.mjs --projetos lista.json --seco   usa uma lista já baixada (vercel api /v9/projects)
//
// Regras (em scripts/vercel-sync.json):
//   - só entra projeto com deploy de produção pronto e com repositório PÚBLICO no GitHub da dona
//     (o ligado à Vercel ou o mesmo nome sem o "_" final — o padrão "repo_" privado + "repo" público);
//     projeto sem repositório público fica de fora e aparece no log para ser adicionado à mão;
//   - projeto que já está no portfólio (pelo link do deploy ou do GitHub) não é duplicado;
//   - projeto importado uma vez não volta se você apagar o card pelo painel admin;
//   - "ignorados" nunca entram.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ARQ_PROJETOS = path.join(RAIZ, 'src', 'data', 'projects.ts')
const ARQ_ESTADO = path.join(RAIZ, 'scripts', 'vercel-sync.json')
const PASTA_CAPAS = path.join(RAIZ, 'public', 'projects')

const args = process.argv.slice(2)
const seco = args.includes('--seco')
const valorDe = (nome) => (args.includes(nome) ? args[args.indexOf(nome) + 1] : null)
const arquivoProjetos = valorDe('--projetos')

const estado = JSON.parse(fs.readFileSync(ARQ_ESTADO, 'utf8'))
const DONO = estado.githubDono
const log = (...x) => console.log(...x)

// ---------------------------------------------------------------- Vercel
async function projetosDaVercel() {
  if (arquivoProjetos) return JSON.parse(fs.readFileSync(arquivoProjetos, 'utf8')).projects
  const token = process.env.VERCEL_TOKEN
  if (!token) throw new Error('Falta VERCEL_TOKEN (veja o README, seção "Projetos automáticos da Vercel").')
  const lista = []
  let ate = null
  do {
    const url = new URL('https://api.vercel.com/v9/projects')
    url.searchParams.set('limit', '100')
    if (estado.vercelTeamId) url.searchParams.set('teamId', estado.vercelTeamId)
    if (ate) url.searchParams.set('until', String(ate))
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) throw new Error(`Vercel respondeu ${res.status}: ${await res.text()}`)
    const corpo = await res.json()
    lista.push(...corpo.projects)
    ate = corpo.pagination && corpo.pagination.next
  } while (ate)
  return lista
}

// melhor endereço de produção: domínio próprio > nome.vercel.app curto; nunca o de branch ou com o nome do time
function enderecoDeProducao(projeto) {
  const prod = projeto.targets && projeto.targets.production
  if (!prod || prod.readyState !== 'READY') return null
  const aliases = (prod.alias || []).filter((a) => !/-git-/.test(a) && !/-projects\.vercel\.app$/.test(a))
  const proprio = aliases.find((a) => !a.endsWith('.vercel.app'))
  const escolhido = proprio || aliases.sort((a, b) => a.length - b.length)[0]
  return escolhido ? `https://${escolhido}` : null
}

// ---------------------------------------------------------------- GitHub
async function github(caminho) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-sync' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(`https://api.github.com${caminho}`, { headers })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub respondeu ${res.status} em ${caminho}`)
  return res.json()
}

async function repositorioPublico(projeto) {
  const link = projeto.link
  if (!link || link.type !== 'github' || String(link.org).toLowerCase() !== DONO.toLowerCase()) return null
  const candidatos = [...new Set([link.repo, link.repo.replace(/_+$/, '')])]
  for (const nome of candidatos) {
    const repo = await github(`/repos/${DONO}/${nome}`)
    if (repo && !repo.private) return repo
  }
  return null
}

const TECNOLOGIAS = [
  ['next', 'Next.js'], ['react', 'React'], ['vue', 'Vue'], ['svelte', 'Svelte'], ['three', 'Three.js'],
  ['tailwindcss', 'Tailwind CSS'], ['framer-motion', 'Framer Motion'], ['express', 'Express'],
  ['@prisma/client', 'Prisma'], ['zod', 'Zod'], ['vitest', 'Vitest'], ['styled-components', 'Styled Components'],
]
async function tecnologias(repo) {
  const tags = []
  const pacote = await github(`/repos/${repo.full_name}/contents/package.json`)
  if (pacote && pacote.content) {
    try {
      const pkg = JSON.parse(Buffer.from(pacote.content, 'base64').toString('utf8'))
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }
      for (const [dep, nome] of TECNOLOGIAS) if (deps[dep]) tags.push(nome)
    } catch {
      /* package.json ilegível: segue só com as linguagens */
    }
  }
  const linguagens = (await github(`/repos/${repo.full_name}/languages`)) || {}
  for (const nome of Object.keys(linguagens).slice(0, 4)) if (!tags.includes(nome)) tags.push(nome)
  return tags.slice(0, 6)
}

// ---------------------------------------------------------------- a página publicada
async function lerPagina(url) {
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) return {}
    const html = await res.text()
    const titulo = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1]
    const descricao = (html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || [])[1]
    return { titulo: titulo && titulo.trim(), descricao: descricao && descricao.trim() }
  } catch {
    return {}
  }
}

const tituloDoRepo = (nome) => nome.replace(/_+$/, '').split(/[-_.]+/).filter(Boolean).map((p) => p[0].toUpperCase() + p.slice(1)).join(' ')
// "Nome — Subtítulo · detalhe" → "Nome — Subtítulo": o que vem depois do primeiro " · " ou " | " é complemento
const tituloCurto = (t) => t.split(/\s[·|]\s/)[0].trim().replace(/\s[—–-]\s/g, ' · ')
const comPonto = (t) => (/[.!?…]$/.test(t.trim()) ? t.trim() : `${t.trim()}.`)

function capturarCapa(url, destino) {
  const edge = process.env.NAVEGADOR_CAPA
  if (edge) {
    execFileSync(edge, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1280,800', '--virtual-time-budget=8000', `--screenshot=${destino}`, url], { stdio: 'ignore', timeout: 60000 })
  } else {
    execFileSync('npx', ['--yes', `playwright@${estado.playwright}`, 'screenshot', '--viewport-size=1280, 800', '--wait-for-timeout=6000', url, destino], { stdio: 'inherit', timeout: 120000, shell: process.platform === 'win32' })
  }
  return fs.existsSync(destino) && fs.statSync(destino).size > 5000
}

// ---------------------------------------------------------------- projects.ts
function inserirNoTopo(texto, projeto) {
  const abertura = texto.match(/export const projects:\s*Project\[\]\s*=\s*\[/)
  if (!abertura) throw new Error('Não achei "export const projects: Project[] = [" em src/data/projects.ts')
  const fim = abertura.index + abertura[0].length
  return `${texto.slice(0, fim)}\n${paraTs(projeto)},${texto.slice(fim)}`
}

// mesmo estilo dos cards escritos à mão: chaves sem aspas, aspas simples, vírgula final
function paraTs(projeto) {
  const texto = (v) => `'${String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  const linhas = Object.entries(projeto).map(([k, v]) => {
    if (Array.isArray(v)) return `    ${k}: [${v.map(texto).join(', ')}],`
    if (typeof v === 'boolean') return `    ${k}: ${v},`
    if (k === 'description') return `    ${k}:\n      ${texto(v)},`
    return `    ${k}: ${texto(v)},`
  })
  return `  {\n${linhas.join('\n')}\n  }`
}

// ---------------------------------------------------------------- principal
const projetos = await projetosDaVercel()
let texto = fs.readFileSync(ARQ_PROJETOS, 'utf8')
const idsExistentes = new Set([...texto.matchAll(/["']?id["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1]))
const jaNoPortfolio = (url, repos) => {
  const t = texto.toLowerCase()
  if (url && t.includes(new URL(url).host.toLowerCase())) return true
  return repos.some((r) => t.includes(`github.com/${DONO}/${r}`.toLowerCase() + "'") || t.includes(`github.com/${DONO}/${r}`.toLowerCase() + '"'))
}

const adicionados = []
for (const projeto of projetos.sort((a, b) => a.createdAt - b.createdAt)) {
  const nome = projeto.name
  if (estado.ignorados.includes(nome)) continue
  if (estado.importados.includes(projeto.id)) continue
  const url = enderecoDeProducao(projeto)
  const linkRepos = projeto.link && projeto.link.repo ? [projeto.link.repo, projeto.link.repo.replace(/_+$/, '')] : []
  if (jaNoPortfolio(url, linkRepos)) {
    log(`= ${nome}: já está no portfólio`)
    estado.importados.push(projeto.id)
    continue
  }
  if (!url) {
    log(`… ${nome}: ainda sem deploy de produção pronto — tento de novo na próxima rodada`)
    continue
  }
  const repo = await repositorioPublico(projeto)
  if (!repo) {
    log(`- ${nome}: sem repositório público em ${DONO} — fica de fora (adicione pelo painel admin se quiser)`)
    continue
  }
  if (jaNoPortfolio(null, [repo.name])) {
    log(`= ${nome}: já está no portfólio (pelo GitHub)`)
    estado.importados.push(projeto.id)
    continue
  }

  const pagina = await lerPagina(url)
  let id = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  while (idsExistentes.has(id)) id = `${id}-2`
  const card = {
    id,
    name: pagina.titulo ? tituloCurto(pagina.titulo) : tituloDoRepo(repo.name),
    description: comPonto(repo.description || pagina.descricao || `Projeto publicado na Vercel: ${url.replace('https://', '')}`),
    image: '',
    tags: await tecnologias(repo),
    github: repo.html_url,
    demo: url,
    featured: true,
  }
  if (!seco) {
    fs.mkdirSync(PASTA_CAPAS, { recursive: true })
    const destino = path.join(PASTA_CAPAS, `${id}.png`)
    try {
      if (capturarCapa(url, destino)) card.image = `/projects/${id}.png`
    } catch (e) {
      log(`  capa de ${nome} falhou (${e.message.split('\n')[0]}) — o site gera uma capa automática`)
    }
    texto = inserirNoTopo(texto, card)
    estado.importados.push(projeto.id)
  }
  idsExistentes.add(id)
  adicionados.push(card)
  log(`+ ${nome}: ${card.name} · ${card.demo}`)
}

if (!seco) {
  fs.writeFileSync(ARQ_PROJETOS, texto)
  fs.writeFileSync(ARQ_ESTADO, `${JSON.stringify(estado, null, 2)}\n`)
  // prova: o arquivo continua importável e os cards novos estão lá
  const mod = await import(`${new URL(`file:///${ARQ_PROJETOS.replace(/\\/g, '/')}`).href}?t=${Date.now()}`)
  for (const c of adicionados) if (!mod.projects.some((p) => p.id === c.id)) throw new Error(`${c.id} não aparece em projects.ts depois de gravar`)
}
log(adicionados.length ? `\n${adicionados.length} projeto(s) ${seco ? 'seriam adicionados' : 'adicionado(s)'}: ${adicionados.map((c) => c.id).join(', ')}` : '\nNada novo na Vercel.')
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `adicionados=${adicionados.map((c) => c.name).join(', ')}\n`)
