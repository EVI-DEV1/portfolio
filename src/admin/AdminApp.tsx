import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowLeft,
  Award,
  Briefcase,
  CheckCircle2,
  FolderGit2,
  Info,
  KeyRound,
  Loader2,
  LogOut,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { clearDrafts, hasDraft, loadEducation, loadExperience, loadProfile, loadProjects, loadSkillCategories, loadStats } from '../lib/content'
import { Button } from '../components/ui/Button'
import { ProfileEditor } from './ProfileEditor'
import { ProjectsEditor } from './ProjectsEditor'
import { SkillsEditor } from './SkillsEditor'
import { ExperienceEditor } from './ExperienceEditor'
import { EducationEditor } from './EducationEditor'
import { fieldClass, labelClass, VERCEL_DEV_HINT } from './adminUi'

/**
 * Painel administrativo (/#/admin).
 *
 * A senha (ADMIN_SECRET) só existe no servidor — o login e cada
 * publicação são conferidos em /api/admin-login e /api/publish, nunca
 * no navegador. "Salvar rascunho" continua guardando no localStorage
 * DESTE navegador (pré-visualização); "Publicar no site" commita
 * direto no repositório e a Vercel reconstrói sozinha.
 */

const AUTH_KEY = 'evi-admin:session'
const SECRET_KEY = 'evi-admin:secret'

type Tab = 'perfil' | 'projetos' | 'skills' | 'experiencia' | 'cursos'

function Login({ onSuccess }: { onSuccess: (password: string) => void }) {
  const [error, setError] = useState<string | null>(null)
  const [notConfigured, setNotConfigured] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const password = String(new FormData(event.currentTarget).get('password') ?? '')
    setLoading(true)
    setError(null)
    setNotConfigured(false)
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!(res.headers.get('content-type') ?? '').includes('application/json')) {
        setError(VERCEL_DEV_HINT)
        return
      }
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (res.status === 503) {
        setNotConfigured(true)
        return
      }
      if (!res.ok || !data?.ok) {
        setError(data?.error ?? 'Senha incorreta.')
        return
      }
      sessionStorage.setItem(AUTH_KEY, '1')
      sessionStorage.setItem(SECRET_KEY, password)
      onSuccess(password)
    } catch {
      setError('Não consegui falar com /api/admin-login — confira sua internet.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg-deep px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl card-glass p-8" aria-label="Login da área administrativa">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary-light">
            <ShieldCheck className="size-5" aria-hidden />
          </span>
          <div>
            <h1 className="font-display text-lg font-bold text-ink">Área administrativa</h1>
            <p className="text-[0.8rem] text-ink-soft">Edite seu portfólio sem abrir o código</p>
          </div>
        </div>

        {notConfigured ? (
          <div className="rounded-xl border border-line bg-white/[0.03] p-4 text-[0.85rem] leading-relaxed text-ink-soft">
            <p className="mb-2 font-semibold text-ink">Painel ainda sem senha configurada.</p>
            <p>
              Na Vercel: <strong className="text-ink">Settings → Environment Variables</strong>, adicione{' '}
              <code className="font-mono text-primary-soft">ADMIN_SECRET</code> com a senha que você quiser e faça
              redeploy. Localmente, coloque a mesma variável no seu <code className="font-mono text-primary-soft">.env</code>{' '}
              e teste com <code className="font-mono text-primary-soft">npx vercel dev</code> (o{' '}
              <code className="font-mono text-primary-soft">npm run dev</code> normal não roda as funções do painel).
              Veja o passo a passo completo no README.
            </p>
          </div>
        ) : (
          <>
            <label htmlFor="admin-password" className={labelClass}>
              Senha
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className={fieldClass}
              onChange={() => setError(null)}
            />
            {error && (
              <p role="alert" className="mt-2 text-[0.8rem] text-danger">
                {error}
              </p>
            )}
            <Button type="submit" className="mt-5 w-full" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <KeyRound className="size-4" aria-hidden />}
              Entrar
            </Button>
          </>
        )}

        <a
          href="/"
          className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Voltar para o site
        </a>
      </form>
    </main>
  )
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [secret, setSecret] = useState(() => sessionStorage.getItem(SECRET_KEY) ?? '')
  const [tab, setTab] = useState<Tab>('projetos')
  const [status, setStatus] = useState<{ at: Date; kind: 'draft' | 'publish' } | null>(null)
  const [draft, setDraft] = useState(hasDraft)

  if (!authed) {
    return (
      <Login
        onSuccess={(password) => {
          setSecret(password)
          setAuthed(true)
        }}
      />
    )
  }

  function handleSaved(kind: 'draft' | 'publish') {
    setStatus({ at: new Date(), kind })
    setDraft(true)
  }

  function handleReset() {
    if (window.confirm('Descartar os rascunhos deste navegador e voltar ao conteúdo publicado?')) {
      clearDrafts()
      window.location.reload()
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY)
    sessionStorage.removeItem(SECRET_KEY)
    setAuthed(false)
  }

  const tabClass = (active: boolean) =>
    `flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
      active
        ? 'border-transparent bg-gradient-to-r from-primary to-fuchsia-glow text-white'
        : 'border-line bg-white/[0.03] text-ink-soft hover:border-line-strong hover:text-ink'
    }`

  return (
    <main className="min-h-dvh bg-bg-deep pb-20">
      <header className="border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-4 px-5 py-4">
          <span className="flex items-center gap-2 font-display text-lg font-bold text-ink">
            <ShieldCheck className="size-5 text-primary-light" aria-hidden />
            Admin
          </span>
          <span className="hidden font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint sm:block">
            Portfólio EVI
          </span>
          <div className="ml-auto flex items-center gap-2">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[0.8rem] text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Ver site
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[0.8rem] text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
            >
              <LogOut className="size-3.5" aria-hidden />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5">
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/[0.07] p-4 text-[0.83rem] leading-relaxed text-ink-soft">
          <Info className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden />
          <p>
            <strong className="text-ink">Como funciona:</strong> <strong className="text-ink">Publicar no site</strong>{' '}
            commita direto no repositório — a Vercel reconstrói sozinha em ~1 min. Se preferir só pré-visualizar
            primeiro, <strong className="text-ink">Salvar rascunho</strong> muda o site apenas <em>neste navegador</em>{' '}
            (clique em "Ver site" para conferir); "Exportar" continua disponível como plano B caso a publicação ainda
            não esteja configurada.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setTab('projetos')} className={tabClass(tab === 'projetos')} aria-pressed={tab === 'projetos'}>
            <FolderGit2 className="size-4" aria-hidden />
            Projetos
          </button>
          <button type="button" onClick={() => setTab('perfil')} className={tabClass(tab === 'perfil')} aria-pressed={tab === 'perfil'}>
            <UserRound className="size-4" aria-hidden />
            Perfil
          </button>
          <button type="button" onClick={() => setTab('skills')} className={tabClass(tab === 'skills')} aria-pressed={tab === 'skills'}>
            <Sparkles className="size-4" aria-hidden />
            Skills
          </button>
          <button
            type="button"
            onClick={() => setTab('experiencia')}
            className={tabClass(tab === 'experiencia')}
            aria-pressed={tab === 'experiencia'}
          >
            <Briefcase className="size-4" aria-hidden />
            Experiência
          </button>
          <button type="button" onClick={() => setTab('cursos')} className={tabClass(tab === 'cursos')} aria-pressed={tab === 'cursos'}>
            <Award className="size-4" aria-hidden />
            Cursos
          </button>

          {draft && (
            <button
              type="button"
              onClick={handleReset}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[0.8rem] text-ink-soft transition-colors hover:border-danger/50 hover:text-danger"
            >
              <RotateCcw className="size-3.5" aria-hidden />
              Descartar rascunhos
            </button>
          )}
        </div>

        {status && (
          <p role="status" className="mt-4 flex items-center gap-2 text-[0.83rem] text-success">
            <CheckCircle2 className="size-4" aria-hidden />
            {status.kind === 'publish'
              ? `Publicado às ${status.at.toLocaleTimeString('pt-BR')} — a Vercel está reconstruindo o site, a mudança aparece em ~1 min.`
              : `Rascunho salvo às ${status.at.toLocaleTimeString('pt-BR')} — abra "Ver site" para conferir.`}
          </p>
        )}

        <div className="mt-6">
          {tab === 'projetos' && <ProjectsEditor initial={loadProjects()} secret={secret} onSaved={handleSaved} />}
          {tab === 'perfil' && <ProfileEditor initial={loadProfile()} initialStats={loadStats()} secret={secret} onSaved={handleSaved} />}
          {tab === 'skills' && <SkillsEditor initial={loadSkillCategories()} secret={secret} onSaved={handleSaved} />}
          {tab === 'experiencia' && <ExperienceEditor initial={loadExperience()} secret={secret} onSaved={handleSaved} />}
          {tab === 'cursos' && <EducationEditor initial={loadEducation()} secret={secret} onSaved={handleSaved} />}
        </div>
      </div>
    </main>
  )
}
