# EVI — Portfólio · Desenvolvedora Front-end

Portfólio pessoal em dark mode, construído com React + TypeScript + Vite + Tailwind CSS + Framer Motion, pronto para produção na Vercel.

**Todo o conteúdo do site (nome, textos, skills, projetos, experiência, cursos, contatos) vive em `src/data/` — você atualiza o portfólio editando apenas esses arquivos, sem tocar em nenhum componente.**

---

## Tecnologias

| Camada | Ferramenta |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite 7 |
| Estilo | Tailwind CSS 4 (tokens do design em `src/index.css`) |
| Animações | Framer Motion (com respeito a `prefers-reduced-motion`) |
| Ícones | lucide-react (interface) + react-icons (logos de tecnologias) |
| Formulário | Web3Forms (sem backend próprio) |
| Deploy | Vercel |

## Estrutura do projeto

```
portfolio/
├── index.html              → SEO: title, description, Open Graph, favicon
├── public/
│   ├── favicon.svg
│   ├── og.png              → imagem de compartilhamento (1200×630)
│   ├── profile-placeholder.svg
│   └── robots.txt
├── src/
│   ├── data/               ★ EDITE AQUI — todo o conteúdo do site
│   │   ├── profile.ts      → nome, textos, e-mail, telefone, links, foto, CV
│   │   ├── skills.ts       → categorias e tecnologias
│   │   ├── projects.ts     → projetos (cards + filtros automáticos)
│   │   ├── experience.ts   → timeline de experiência
│   │   └── education.ts    → formação, bootcamps, cursos, certificações
│   ├── components/
│   │   ├── layout/         → Header, Footer
│   │   ├── sections/       → Hero, About, Skills, Projects, Experience,
│   │   │                     Education, Contact
│   │   └── ui/             → Button, Reveal, SectionHeading, TechIcon,
│   │                         SocialLinks (reutilizáveis)
│   ├── hooks/              → useActiveSection, useTypingEffect
│   ├── types/              → contratos TypeScript dos dados
│   ├── index.css           → design tokens (cores, fontes) do site inteiro
│   ├── App.tsx
│   └── main.tsx
├── .env.example            → variáveis de ambiente documentadas
└── package.json
```

---

## Como executar localmente

```bash
npm install
npm run dev        # abre em http://localhost:5173
```

Build e conferência de produção:

```bash
npm run build      # gera dist/ (com checagem de tipos)
npm run preview    # serve o build em http://localhost:4173
```

---

## ✏️ Onde alterar cada coisa

### Seus dados pessoais
`src/data/profile.ts` — nome/marca, cargo, frase do hero, parágrafos do "Sobre mim", e-mail, telefone, localização, links de GitHub/LinkedIn/Instagram, foto e CV. Os campos entre `[colchetes]` são placeholders: troque antes de divulgar.

- **Sua foto:** salve em `public/` (ex.: `public/profile.jpg`) e mude `avatar: '/profile.jpg'`.
- **Seu CV:** salve em `public/cv.pdf` e mude `resumeUrl: '/cv.pdf'` — o botão "Baixar CV" aparece sozinho no menu e no rodapé.
- **Instagram:** preencha a URL para o ícone aparecer (vazio = oculto).
- Os cards de números (2+ anos, 15+ projetos…) também estão lá, em `stats`.

### Skills
`src/data/skills.ts` — 6 categorias (Front-end, Back-end, Ferramentas, Banco de dados, Versionamento, Outros). Cada skill aponta para um ícone registrado em `src/components/ui/TechIcon.tsx`; para uma tecnologia nova, adicione a chave lá (react-icons para logos, lucide para genéricos).

### Projetos (adicionar um novo = copiar um objeto)
`src/data/projects.ts`:

```ts
{
  id: 'meu-novo-app',
  name: 'Meu Novo App',
  description: 'O que ele faz, em uma frase.',
  image: '/projects/meu-novo-app.png', // '' = capa gerada automaticamente
  tags: ['React', 'TypeScript'],       // viram filtros sozinhas
  github: 'https://github.com/EVI-DEV1/meu-novo-app',
  demo: 'https://meu-novo-app.vercel.app', // '' oculta o botão
  featured: true,                      // selo "Destaque"
}
```

Capas: salve em `public/projects/` (crie a pasta) e aponte o caminho. Os **filtros por tecnologia se montam automaticamente** a partir das tags — nada mais a configurar.

⚠️ Os 4 projetos iniciais são **exemplos ilustrativos** — troque por projetos reais seus.

### ▲ Projetos automáticos da Vercel

Projeto novo na Vercel entra sozinho no portfólio. Toda hora, o GitHub Actions (`.github/workflows/sincronizar-vercel.yml`, só no `portfolio_`) roda `scripts/sincronizar-vercel.mjs`, que:

1. lista os projetos da sua conta na Vercel;
2. pula o que já está no portfólio (pelo link do deploy ou do GitHub), o que está em `ignorados` e o que já foi importado alguma vez — **apagar um card pelo painel admin não faz ele voltar**;
3. só aceita projeto com deploy de produção pronto e **repositório público** no `EVI-DEV1` (o ligado à Vercel ou o mesmo nome sem o `_` do fim). Sem repositório público, fica de fora e aparece no log — adicione pelo painel admin se quiser;
4. monta o card: nome pelo título da página publicada, descrição do GitHub, tags pelo `package.json` e pelas linguagens, **capa tirada do próprio deploy** (1280×800) e selo Destaque, no topo da lista;
5. commita em `src/data/projects.ts`, `public/projects/` e `scripts/vercel-sync.json` — a Vercel reconstrói o site.

Depois é só ajustar texto, tags ou ordem pelo painel admin, como qualquer outro card.

**Configurar (uma vez):**

1. Vercel → **Account Settings → Tokens → Create Token** · Scope: `ELIANE VITORIANO LUIZ's projects` · Expiration: a que preferir. Copie o valor.
2. GitHub → repositório **`portfolio_`** → **Settings → Secrets and variables → Actions → New repository secret** · Name: `VERCEL_TOKEN` · Secret: o valor copiado.
3. Aba **Actions** → **Projetos da Vercel no portfólio** → **Run workflow** para testar na hora (depois ele roda sozinho toda hora).

Rodar na sua máquina: `VERCEL_TOKEN=... node scripts/sincronizar-vercel.mjs --seco` mostra o que seria adicionado sem mexer em nada. Para nunca importar um projeto, coloque o nome dele em `ignorados`, em `scripts/vercel-sync.json`.

### Experiência e cursos
`src/data/experience.ts` (timeline) e `src/data/education.ts` (formação/bootcamps/cursos/certificações, com link de certificado opcional). Conteúdo inicial é exemplo/placeholder.

### Cores e fontes
`src/index.css`, bloco `@theme` — mudar `--color-primary` e vizinhas retema o site inteiro.

---

## 📬 Formulário de contato (Web3Forms)

O formulário envia mensagens direto para o seu e-mail via [Web3Forms](https://web3forms.com) — grátis, sem backend e sem criar conta com senha:

1. Acesse **web3forms.com**, informe seu e-mail e receba sua **Access Key**.
2. Local: `cp .env.example .env` e cole a chave em `VITE_WEB3FORMS_KEY`.
3. Vercel: **Settings → Environment Variables** → `VITE_WEB3FORMS_KEY` = sua chave → **Redeploy**.

Sem a chave o site continua funcionando: o formulário valida, mostra os estados de carregando/sucesso/erro e, se o envio não estiver configurado, orienta o visitante a usar o e-mail direto. Há honeypot anti-spam embutido.

---

## 🔐 Painel admin (`/#/admin`)

Área administrativa com login para editar o portfólio **sem abrir o código** — acessível pelo cadeado no rodapé ou digitando `/#/admin` no fim do endereço do site. Só quem sabe a senha vê ou publica qualquer coisa; não há link para ele em nenhuma navegação pública.

**O que dá para fazer (5 abas):** Projetos (adicionar, editar, reordenar, excluir, Destaque/Exemplo) · Perfil (nome, cargo, textos, contatos, redes, foto, CV e os 4 cards de números) · Skills (categorias e tecnologias, ícone escolhido numa lista — nunca texto livre) · Experiência (timeline) · Cursos (formação, bootcamps, certificações).

Cada aba tem três ações:

- **Publicar no site** — commita a mudança direto no repositório; a Vercel reconstrói sozinha (~1 min). É o caminho normal, sem terminal e sem git.
- **Salvar rascunho** — pré-visualiza a mudança só **neste navegador** (localStorage), sem publicar. Útil para conferir antes ("Ver site") ou quando a publicação ainda não está configurada. "Descartar rascunhos" volta ao que está publicado.
- **Exportar** — baixa o `.ts` pronto, plano B manual (substituir em `src/data/`, `npm run dev` para conferir, commit + push) para quando não há como configurar a publicação direta.

**Configurar (só precisa ser feito uma vez):**

1. **Senha** — `.env` local e Vercel (**Settings → Environment Variables**): `ADMIN_SECRET=sua_senha`. Ao contrário da antiga `VITE_ADMIN_PASSWORD`, essa variável **não tem prefixo `VITE_`** de propósito — ela só existe no servidor (funções em `/api`) e nunca é enviada ao navegador, então não dá para ler ela inspecionando o site.
2. **Token do GitHub** (permite o "Publicar no site" de verdade) — crie um *fine-grained personal access token*:
   - github.com → foto de perfil → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
   - Resource owner: `EVI-DEV1`. Repository access: **Only select repositories** → `portfolio_`.
   - Permissions → Repository permissions → **Contents: Read and write**.
   - Generate e copie o valor (`github_pat_...` — só aparece uma vez).
   - `.env` local e Vercel: `GITHUB_TOKEN=esse_valor`.
3. Redeploy na Vercel depois de adicionar as variáveis.

Sem essas duas variáveis, "Publicar no site" mostra um aviso explicando o que falta — nada quebra, "Salvar rascunho" e "Exportar" continuam funcionando normalmente.

> ⚠️ **Testar localmente:** `npm run dev` (Vite puro) não executa as funções em `/api` — para testar "Publicar no site" na sua máquina, rode `npx vercel dev` (que também lê as duas variáveis do `.env` local). Testar direto no site publicado depois de um `git push` também funciona.

> 🔒 **Sobre o token do GitHub:** ele é *fine-grained* e escopado só ao repositório `portfolio_`, só com permissão de conteúdo — o pior caso de vazamento é alguém mexer nos arquivos desse repositório, nunca na sua conta inteira do GitHub.

---

## 🚀 Como colocar no GitHub

```bash
git remote add origin https://github.com/EVI-DEV1/portfolio.git
git push -u origin main
```

(Crie antes o repositório vazio `portfolio` em github.com/new. O commit inicial já está feito. `.env` está no `.gitignore` — sua chave nunca sobe.)

## ▲ Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e entre com o GitHub.
2. **Add New → Project** → importe o repositório `portfolio`.
3. A Vercel detecta Vite sozinha (build `npm run build`, saída `dist`) — não mude nada.
4. Em **Environment Variables**, adicione `VITE_WEB3FORMS_KEY`.
5. **Deploy**. Cada `git push` na `main` vira um deploy automático.

### Domínio personalizado

1. No projeto na Vercel: **Settings → Domains → Add** → digite seu domínio.
2. No painel onde comprou o domínio, aponte o DNS conforme a Vercel indicar
   (CNAME `cname.vercel-dns.com` para subdomínio, ou A `76.76.21.21` para o domínio raiz).
3. HTTPS é automático.

**Depois do deploy:** troque `https://SEU-DOMINIO.vercel.app` pelas suas URLs reais nas metatags Open Graph do `index.html` (2 minutos, melhora o cartão de compartilhamento no WhatsApp/LinkedIn).

---

## ✅ Checklist antes de divulgar

- [ ] `src/data/profile.ts`: nome completo, e-mail e telefone reais
- [ ] Foto em `public/profile.jpg` + `avatar` atualizado
- [ ] CV em `public/cv.pdf` + `resumeUrl` atualizado (ativa o botão "Baixar CV")
- [ ] Projetos reais em `src/data/projects.ts` (com links de repositório/demonstração)
- [ ] Skills, experiência e cursos revisados
- [ ] `VITE_WEB3FORMS_KEY` configurada na Vercel
- [ ] URLs do Open Graph no `index.html` apontando para o domínio real
