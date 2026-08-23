import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Título — use <Accent> para a palavra em violeta. */
  children: ReactNode
  /** Parágrafo de apoio opcional. */
  lead?: string
  align?: 'left' | 'center'
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-gradient">{children}</span>
}

export function SectionHeading({ children, lead, align = 'left' }: SectionHeadingProps) {
  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
        {children}
      </h2>
      {lead ? (
        <p className={`mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft ${align === 'center' ? 'mx-auto' : ''}`}>
          {lead}
        </p>
      ) : null}
    </Reveal>
  )
}
