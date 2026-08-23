import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Button } from '../ui/Button'

const NAV_LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'skills', label: 'Skills' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'cursos', label: 'Cursos' },
  { id: 'contato', label: 'Contato' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduce = useReducedMotion()
  const ids = useMemo(() => NAV_LINKS.map((l) => l.id), [])
  const active = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // trava o scroll do body enquanto o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-bg-deep/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <a
          href="#inicio"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-ink"
          aria-label={`${profile.brand} — voltar ao início`}
        >
          {profile.brand}
          <span className="rounded-md bg-gradient-to-r from-primary to-fuchsia-glow px-1.5 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-white">
            dev
          </span>
        </a>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active === link.id ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-primary-light to-fuchsia-glow shadow-[0_0_8px_1px_rgba(168,85,247,0.7)]"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {profile.resumeUrl ? (
            <Button href={profile.resumeUrl} download size="sm" className="hidden sm:inline-flex">
              Baixar CV
              <Download className="size-4" aria-hidden />
            </Button>
          ) : null}

          {/* Menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-line-strong hover:bg-white/[0.04] lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Painel mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navegação principal"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="border-b border-line bg-bg-deep/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto max-w-6xl space-y-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`block rounded-lg px-4 py-3 text-[0.95rem] font-medium transition-colors ${
                      active === link.id
                        ? 'bg-primary/15 text-ink'
                        : 'text-ink-soft hover:bg-white/[0.04] hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {profile.resumeUrl ? (
                <li className="pt-2">
                  <Button href={profile.resumeUrl} download className="w-full">
                    Baixar CV
                    <Download className="size-4" aria-hidden />
                  </Button>
                </li>
              ) : null}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
