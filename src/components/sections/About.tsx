import type { ComponentType } from 'react'
import { ArrowRight, BookOpen, Code2, Rocket, Users } from 'lucide-react'
import { profile, stats } from '../../lib/content'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Accent, SectionHeading } from '../ui/SectionHeading'

const STAT_ICONS: Record<string, ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  Rocket,
  Code2,
  Users,
  BookOpen,
}

export function About() {
  return (
    <section id="sobre" aria-label="Sobre mim" className="relative bg-bg">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionHeading>
            Conheça minha <Accent>trajetória</Accent>
          </SectionHeading>

          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-ink-soft">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Button
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mt-8"
            >
              Saiba mais sobre mim
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat, i) => {
            const Icon = STAT_ICONS[stat.icon] ?? Rocket
            return (
              <Reveal key={stat.label} delay={0.08 * i}>
                <article className="group h-full rounded-2xl card-glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-light/40 hover:shadow-[0_16px_40px_-12px_rgba(139,92,246,0.35)]">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-fuchsia-glow/20 text-primary-soft transition-colors group-hover:text-white">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <p className="mt-5 font-display text-3xl font-bold text-ink">{stat.value}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{stat.label}</p>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-faint">
                    {stat.description}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
