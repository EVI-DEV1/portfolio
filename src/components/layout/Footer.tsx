import { Heart, Lock } from 'lucide-react'
import { profile } from '../../lib/content'
import { SocialLinks } from '../ui/SocialLinks'

const FOOTER_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#skills', label: 'Skills' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#cursos', label: 'Cursos' },
  { href: '#contato', label: 'Contato' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-bg-deep">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-xl font-bold text-ink">
              {profile.brand}
              <span className="rounded-md bg-gradient-to-r from-primary to-fuchsia-glow px-1.5 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-white">
                dev
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              Transformando ideias em experiências digitais incríveis.
            </p>
            <SocialLinks className="mt-5" />
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Navegação
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Contato
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {profile.email}
                </a>
              </li>
              <li className="text-sm text-ink-soft">{profile.location}</li>
              {profile.resumeUrl ? (
                <li>
                  <a
                    href={profile.resumeUrl}
                    download
                    className="text-sm text-primary-light transition-colors hover:text-primary-soft"
                  >
                    Baixar currículo
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="text-[0.8rem] text-ink-faint">
            © {year} {profile.brand}. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1.5 text-[0.8rem] text-ink-faint">
            Feito com
            <Heart className="size-3.5 fill-primary-light text-primary-light" aria-hidden />
            <span className="sr-only">amor</span>
            e React
            <a
              href="#/admin"
              aria-label="Área administrativa"
              title="Área administrativa"
              className="ml-2 inline-flex size-7 items-center justify-center rounded-lg border border-line text-ink-faint transition-colors hover:border-line-strong hover:text-ink"
            >
              <Lock className="size-3.5" aria-hidden />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
