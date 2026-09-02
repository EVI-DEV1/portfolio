import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Publica um arquivo de src/data/ direto no repositório que a Vercel
 * observa (commit via API do GitHub) — dispara o rebuild automático
 * que já existe. `file` é validado contra uma lista fixa: nunca um
 * caminho vindo do cliente sem checar.
 */

const REPO_OWNER = 'EVI-DEV1'
const REPO_NAME = 'portfolio_'
const BRANCH = 'main'

const ALLOWED_FILES = ['profile', 'projects', 'skills', 'experience', 'education'] as const
type AllowedFile = (typeof ALLOWED_FILES)[number]

function isAllowedFile(value: unknown): value is AllowedFile {
  return typeof value === 'string' && (ALLOWED_FILES as readonly string[]).includes(value)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método não permitido.' })
    return
  }

  const secret = process.env.ADMIN_SECRET
  const githubToken = process.env.GITHUB_TOKEN
  if (!secret || !githubToken) {
    res.status(503).json({
      ok: false,
      error: 'Publicação ainda não configurada — falta ADMIN_SECRET e/ou GITHUB_TOKEN na Vercel (veja o README).',
    })
    return
  }

  const { file, password, content } = (req.body ?? {}) as {
    file?: string
    password?: string
    content?: string
  }

  if (typeof password !== 'string' || password !== secret) {
    res.status(401).json({ ok: false, error: 'Senha incorreta.' })
    return
  }
  if (!isAllowedFile(file)) {
    res.status(400).json({ ok: false, error: 'Arquivo inválido.' })
    return
  }
  if (typeof content !== 'string' || content.trim().length === 0) {
    res.status(400).json({ ok: false, error: 'Conteúdo vazio.' })
    return
  }

  const path = `src/data/${file}.ts`
  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`
  const githubHeaders = {
    Authorization: `Bearer ${githubToken}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  try {
    const currentRes = await fetch(`${apiUrl}?ref=${BRANCH}`, { headers: githubHeaders })
    if (!currentRes.ok) {
      const body = await currentRes.text()
      res.status(502).json({ ok: false, error: `GitHub não achou o arquivo atual (${currentRes.status}): ${body}` })
      return
    }
    const current = (await currentRes.json()) as { sha: string }

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: { ...githubHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `chore(admin): publica ${file}.ts via painel`,
        content: Buffer.from(content, 'utf-8').toString('base64'),
        sha: current.sha,
        branch: BRANCH,
      }),
    })

    if (!putRes.ok) {
      const body = await putRes.text()
      res.status(502).json({ ok: false, error: `GitHub recusou o commit (${putRes.status}): ${body}` })
      return
    }

    const result = (await putRes.json()) as { commit?: { html_url?: string } }
    res.status(200).json({ ok: true, commitUrl: result.commit?.html_url ?? null })
  } catch (err) {
    res.status(502).json({ ok: false, error: `Erro ao falar com o GitHub: ${(err as Error).message}` })
  }
}
