import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  FolderGit2,
  Info,
  KeyRound,
  LogOut,
  RotateCcw,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { clearDrafts, hasDraft, loadProfile, loadProjects } from '../lib/content'
import { Button } from '../components/ui/Button'
import { ProfileEditor } from './ProfileEditor'
import { ProjectsEditor } from './ProjectsEditor'
import { fieldClass, labelClass } from './adminUi'

/**
 * Painel administrativo (/#/admin).
 *
 * IMPORTANTE (site estático, sem servidor):
 * - A senha vem de VITE_ADMIN_PASSWORD e é embutida no código do
 *   navegador — o login é um portão de conveniência, não segurança
 *   real. Não reutilize uma senha importante aqui.
 * - "Salvar rascunho" guarda no localStorage DESTE navegador (bom
 *   para pré-visualizar). Para publicar para todo mundo: Exportar
 *   o arquivo, substituir em src/data/ e fazer commit + push.
 */

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined
const AUTH_KEY = 'evi-admin:session'

type Tab = 'perfil' | 'projetos'

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const password = new FormData(event.currentTarget).get('password')
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1')
      onSuccess()
    } else {
      setError(true)
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

        {ADMIN_PASSWORD ? (
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
              onChange={() => setError(false)}
            />
            {error && (
              <p role="alert" className="mt-2 text-[0.8rem] text-danger">
                Senha incorreta — confira o valor de VITE_ADMIN_PASSWORD.
              </p>
            )}
            <Button type="submit" className="mt-5 w-full">
              <KeyRound className="size-4" aria-hidden />
              Entrar
            </Button>
          </>
        ) : (
          <div className="rounded-xl border border-line bg-white/[0.03] p-4 text-[0.85rem] leading-relaxed text-ink-soft">
            <p className="mb-2 font-semibold text-ink">Painel ainda sem senha configurada.</p>
            <p>
              Crie um arquivo <code className="font-mono text-primary-soft">.env</code> na raiz do projeto com{' '}
              <code className="font-mono text-primary-soft">VITE_ADMIN_PASSWORD=sua_senha</code> e rode{' '}
              <code className="font-mono text-primary-soft">npm run dev</code> de novo. Na Vercel, adicione a mesma
              variável em Settings → Environment Variables.
            </p>
          </div>
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
  const [tab, setTab] = useState<Tab>('projetos')
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [draft, setDraft] = useState(hasDraft)

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />

  function handleSaved() {
    setSavedAt(new Date())
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
            <strong className="text-ink">Como funciona:</strong> “Salvar rascunho” muda o site só{' '}
            <em>neste navegador</em> (pré-visualização). Para publicar para todo mundo, clique em{' '}
            <strong className="text-ink">Exportar</strong>, substitua o arquivo correspondente em{' '}
            <code className="font-mono text-primary-soft">src/data/</code> e faça commit + push — a Vercel republica
            sozinha.
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

        {savedAt && (
          <p role="status" className="mt-4 flex items-center gap-2 text-[0.83rem] text-success">
            <CheckCircle2 className="size-4" aria-hidden />
            Rascunho salvo às {savedAt.toLocaleTimeString('pt-BR')} — abra “Ver site” para conferir.
          </p>
        )}

        <div className="mt-6">
          {tab === 'projetos' ? (
            <ProjectsEditor initial={loadProjects()} onSaved={handleSaved} />
          ) : (
            <ProfileEditor initial={loadProfile()} onSaved={handleSaved} />
          )}
        </div>
      </div>
    </main>
  )
}
