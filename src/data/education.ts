import type { EducationItem } from '../types'

/**
 * ╭──────────────────────────────────────────────────────────────╮
 * │  FORMAÇÃO & CURSOS — bootcamps, certificações e formação.    │
 * │  kind aceita: 'Formação' | 'Bootcamp' | 'Curso' |            │
 * │  'Certificação'. url = link do certificado ('' oculta).      │
 * │                                                              │
 * │  ⚠ Conteúdo inicial é um EXEMPLO — troque pelos seus         │
 * │  cursos e certificados reais.                                │
 * ╰──────────────────────────────────────────────────────────────╯
 */
export const education: EducationItem[] = [
  {
    title: '[Sua graduação ou curso técnico]',
    institution: '[Nome da instituição]',
    period: 'Em andamento',
    kind: 'Formação',
    url: '',
  },
  {
    title: 'Bootcamp Desenvolvimento Front-end',
    institution: 'DIO — Digital Innovation One',
    period: '2024',
    kind: 'Bootcamp',
    url: '',
  },
  {
    title: 'Curso de React + TypeScript',
    institution: '[Plataforma do curso]',
    period: '2024',
    kind: 'Curso',
    url: '',
  },
  {
    title: '[Sua certificação]',
    institution: '[Emissor da certificação]',
    period: '2025',
    kind: 'Certificação',
    url: '',
  },
]
