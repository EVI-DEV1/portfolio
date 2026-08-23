import { Suspense, lazy, useEffect, useState } from 'react'
import { Starfield } from './components/ui/Starfield'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Education } from './components/sections/Education'
import { Contact } from './components/sections/Contact'

// O painel admin só é baixado quando alguém abre /#/admin
const AdminApp = lazy(() => import('./admin/AdminApp'))

function useIsAdminRoute(): boolean {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash.startsWith('#/admin'))

  useEffect(() => {
    const onHashChange = () => setIsAdmin(window.location.hash.startsWith('#/admin'))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return isAdmin
}

export default function App() {
  const isAdmin = useIsAdminRoute()

  if (isAdmin) {
    return (
      <Suspense
        fallback={
          <main className="flex min-h-dvh items-center justify-center bg-bg-deep">
            <p className="font-mono text-sm text-ink-soft">Carregando painel…</p>
          </main>
        }
      >
        <AdminApp />
      </Suspense>
    )
  }

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Starfield />
    </>
  )
}
