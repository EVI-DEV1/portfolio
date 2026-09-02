import { useState } from 'react'
import { ArrowDown, ArrowUp, Download, Loader2, Plus, Save, Trash2, UploadCloud } from 'lucide-react'
import type { EducationItem, EducationKind } from '../types'
import { generateEducationFile, saveEducationDraft } from '../lib/content'
import { Button } from '../components/ui/Button'
import { downloadFile, fieldClass, labelClass, publish } from './adminUi'

interface Props {
  initial: EducationItem[]
  secret: string
  onSaved: (kind: 'draft' | 'publish') => void
}

const KIND_OPTIONS: EducationKind[] = ['Formação', 'Bootcamp', 'Curso', 'Certificação']

function emptyItem(): EducationItem {
  return { title: '', institution: '', period: '', kind: 'Curso', url: '', badge: '' }
}

export function EducationEditor({ initial, secret, onSaved }: Props) {
  const [list, setList] = useState<EducationItem[]>(initial)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)

  function update(index: number, patch: Partial<EducationItem>) {
    setList((l) => l.map((item, i) => (i === index ? { ...item, ...patch } : item)))
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

  function normalized(): EducationItem[] {
    return list
      .filter((item) => item.title.trim())
      .map((item) => ({ ...item, title: item.title.trim() }))
  }

  function handleSave() {
    saveEducationDraft(normalized())
    onSaved('draft')
  }

  async function handlePublish() {
    setPublishing(true)
    setPublishError(null)
    const result = await publish('education', secret, generateEducationFile(normalized()))
    setPublishing(false)
    if (result.ok) {
      onSaved('publish')
    } else {
      setPublishError(result.error ?? 'Falha ao publicar.')
    }
  }

  return (
    <div className="space-y-5">
      {list.map((item, i) => (
        <fieldset key={i} className="rounded-2xl border border-line bg-white/[0.02] p-5">
          <legend className="px-2 font-mono text-[0.7rem] uppercase tracking-widest text-primary-light">
            Item {i + 1}
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor={`edu-title-${i}`} className={labelClass}>
                Título
              </label>
              <input
                id={`edu-title-${i}`}
                className={fieldClass}
                value={item.title}
                placeholder="Ex.: Formação React Developer"
                onChange={(e) => update(i, { title: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`edu-institution-${i}`} className={labelClass}>
                Instituição
              </label>
              <input
                id={`edu-institution-${i}`}
                className={fieldClass}
                value={item.institution}
                placeholder="Ex.: DIO — Digital Innovation One"
                onChange={(e) => update(i, { institution: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`edu-period-${i}`} className={labelClass}>
                Período (vazio = oculto)
              </label>
              <input
                id={`edu-period-${i}`}
                className={fieldClass}
                value={item.period}
                placeholder="Ex.: 2025"
                onChange={(e) => update(i, { period: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`edu-kind-${i}`} className={labelClass}>
                Tipo
              </label>
              <select
                id={`edu-kind-${i}`}
                className={fieldClass}
                value={item.kind}
                onChange={(e) => update(i, { kind: e.target.value as EducationKind })}
              >
                {KIND_OPTIONS.map((kind) => (
                  <option key={kind} value={kind}>
                    {kind}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`edu-url-${i}`} className={labelClass}>
                Link do certificado (vazio = oculto)
              </label>
              <input
                id={`edu-url-${i}`}
                className={fieldClass}
                value={item.url}
                onChange={(e) => update(i, { url: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`edu-badge-${i}`} className={labelClass}>
                Insígnia (ex.: /badges/curso.webp — vazio = ícone padrão)
              </label>
              <input
                id={`edu-badge-${i}`}
                className={fieldClass}
                value={item.badge ?? ''}
                onChange={(e) => update(i, { badge: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label={`Mover ${item.title || 'item'} para cima`}
              className="flex size-8 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:opacity-30"
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === list.length - 1}
              aria-label={`Mover ${item.title || 'item'} para baixo`}
              className="flex size-8 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink disabled:opacity-30"
            >
              <ArrowDown className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`Excluir ${item.title || 'item'}`}
              className="ml-auto flex h-8 items-center gap-1.5 rounded-lg border border-danger/40 px-3 text-[0.8rem] text-danger transition-colors hover:bg-danger/10"
            >
              <Trash2 className="size-3.5" aria-hidden />
              Excluir
            </button>
          </div>
        </fieldset>
      ))}

      <Button type="button" size="sm" variant="outline" onClick={() => setList((l) => [...l, emptyItem()])}>
        <Plus className="size-4" aria-hidden />
        Adicionar item
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
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => downloadFile('education.ts', generateEducationFile(normalized()))}
        >
          <Download className="size-4" aria-hidden />
          Exportar education.ts
        </Button>
      </div>
    </div>
  )
}
