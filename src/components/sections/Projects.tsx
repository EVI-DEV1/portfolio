import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ExternalLink, FolderGit2, Star } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { projects } from '../../data/projects'
import type { Project } from '../../types'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Accent, SectionHeading } from '../ui/SectionHeading'

const VISIBLE_LIMIT = 6

/** Gradientes das capas geradas automaticamente (quando o projeto não tem imagem). */
const COVER_GRADIENTS = [
  'from-[#4c1d95] via-[#6d28d9] to-[#a855f7]',
  'from-[#1e1b4b] via-[#4338ca] to-[#7c3aed]',
  'from-[#3b0764] via-[#7e22ce] to-[#c026d3]',
  'from-[#172554] via-[#1d4ed8] to-[#7c3aed]',
]

function ProjectCover({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Capa do projeto ${project.name}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    )
  }

  // capa gerada: gradiente + inicial do projeto + malha sutil
  const gradient = COVER_GRADIENTS[index % COVER_GRADIENTS.length]
  return (
    <div
      role="img"
      aria-label={`Capa gerada do projeto ${project.name}`}
      className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-[1.04]`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:18px_18px] opacity-40"
      />
      <span aria-hidden className="font-display text-5xl font-bold text-white/85 drop-shadow-lg">
        {project.name.charAt(0).toUpperCase()}
      </span>
      <span
        aria-hidden
        className="absolute bottom-3 left-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/80"
      >
        {project.name}
      </span>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      layout={reduce ? false : true}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl card-glass transition-colors duration-300 hover:border-primary-light/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <ProjectCover project={project} index={index} />
        {project.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-black/55 px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-widest text-amber-200 backdrop-blur-sm">
            <Star className="size-3 fill-current" aria-hidden />
            Destaque
          </span>
        )}
        {project.example && (
          <span className="absolute right-3 top-3 rounded-full border border-line-strong bg-black/55 px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-widest text-ink-soft backdrop-blur-sm">
            Exemplo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink">{project.name}</h3>
        <p className="mt-2 flex-1 text-[0.85rem] leading-relaxed text-ink-soft">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias do projeto">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 font-mono text-[0.65rem] font-medium text-primary-soft"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-2.5">
          {project.demo ? (
            <Button href={project.demo} target="_blank" rel="noopener noreferrer" size="sm" variant="outline" className="flex-1">
              Ver projeto
              <ExternalLink className="size-3.5" aria-hidden />
            </Button>
          ) : (
            <Button href={project.github} target="_blank" rel="noopener noreferrer" size="sm" variant="outline" className="flex-1">
              Ver código
              <FaGithub className="size-3.5" aria-hidden />
            </Button>
          )}
          {project.demo && project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Repositório de ${project.name} no GitHub`}
              className="flex size-9 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
            >
              <FaGithub className="size-4" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState('Todos')
  const [showAll, setShowAll] = useState(false)
  const reduce = useReducedMotion()

  // filtros derivados automaticamente das tags dos projetos
  const filters = useMemo(() => {
    const tags = new Set<string>()
    for (const p of projects) for (const t of p.tags) tags.add(t)
    return ['Todos', ...Array.from(tags).sort((a, b) => a.localeCompare(b, 'pt-BR'))]
  }, [])

  const filtered = useMemo(
    () => (filter === 'Todos' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  )
  const visible = showAll ? filtered : filtered.slice(0, VISIBLE_LIMIT)
  const hiddenCount = filtered.length - visible.length

  return (
    <section id="projetos" aria-label="Projetos" className="relative bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-24 lg:px-8">
        <div className="gap-10 lg:flex lg:items-end lg:justify-between">
          <SectionHeading
            lead="Uma seleção do que venho construindo — filtre por tecnologia."
          >
            Alguns projetos <Accent>em destaque</Accent>
          </SectionHeading>

          <Reveal delay={0.1} className="mt-8 lg:mt-0">
            <div role="group" aria-label="Filtrar projetos por tecnologia" className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFilter(f)
                    setShowAll(false)
                  }}
                  aria-pressed={filter === f}
                  className={`rounded-full border px-4 py-1.5 text-[0.8rem] font-medium transition-all duration-200 ${
                    filter === f
                      ? 'border-transparent bg-gradient-to-r from-primary to-fuchsia-glow text-white shadow-[0_4px_16px_-4px_rgba(139,92,246,0.6)]'
                      : 'border-line bg-white/[0.03] text-ink-soft hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <LayoutGroup>
          <motion.div layout={reduce ? false : true} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-line-strong p-10 text-center">
            <FolderGit2 className="mx-auto size-8 text-ink-faint" aria-hidden />
            <p className="mt-3 text-sm text-ink-soft">
              Nenhum projeto com essa tecnologia ainda — em breve!
            </p>
          </div>
        )}

        {hiddenCount > 0 && (
          <div className="mt-10 text-center">
            <Button variant="outline" onClick={() => setShowAll(true)}>
              Ver todos os projetos ({hiddenCount} restante{hiddenCount > 1 ? 's' : ''})
              <ArrowDown className="size-4" aria-hidden />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
