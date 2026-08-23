import type { ComponentType } from 'react'
import {
  SiCss,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNpm,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { Accessibility, Network, TabletSmartphone } from 'lucide-react'

interface TechIconEntry {
  Icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  /** Cor da marca (ou próxima dela) sobre fundo escuro. */
  color: string
}

/**
 * Registro central de ícones de tecnologia.
 * Para usar uma tecnologia nova em src/data/skills.ts, adicione a
 * chave aqui (ícones de marca: react-icons; genéricos: lucide-react).
 */
const registry: Record<string, TechIconEntry> = {
  html: { Icon: SiHtml5, color: '#e34f26' },
  css: { Icon: SiCss, color: '#663399' },
  javascript: { Icon: SiJavascript, color: '#f7df1e' },
  typescript: { Icon: SiTypescript, color: '#3178c6' },
  react: { Icon: SiReact, color: '#61dafb' },
  tailwind: { Icon: SiTailwindcss, color: '#38bdf8' },
  node: { Icon: SiNodedotjs, color: '#5fa04e' },
  express: { Icon: SiExpress, color: '#c8c2dd' },
  python: { Icon: SiPython, color: '#4b8bbe' },
  firebase: { Icon: SiFirebase, color: '#ffca28' },
  vscode: { Icon: VscVscode, color: '#3ba0e8' },
  figma: { Icon: SiFigma, color: '#f24e1e' },
  vite: { Icon: SiVite, color: '#9a7cf7' },
  npm: { Icon: SiNpm, color: '#cb3837' },
  mongodb: { Icon: SiMongodb, color: '#4caf50' },
  mysql: { Icon: SiMysql, color: '#4b9fd5' },
  postgresql: { Icon: SiPostgresql, color: '#699eca' },
  git: { Icon: SiGit, color: '#f05033' },
  github: { Icon: SiGithub, color: '#e8e4f5' },
  vercel: { Icon: SiVercel, color: '#e8e4f5' },
  api: { Icon: Network, color: '#a78bfa' },
  responsive: { Icon: TabletSmartphone, color: '#a78bfa' },
  accessibility: { Icon: Accessibility, color: '#a78bfa' },
}

interface TechIconProps {
  name: string
  className?: string
}

export function TechIcon({ name, className = 'size-6' }: TechIconProps) {
  const entry = registry[name]
  if (!entry) return null
  const { Icon, color } = entry
  return (
    <span style={{ color }} className="inline-flex">
      <Icon className={className} aria-hidden />
    </span>
  )
}

export function hasTechIcon(name: string): boolean {
  return name in registry
}
