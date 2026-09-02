import { useState } from 'react'
import { Download, Loader2, Save, UploadCloud } from 'lucide-react'
import type { Profile, Stat } from '../types'
import { generateProfileFile, saveProfileDraft, saveStatsDraft } from '../lib/content'
import { Button } from '../components/ui/Button'
import { downloadFile, fieldClass, labelClass, publish } from './adminUi'

interface Props {
  initial: Profile
  initialStats: Stat[]
  secret: string
  onSaved: (kind: 'draft' | 'publish') => void
}

const STAT_ICON_OPTIONS = ['Rocket', 'Code2', 'Users', 'BookOpen']

export function ProfileEditor({ initial, initialStats, secret, onSaved }: Props) {
  const [data, setData] = useState<Profile>(initial)
  const [aboutText, setAboutText] = useState(initial.about.join('\n\n'))
  const [statsList, setStatsList] = useState<Stat[]>(initialStats)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setData((d) => ({ ...d, [key]: value }))
  }

  function setStat(index: number, patch: Partial<Stat>) {
    setStatsList((list) => list.map((s, i) => (i === index ? { ...s, ...patch } : s)))
  }

  function currentProfile(): Profile {
    return {
      ...data,
      about: aboutText
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
    }
  }

  function handleSave() {
    saveProfileDraft(currentProfile())
    saveStatsDraft(statsList)
    onSaved('draft')
  }

  async function handlePublish() {
    setPublishing(true)
    setPublishError(null)
    const result = await publish('profile', secret, generateProfileFile(currentProfile(), statsList))
    setPublishing(false)
    if (result.ok) {
      onSaved('publish')
    } else {
      setPublishError(result.error ?? 'Falha ao publicar.')
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="adm-brand" className={labelClass}>
            Nome/marca (logo e hero)
          </label>
          <input
            id="adm-brand"
            className={fieldClass}
            value={data.brand}
            onChange={(e) => set('brand', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="adm-fullname" className={labelClass}>
            Nome completo
          </label>
          <input
            id="adm-fullname"
            className={fieldClass}
            value={data.fullName}
            onChange={(e) => set('fullName', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="adm-role" className={labelClass}>
            Cargo
          </label>
          <input
            id="adm-role"
            className={fieldClass}
            value={data.role}
            onChange={(e) => set('role', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="adm-location" className={labelClass}>
            Localização
          </label>
          <input
            id="adm-location"
            className={fieldClass}
            value={data.location}
            onChange={(e) => set('location', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="adm-email" className={labelClass}>
            E-mail público
          </label>
          <input
            id="adm-email"
            type="email"
            className={fieldClass}
            value={data.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="adm-phone" className={labelClass}>
            Telefone (vazio = oculto)
          </label>
          <input
            id="adm-phone"
            className={fieldClass}
            value={data.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="adm-github" className={labelClass}>
            GitHub (URL)
          </label>
          <input
            id="adm-github"
            className={fieldClass}
            value={data.socials.github}
            onChange={(e) => set('socials', { ...data.socials, github: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="adm-linkedin" className={labelClass}>
            LinkedIn (URL)
          </label>
          <input
            id="adm-linkedin"
            className={fieldClass}
            value={data.socials.linkedin}
            onChange={(e) => set('socials', { ...data.socials, linkedin: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="adm-instagram" className={labelClass}>
            Instagram (vazio = oculto)
          </label>
          <input
            id="adm-instagram"
            className={fieldClass}
            value={data.socials.instagram ?? ''}
            onChange={(e) => set('socials', { ...data.socials, instagram: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="adm-resume" className={labelClass}>
            CV (ex.: /cv.pdf — vazio = botão oculto)
          </label>
          <input
            id="adm-resume"
            className={fieldClass}
            value={data.resumeUrl}
            onChange={(e) => set('resumeUrl', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="adm-headline" className={labelClass}>
          Frase do hero
        </label>
        <textarea
          id="adm-headline"
          rows={2}
          className={`${fieldClass} resize-y`}
          value={data.headline}
          onChange={(e) => set('headline', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="adm-about" className={labelClass}>
          Sobre mim (linha em branco separa os parágrafos)
        </label>
        <textarea
          id="adm-about"
          rows={6}
          className={`${fieldClass} resize-y`}
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
        />
      </div>

      <fieldset className="rounded-2xl border border-line bg-white/[0.02] p-5">
        <legend className="px-2 font-mono text-[0.7rem] uppercase tracking-widest text-primary-light">
          Cards de números (seção "Sobre mim")
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {statsList.map((stat, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 rounded-xl border border-line bg-white/[0.02] p-3">
              <div>
                <label htmlFor={`stat-value-${i}`} className={labelClass}>
                  Valor
                </label>
                <input
                  id={`stat-value-${i}`}
                  className={fieldClass}
                  value={stat.value}
                  placeholder="2+"
                  onChange={(e) => setStat(i, { value: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor={`stat-icon-${i}`} className={labelClass}>
                  Ícone
                </label>
                <select
                  id={`stat-icon-${i}`}
                  className={fieldClass}
                  value={stat.icon}
                  onChange={(e) => setStat(i, { icon: e.target.value })}
                >
                  {STAT_ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor={`stat-label-${i}`} className={labelClass}>
                  Rótulo
                </label>
                <input
                  id={`stat-label-${i}`}
                  className={fieldClass}
                  value={stat.label}
                  placeholder="Anos de experiência"
                  onChange={(e) => setStat(i, { label: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor={`stat-desc-${i}`} className={labelClass}>
                  Descrição
                </label>
                <input
                  id={`stat-desc-${i}`}
                  className={fieldClass}
                  value={stat.description}
                  placeholder="Desenvolvendo soluções para web"
                  onChange={(e) => setStat(i, { description: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>

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
          onClick={() => downloadFile('profile.ts', generateProfileFile(currentProfile(), statsList))}
        >
          <Download className="size-4" aria-hidden />
          Exportar profile.ts
        </Button>
      </div>
    </div>
  )
}
