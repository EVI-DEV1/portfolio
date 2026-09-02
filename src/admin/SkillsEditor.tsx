import { useState } from 'react'
import { ArrowDown, ArrowUp, Download, Loader2, Plus, Save, Trash2, UploadCloud } from 'lucide-react'
import type { SkillCategory } from '../types'
import { generateSkillsFile, saveSkillCategoriesDraft } from '../lib/content'
import { Button } from '../components/ui/Button'
import { downloadFile, fieldClass, labelClass, publish } from './adminUi'

interface Props {
  initial: SkillCategory[]
  secret: string
  onSaved: (kind: 'draft' | 'publish') => void
}

/** Chaves registradas em src/components/ui/TechIcon.tsx. */
const ICON_OPTIONS = [
  'html', 'css', 'javascript', 'typescript', 'react', 'tailwind', 'node', 'express', 'python', 'firebase',
  'vscode', 'figma', 'vite', 'npm', 'mongodb', 'mysql', 'postgresql', 'git', 'github', 'vercel', 'api',
  'responsive', 'accessibility',
]

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `categoria-${Date.now()}`
  )
}

function emptyCategory(): SkillCategory {
  return { id: `nova-${Date.now()}`, title: '', skills: [] }
}

export function SkillsEditor({ initial, secret, onSaved }: Props) {
  const [list, setList] = useState<SkillCategory[]>(initial)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)

  function updateCategory(index: number, patch: Partial<SkillCategory>) {
    setList((l) => l.map((c, i) => (i === index ? { ...c, ...patch } : c)))
  }

  function moveCategory(index: number, dir: -1 | 1) {
    setList((l) => {
      const next = [...l]
      const target = index + dir
      if (target < 0 || target >= next.length) return l
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  function removeCategory(index: number) {
    setList((l) => l.filter((_, i) => i !== index))
  }

  function addSkill(categoryIndex: number) {
    updateCategory(categoryIndex, { skills: [...list[categoryIndex].skills, { name: '', icon: ICON_OPTIONS[0] }] })
  }

  function updateSkill(categoryIndex: number, skillIndex: number, patch: Partial<SkillCategory['skills'][number]>) {
    const category = list[categoryIndex]
    updateCategory(categoryIndex, {
      skills: category.skills.map((s, i) => (i === skillIndex ? { ...s, ...patch } : s)),
    })
  }

  function removeSkill(categoryIndex: number, skillIndex: number) {
    const category = list[categoryIndex]
    updateCategory(categoryIndex, { skills: category.skills.filter((_, i) => i !== skillIndex) })
  }

  function normalized(): SkillCategory[] {
    return list
      .filter((c) => c.title.trim())
      .map((c) => ({
        ...c,
        id: slugify(c.title),
        title: c.title.trim(),
        skills: c.skills.filter((s) => s.name.trim()).map((s) => ({ ...s, name: s.name.trim() })),
      }))
  }

  function handleSave() {
    saveSkillCategoriesDraft(normalized())
    onSaved('draft')
  }

  async function handlePublish() {
    setPublishing(true)
    setPublishError(null)
    const result = await publish('skills', secret, generateSkillsFile(normalized()))
    setPublishing(false)
    if (result.ok) {
      onSaved('publish')
    } else {
      setPublishError(result.error ?? 'Falha ao publicar.')
    }
  }

  return (
    <div className="space-y-5">
      {list.map((category, ci) => (
        <fieldset key={category.id} className="rounded-2xl border border-line bg-white/[0.02] p-5">
          <legend className="px-2 font-mono text-[0.7rem] uppercase tracking-widest text-primary-light">
            Categoria {ci + 1}
          </legend>

          <div>
            <label htmlFor={`cat-title-${ci}`} className={labelClass}>
              Título da categoria
            </label>
            <input
              id={`cat-title-${ci}`}
              className={fieldClass}
              value={category.title}
              placeholder="Ex.: Front-end"
              onChange={(e) => updateCategory(ci, { title: e.target.value })}
            />
          </div>

          <div className="mt-4 space-y-2">
            {category.skills.map((skill, si) => (
              <div key={si} className="flex items-center gap-2">
                <input
                  className={fieldClass}
                  value={skill.name}
                  placeholder="Nome (ex.: React)"
                  onChange={(e) => updateSkill(ci, si, { name: e.target.value })}
                />
                <select
                  className={`${fieldClass} max-w-40`}
                  value={skill.icon}
                  onChange={(e) => updateSkill(ci, si, { icon: e.target.value })}
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeSkill(ci, si)}
                  aria-label={`Excluir ${skill.name || 'skill'}`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-danger/40 text-danger transition-colors hover:bg-danger/10"
                >
                  <Trash2 className="size-3.5" aria-hidden />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
            <Button type="button" size="sm" variant="ghost" onClick={() => addSkill(ci)}>
              <Plus className="size-4" aria-hidden />
              Adicionar skill
            </Button>
            <button
              type="button"
              onClick={() => moveCategory(ci, -1)}
              disabled={ci === 0}
              aria-label={`Mover ${category.title || 'categoria'} para cima`}
              className="ml-auto flex size-8 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:opacity-30"
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => moveCategory(ci, 1)}
              disabled={ci === list.length - 1}
              aria-label={`Mover ${category.title || 'categoria'} para baixo`}
              className="flex size-8 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:opacity-30"
            >
              <ArrowDown className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => removeCategory(ci)}
              aria-label={`Excluir ${category.title || 'categoria'}`}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-danger/40 px-3 text-[0.8rem] text-danger transition-colors hover:bg-danger/10"
            >
              <Trash2 className="size-3.5" aria-hidden />
              Excluir categoria
            </button>
          </div>
        </fieldset>
      ))}

      <Button type="button" size="sm" variant="outline" onClick={() => setList((l) => [...l, emptyCategory()])}>
        <Plus className="size-4" aria-hidden />
        Adicionar categoria
      </Button>

      {publishError && (
        <p role="alert" className="text-[0.83rem] text-danger">
          {publishError}
        </p>
      )}

      <div className="flex flex-wrap gap-3 border-t border-line pt-5">
        <Button type="button" size="sm" onClick={handlePublish} disabled={publishing || !secret}>
          {publishing ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <UploadCloud className="size-4" aria-hidden />}
          Publicar no site
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={handleSave}>
          <Save className="size-4" aria-hidden />
          Salvar rascunho
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => downloadFile('skills.ts', generateSkillsFile(normalized()))}>
          <Download className="size-4" aria-hidden />
          Exportar skills.ts
        </Button>
      </div>
    </div>
  )
}
