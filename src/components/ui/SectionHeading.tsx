import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Rótulo pequeno acima do título (ex.: "Sobre mim"). */
  label: string
  /** Título — use <Accent> para a palavra em violeta. */
  children: ReactNode
  /** Parágrafo de apoio opcional. */
  lead?: string
  align?: 'left' | 'center'
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-gradient">{children}</span>
}

export function SectionHeading({ label, children, lead, align = 'left' }: SectionHeadingProps) {
  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      <p
        className={`font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary-light ${
          align === 'center' ? 'justify-center' : ''
        } flex items-center gap-2`}
      >
        <span className="inline-block size-1.5 rounded-full bg-primary-light shadow-[0_0_8px_2px_rgba(167,139,250,0.6)]" />
        {label}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
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
