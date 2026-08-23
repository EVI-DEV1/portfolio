import { Briefcase } from 'lucide-react'
import { experience } from '../../data/experience'
import { Reveal } from '../ui/Reveal'
import { Accent, SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  return (
    <section id="experiencia" aria-label="Experiência" className="relative bg-bg-deep">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8">
        <SectionHeading
          label="Experiência"
          lead="Os marcos da minha evolução profissional e acadêmica."
        >
          Minha jornada <Accent>profissional</Accent>
        </SectionHeading>

        {/* Desktop: linha horizontal · Mobile: linha vertical */}
        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* trilho horizontal (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 lg:block"
          />
          {experience.map((item, i) => (
            <Reveal key={`${item.period}-${item.title}`} delay={0.1 * i}>
              <li className="relative flex gap-5 lg:block">
                {/* trilho vertical (mobile) */}
                {i < experience.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[22px] top-12 h-[calc(100%+2rem)] w-px bg-gradient-to-b from-primary/50 to-primary/10 lg:hidden"
                  />
                )}
                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-surface text-primary-light shadow-[0_0_16px_-2px_rgba(139,92,246,0.5)]">
                  <Briefcase className="size-4.5" aria-hidden />
                </span>
                <div className="pb-2 lg:mt-6 lg:pb-0">
                  <p className="font-mono text-[0.72rem] font-semibold tracking-widest text-primary-light">
                    {item.period}
                  </p>
                  <h3 className="mt-1.5 font-display text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 max-w-[26ch] text-[0.85rem] leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
