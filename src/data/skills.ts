import type { SkillCategory } from '../types'

/**
 * ╭──────────────────────────────────────────────────────────────╮
 * │  SUAS SKILLS — edite as categorias e tecnologias aqui.       │
 * │                                                              │
 * │  O `icon` é uma chave registrada em                          │
 * │  src/components/ui/TechIcon.tsx (lista completa lá).         │
 * │  Para adicionar uma tecnologia nova: inclua-a aqui e, se o   │
 * │  ícone ainda não existir, registre-o no TechIcon.            │
 * │                                                              │
 * │  ⚠ Lista inicial é um EXEMPLO — ajuste para as tecnologias   │
 * │  que você realmente domina.                                  │
 * ╰──────────────────────────────────────────────────────────────╯
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Front-end',
    skills: [
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
    ],
  },
  {
    id: 'backend',
    title: 'Back-end',
    skills: [
      { name: 'Node.js', icon: 'node' },
      { name: 'Express', icon: 'express' },
      { name: 'Python', icon: 'python' },
      { name: 'Firebase', icon: 'firebase' },
    ],
  },
  {
    id: 'ferramentas',
    title: 'Ferramentas',
    skills: [
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Vite', icon: 'vite' },
      { name: 'npm', icon: 'npm' },
    ],
  },
  {
    id: 'banco-de-dados',
    title: 'Banco de dados',
    skills: [
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
    ],
  },
  {
    id: 'versionamento',
    title: 'Versionamento',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
    ],
  },
  {
    id: 'outros',
    title: 'Outros',
    skills: [
      { name: 'Vercel', icon: 'vercel' },
      { name: 'APIs REST', icon: 'api' },
      { name: 'Responsividade', icon: 'responsive' },
      { name: 'Acessibilidade', icon: 'accessibility' },
    ],
  },
]
