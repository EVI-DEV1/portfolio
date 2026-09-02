import { profile as baseProfile, stats as baseStats } from '../data/profile'
import { projects as baseProjects } from '../data/projects'
import { skillCategories as baseSkillCategories } from '../data/skills'
import { experience as baseExperience } from '../data/experience'
import { education as baseEducation } from '../data/education'
import type { Profile, Project, SkillCategory, ExperienceItem, EducationItem, Stat } from '../types'

/**
 * Camada de conteúdo do site.
 *
 * A fonte da verdade continua sendo `src/data/` (o que está publicado).
 * O painel admin (/#/admin) salva rascunhos no localStorage DESTE
 * navegador — útil para editar e pré-visualizar antes de publicar.
 * Publicar de verdade vai para `src/data/` via `/api/publish` (commit
 * direto no GitHub) ou, no plano B, exportando o arquivo pronto para
 * substituir manualmente + git push.
 */

const PROJECTS_KEY = 'evi-admin:projects'
const PROFILE_KEY = 'evi-admin:profile'
const STATS_KEY = 'evi-admin:stats'
const SKILLS_KEY = 'evi-admin:skills'
const EXPERIENCE_KEY = 'evi-admin:experience'
const EDUCATION_KEY = 'evi-admin:education'

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

export function loadStats(): Stat[] {
  const stored = readJson<Stat[]>(STATS_KEY)
  return Array.isArray(stored) && stored.length > 0 ? stored : baseStats
}

export function loadSkillCategories(): SkillCategory[] {
  const stored = readJson<SkillCategory[]>(SKILLS_KEY)
  return Array.isArray(stored) && stored.length > 0 ? stored : baseSkillCategories
}

export function loadExperience(): ExperienceItem[] {
  const stored = readJson<ExperienceItem[]>(EXPERIENCE_KEY)
  return Array.isArray(stored) && stored.length > 0 ? stored : baseExperience
}

export function loadEducation(): EducationItem[] {
  const stored = readJson<EducationItem[]>(EDUCATION_KEY)
  return Array.isArray(stored) && stored.length > 0 ? stored : baseEducation
}

export function saveProjectsDraft(list: Project[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(list))
}

export function saveProfileDraft(data: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
}

export function saveStatsDraft(list: Stat[]) {
  localStorage.setItem(STATS_KEY, JSON.stringify(list))
}

export function saveSkillCategoriesDraft(list: SkillCategory[]) {
  localStorage.setItem(SKILLS_KEY, JSON.stringify(list))
}

export function saveExperienceDraft(list: ExperienceItem[]) {
  localStorage.setItem(EXPERIENCE_KEY, JSON.stringify(list))
}

export function saveEducationDraft(list: EducationItem[]) {
  localStorage.setItem(EDUCATION_KEY, JSON.stringify(list))
}

const DRAFT_KEYS = [PROJECTS_KEY, PROFILE_KEY, STATS_KEY, SKILLS_KEY, EXPERIENCE_KEY, EDUCATION_KEY]

export function hasDraft(): boolean {
  return DRAFT_KEYS.some((key) => localStorage.getItem(key) !== null)
}

export function clearDrafts() {
  DRAFT_KEYS.forEach((key) => localStorage.removeItem(key))
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

export function generateProfileFile(data: Profile, statsList: Stat[]): string {
  return `import type { Profile, Stat } from '../types'

/**
 * Arquivo gerado pelo painel admin em ${new Date().toLocaleDateString('pt-BR')}.
 * Para publicar: substitua src/data/profile.ts por este arquivo,
 * confira com \`npm run dev\` e faça commit + push.
 */
export const profile: Profile = ${toTs(data)}

/** Cards de números da seção "Sobre mim". */
export const stats: Stat[] = ${toTs(statsList)}
`
}

export function generateSkillsFile(list: SkillCategory[]): string {
  return `import type { SkillCategory } from '../types'

/**
 * Arquivo gerado pelo painel admin em ${new Date().toLocaleDateString('pt-BR')}.
 * Para publicar: substitua src/data/skills.ts por este arquivo,
 * confira com \`npm run dev\` e faça commit + push.
 */
export const skillCategories: SkillCategory[] = ${toTs(list)}
`
}

export function generateExperienceFile(list: ExperienceItem[]): string {
  return `import type { ExperienceItem } from '../types'

/**
 * Arquivo gerado pelo painel admin em ${new Date().toLocaleDateString('pt-BR')}.
 * Para publicar: substitua src/data/experience.ts por este arquivo,
 * confira com \`npm run dev\` e faça commit + push.
 */
export const experience: ExperienceItem[] = ${toTs(list)}
`
}

export function generateEducationFile(list: EducationItem[]): string {
  return `import type { EducationItem } from '../types'

/**
 * Arquivo gerado pelo painel admin em ${new Date().toLocaleDateString('pt-BR')}.
 * Para publicar: substitua src/data/education.ts por este arquivo,
 * confira com \`npm run dev\` e faça commit + push.
 */
export const education: EducationItem[] = ${toTs(list)}
`
}

/* Conteúdo efetivo usado pelas seções do site (rascunho > publicado). */
export const profile: Profile = loadProfile()
export const stats: Stat[] = loadStats()
export const projects: Project[] = loadProjects()
export const skillCategories: SkillCategory[] = loadSkillCategories()
export const experience: ExperienceItem[] = loadExperience()
export const education: EducationItem[] = loadEducation()
