import { useState } from 'react'
import { ArrowDown, ArrowUp, Download, Plus, Save, Trash2 } from 'lucide-react'
import type { Project } from '../types'
import { generateProjectsFile, saveProjectsDraft } from '../lib/content'
import { Button } from '../components/ui/Button'
import { downloadFile, fieldClass, labelClass } from './adminUi'

interface Props {
  initial: Project[]
  onSaved: () => void
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `projeto-${Date.now()}`
  )
}

function emptyProject(): Project {
  return {
    id: `novo-${Date.now()}`,
    name: '',
    description: '',
    image: '',
    tags: [],
    github: '',
    demo: '',
    featured: false,
    example: false,
  }
}

export function ProjectsEditor({ initial, onSaved }: Props) {
  const [list, setList] = useState<Project[]>(initial)

  function update(index: number, patch: Partial<Project>) {
    setList((l) => l.map((p, i) => (i === index ? { ...p, ...patch } : p)))
  }

  function move(index: number, dir: -1 | 1) {
    setList((l) => {
      const next = [...l]
      const target = index + dir
      if (target < 0 || target >= next.length) return l
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  function remove(index: number) {
    setList((l) => l.filter((_, i) => i !== index))
  }

  function normalized(): Project[] {
    return list
      .filter((p) => p.name.trim())
      .map((p) => ({ ...p, id: slugify(p.name), name: p.name.trim() }))
  }

  function handleSave() {
    saveProjectsDraft(normalized())
    onSaved()
  }

  return (
    <div className="space-y-5">
      {list.map((project, i) => (
        <fieldset key={project.id} className="rounded-2xl border border-line bg-white/[0.02] p-5">
          <legend className="px-2 font-mono text-[0.7rem] uppercase tracking-widest text-primary-light">
            Projeto {i + 1}
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`prj-name-${i}`} className={labelClass}>
                Nome
              </label>
              <input
                id={`prj-name-${i}`}
                className={fieldClass}
                value={project.name}
                placeholder="Ex.: Meu App Incrível"
                onChange={(e) => update(i, { name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`prj-tags-${i}`} className={labelClass}>
                Tecnologias (separe por vírgula — viram filtros)
              </label>
              <input
                id={`prj-tags-${i}`}
                className={fieldClass}
                value={project.tags.join(', ')}
                placeholder="React, TypeScript"
                onChange={(e) =>
                  update(i, {
                    tags: e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`prj-desc-${i}`} className={labelClass}>
                Descrição
              </label>
              <textarea
                id={`prj-desc-${i}`}
                rows={2}
                className={`${fieldClass} resize-y`}
                value={project.description}
                onChange={(e) => update(i, { description: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`prj-image-${i}`} className={labelClass}>
                Capa (ex.: /projects/app.png — vazio = capa gerada)
              </label>
              <input
                id={`prj-image-${i}`}
                className={fieldClass}
                value={project.image}
                onChange={(e) => update(i, { image: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`prj-github-${i}`} className={labelClass}>
                GitHub (URL do repositório)
              </label>
              <input
                id={`prj-github-${i}`}
                className={fieldClass}
                value={project.github}
                onChange={(e) => update(i, { github: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`prj-demo-${i}`} className={labelClass}>
                Link publicado (vazio = botão oculto)
              </label>
              <input
                id={`prj-demo-${i}`}
                className={fieldClass}
                value={project.demo}
                onChange={(e) => update(i, { demo: e.target.value })}
              />
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <label className="flex items-center gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(e) => update(i, { featured: e.target.checked })}
                  className="size-4 accent-[#8b5cf6]"
                />
                Destaque
              </label>
              <label className="flex items-center gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={Boolean(project.example)}
                  onChange={(e) => update(i, { example: e.target.checked })}
                  className="size-4 accent-[#8b5cf6]"
                />
                Selo “Exemplo”
              </label>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label={`Mover ${project.name || 'projeto'} para cima`}
              className="flex size-8 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:opacity-30"
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === list.length - 1}
              aria-label={`Mover ${project.name || 'projeto'} para baixo`}
              className="flex size-8 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:opacity-30"
            >
              <ArrowDown className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`Excluir ${project.name || 'projeto'}`}
              className="ml-auto flex h-8 items-center gap-1.5 rounded-lg border border-danger/40 px-3 text-[0.8rem] text-danger transition-colors hover:bg-danger/10"
            >
              <Trash2 className="size-3.5" aria-hidden />
              Excluir
            </button>
          </div>
        </fieldset>
      ))}

      <Button type="button" size="sm" variant="outline" onClick={() => setList((l) => [...l, emptyProject()])}>
        <Plus className="size-4" aria-hidden />
        Adicionar projeto
      </Button>

      <div className="flex flex-wrap gap-3 border-t border-line pt-5">
        <Button type="button" size="sm" onClick={handleSave}>
          <Save className="size-4" aria-hidden />
          Salvar rascunho
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => downloadFile('projects.ts', generateProjectsFile(normalized()))}
        >
          <Download className="size-4" aria-hidden />
          Exportar projects.ts
        </Button>
      </div>
    </div>
  )
}
