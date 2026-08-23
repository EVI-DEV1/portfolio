import { skillCategories } from '../../data/skills'
import { Reveal } from '../ui/Reveal'
import { Accent, SectionHeading } from '../ui/SectionHeading'
import { TechIcon } from '../ui/TechIcon'

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="relative bg-bg-deep">
      {/* transição de luz entre as seções */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <SectionHeading
            lead="As tecnologias e ferramentas que uso no dia a dia para transformar ideias em interfaces."
          >
            Tecnologias que <Accent>utilizo</Accent>
          </SectionHeading>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <Reveal key={category.id} delay={0.06 * i}>
              <article className="group h-full rounded-2xl card-glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-light/40 hover:shadow-[0_16px_40px_-12px_rgba(139,92,246,0.3)]">
                <h3 className="font-display text-lg font-bold text-ink">{category.title}</h3>
                <ul className="mt-5 grid grid-cols-2 gap-2.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-2.5 rounded-lg border border-line bg-white/[0.02] px-3 py-2.5 transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.05]"
                    >
                      <TechIcon name={skill.icon} className="size-[1.15rem]" />
                      <span className="truncate text-[0.8rem] font-medium text-ink-soft">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
