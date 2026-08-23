import { profile as baseProfile, stats } from '../data/profile'
import { projects as baseProjects } from '../data/projects'
import type { Profile, Project } from '../types'

/**
 * Camada de conteúdo do site.
 *
 * A fonte da verdade continua sendo `src/data/` (o que está publicado).
 * O painel admin (/#/admin) salva rascunhos no localStorage DESTE
 * navegador — útil para editar e pré-visualizar. Para publicar de
 * verdade, o painel exporta o arquivo pronto para substituir em
 * `src/data/` e fazer git push.
 */

const PROJECTS_KEY = 'evi-admin:projects'
const PROFILE_KEY = 'evi-admin:profile'

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function loadProjects(): Project[] {
  const stored = readJson<Project[]>(PROJECTS_KEY)
  return Array.isArray(stored) && stored.length > 0 ? stored : baseProjects
}

export function loadProfile(): Profile {
  const stored = readJson<Partial<Profile>>(PROFILE_KEY)
  return stored
    ? { ...baseProfile, ...stored, socials: { ...baseProfile.socials, ...stored.socials } }
    : baseProfile
}

export function saveProjectsDraft(list: Project[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(list))
}

export function saveProfileDraft(data: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
}

export function hasDraft(): boolean {
  return localStorage.getItem(PROJECTS_KEY) !== null || localStorage.getItem(PROFILE_KEY) !== null
}

export function clearDrafts() {
  localStorage.removeItem(PROJECTS_KEY)
  localStorage.removeItem(PROFILE_KEY)
}

/* ── geração dos arquivos prontos para publicar ────────────────── */

function toTs(value: unknown): string {
  return JSON.stringify(value, null, 2)
}

export function generateProjectsFile(list: Project[]): string {
  return `import type { Project } from '../types'

/**
 * Arquivo gerado pelo painel admin em ${new Date().toLocaleDateString('pt-BR')}.
 * Para publicar: substitua src/data/projects.ts por este arquivo,
 * confira com \`npm run dev\` e faça commit + push.
 */
export const projects: Project[] = ${toTs(list)}
`
}

export function generateProfileFile(data: Profile): string {
  return `import type { Profile, Stat } from '../types'

/**
 * Arquivo gerado pelo painel admin em ${new Date().toLocaleDateString('pt-BR')}.
 * Para publicar: substitua src/data/profile.ts por este arquivo,
 * confira com \`npm run dev\` e faça commit + push.
 */
export const profile: Profile = ${toTs(data)}

/** Cards de números da seção "Sobre mim". */
export const stats: Stat[] = ${toTs(stats)}
`
}

/* Conteúdo efetivo usado pelas seções do site (rascunho > publicado). */
export const profile: Profile = loadProfile()
export const projects: Project[] = loadProjects()
