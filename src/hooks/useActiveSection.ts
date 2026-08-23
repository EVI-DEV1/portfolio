import { useEffect, useState } from 'react'

/**
 * Observa as seções da página e devolve o id da que está em foco,
 * para o menu destacar o link ativo durante o scroll.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      // faixa central da viewport: a seção que a ocupa é a ativa
      { rootMargin: '-40% 0px -55% 0px' },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
