import { Award, BookMarked, ExternalLink, GraduationCap, Medal } from 'lucide-react'
import { education } from '../../data/education'
import type { EducationKind } from '../../types'
import { Reveal } from '../ui/Reveal'
import { Accent, SectionHeading } from '../ui/SectionHeading'

const KIND_META: Record<
  EducationKind,
  { Icon: typeof GraduationCap; badge: string }
> = {
  Formação: { Icon: GraduationCap, badge: 'border-sky-300/40 bg-sky-400/10 text-sky-200' },
  Bootcamp: { Icon: Medal, badge: 'border-fuchsia-300/40 bg-fuchsia-400/10 text-fuchsia-200' },
  Curso: { Icon: BookMarked, badge: 'border-primary/45 bg-primary/10 text-primary-soft' },
  Certificação: { Icon: Award, badge: 'border-emerald-300/40 bg-emerald-400/10 text-emerald-200' },
}

export function Education() {
  return (
    <section id="cursos" aria-label="Formação e cursos" className="relative bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8">
        <SectionHeading
          lead="Formação acadêmica, bootcamps e certificações que sustentam meu trabalho."
        >
          Cursos e <Accent>certificações</Accent>
        </SectionHeading>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {education.map((item, i) => {
            const { Icon, badge } = KIND_META[item.kind]
            return (
              <Reveal key={`${item.title}-${item.institution}`} delay={0.07 * i}>
                <article className="group flex h-full items-start gap-4 rounded-2xl card-glass p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-light/40 hover:shadow-[0_16px_40px_-12px_rgba(139,92,246,0.3)]">
                  {item.badge ? (
                    <span className="mt-0.5 inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.04] p-1 transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={item.badge}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(139,92,246,0.35)]"
                      />
                    </span>
                  ) : (
                    <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-fuchsia-glow/15 text-primary-soft">
                      <Icon className="size-5" aria-hidden />
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-widest ${badge}`}
                      >
                        {item.kind}
                      </span>
                      {item.period ? (
                        <span className="font-mono text-[0.68rem] text-ink-faint">{item.period}</span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 font-display text-[0.95rem] font-bold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[0.82rem] text-ink-soft">{item.institution}</p>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-primary-light transition-colors hover:text-primary-soft"
                      >
                        Ver certificado
                        <ExternalLink className="size-3.5" aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
