/**
 * Tipos centrais do portfólio.
 * Os dados que alimentam o site inteiro vivem em `src/data/` e
 * seguem estes contratos — os componentes nunca precisam mudar.
 */

export interface SocialLinks {
  github: string
  linkedin: string
  /** Deixe '' para ocultar o ícone. */
  instagram?: string
}

export interface Profile {
  /** Nome curto/marca exibido no logo, hero e footer. */
  brand: string
  /** Nome completo — usado em textos e no © do footer (opcional). */
  fullName: string
  role: string
  /** Frase curta do hero. */
  headline: string
  location: string
  /** E-mail público de contato (aparece na seção Contato). */
  email: string
  /** Telefone público. Deixe '' para ocultar. */
  phone: string
  /**
   * Caminho da sua foto dentro de /public (ex.: '/profile.jpg').
   * Enquanto for o placeholder, o hero mostra a arte provisória.
   */
  avatar: string
  /**
   * Caminho do CV dentro de /public (ex.: '/cv.pdf').
   * Deixe '' para ocultar o botão "Baixar CV".
   */
  resumeUrl: string
  socials: SocialLinks
  /** Parágrafos da seção "Sobre mim". */
  about: string[]
}

export interface Stat {
  value: string
  label: string
  description: string
  /** Nome de um ícone registrado em StatIcon (Rocket, Code2, Users, BookOpen…). */
  icon: string
}

export interface Skill {
  name: string
  /** Chave registrada em TechIcon (ex.: 'react', 'typescript'). */
  icon: string
}

export interface SkillCategory {
  id: string
  title: string
  skills: Skill[]
}

export interface Project {
  id: string
  name: string
  description: string
  /**
   * Capa do projeto: caminho dentro de /public (ex.: '/projects/meu-app.png').
   * Deixe '' para usar a capa gerada automaticamente (gradiente + inicial).
   */
  image: string
  /** Tecnologias — também alimentam os filtros automaticamente. */
  tags: string[]
  /** Link do repositório. Deixe '' para ocultar o botão. */
  github: string
  /** Link do projeto publicado. Deixe '' para ocultar o botão. */
  demo: string
  /** true = recebe o selo "Destaque". */
  featured: boolean
}

export interface ExperienceItem {
  period: string
  title: string
  description: string
}

export type EducationKind = 'Formação' | 'Bootcamp' | 'Curso' | 'Certificação'

export interface EducationItem {
  title: string
  institution: string
  period: string
  kind: EducationKind
  /** Link do certificado/curso. Deixe '' para ocultar. */
  url: string
}
