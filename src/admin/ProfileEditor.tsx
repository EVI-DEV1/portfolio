import { useState } from 'react'
import { Download, Save } from 'lucide-react'
import type { Profile } from '../types'
import { generateProfileFile, saveProfileDraft } from '../lib/content'
import { Button } from '../components/ui/Button'
import { downloadFile, fieldClass, labelClass } from './adminUi'

interface Props {
  initial: Profile
  onSaved: () => void
}

export function ProfileEditor({ initial, onSaved }: Props) {
  const [data, setData] = useState<Profile>(initial)
  const [aboutText, setAboutText] = useState(initial.about.join('\n\n'))

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setData((d) => ({ ...d, [key]: value }))
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
    onSaved()
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

      <div className="flex flex-wrap gap-3 border-t border-line pt-5">
        <Button type="button" size="sm" onClick={handleSave}>
          <Save className="size-4" aria-hidden />
          Salvar rascunho
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => downloadFile('profile.ts', generateProfileFile(currentProfile()))}
        >
          <Download className="size-4" aria-hidden />
          Exportar profile.ts
        </Button>
      </div>
    </div>
  )
}
