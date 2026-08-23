import type { ExperienceItem } from '../types'

/**
 * ╭──────────────────────────────────────────────────────────────╮
 * │  SUA TRAJETÓRIA — a timeline da seção "Experiência".         │
 * │  Adicione, remova ou edite etapas livremente; a linha se     │
 * │  redesenha sozinha.                                          │
 * │                                                              │
 * │  Marcos importados do seu CV real em 2026-08-23.             │
 * ╰──────────────────────────────────────────────────────────────╯
 */
export const experience: ExperienceItem[] = [
  {
    period: '2022',
    title: 'Base técnica',
    description:
      'Concluí o Ensino Médio Técnico em Agropecuária no IF Baiano (Valença) e comecei a trabalhar com atendimento ao público.',
  },
  {
    period: '2023–2024',
    title: 'Administração e vendas',
    description:
      'Formação Técnica em Administração (CPET) e experiências com vendas, atendimento e rotinas administrativas.',
  },
  {
    period: '2024–2025',
    title: 'Serveng Engenharia',
    description:
      'De Aprendiz a Auxiliar Administrativo no setor de Qualidade: dados no sistema Fulcrum (CCR), Excel e fluxo de informações entre campo e escritório.',
  },
  {
    period: '2026',
    title: 'Transição para tecnologia',
    description:
      'Assistente da Qualidade na INC Construtora e mergulho no código: Engenharia de Software (EAD) e bootcamps de React e IA na DIO.',
  },
]
