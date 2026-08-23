import type { Project } from '../types'

/**
 * ╭──────────────────────────────────────────────────────────────╮
 * │  SEUS PROJETOS — para adicionar um projeto novo, copie um    │
 * │  objeto abaixo, ajuste os campos e pronto: o card, os        │
 * │  filtros e o selo "Destaque" se montam sozinhos.             │
 * │                                                              │
 * │  • image: coloque a capa em /public/projects/ e aponte o     │
 * │    caminho (ex.: '/projects/meu-app.png'). Com image: '',    │
 * │    o site gera uma capa bonita automaticamente.              │
 * │  • tags: alimentam os filtros por tecnologia.                │
 * │  • github / demo: deixe '' para ocultar o botão.             │
 * │  • featured: true = selo "Destaque" no card.                 │
 * │                                                              │
 * │  ⚠ Os projetos abaixo são EXEMPLOS ilustrativos — troque     │
 * │  pelos seus projetos reais (nome, descrição e links).        │
 * ╰──────────────────────────────────────────────────────────────╯
 */
export const projects: Project[] = [
  {
    id: 'devorbit',
    name: 'DevOrbit',
    description:
      'Plataforma para devs com feed de artigos, cursos, ranking semanal, autenticação e painel administrativo completo.',
    image: '/projects/devorbit.png',
    tags: ['React', 'Styled Components', 'API REST'],
    github: 'https://github.com/EVI-DEV1',
    demo: '',
    featured: true,
  },
  {
    id: 'poupe-ai',
    name: 'Poupe.ai',
    description:
      'Educador financeiro inteligente com React e IA Generativa — projeto desenvolvido no Bootcamp Santander AI React Front-end da DIO.',
    image: '',
    tags: ['React', 'IA Generativa'],
    github: 'https://github.com/EVI-DEV1',
    demo: '',
    featured: true,
  },
  {
    id: 'taskflow',
    name: 'TaskFlow',
    description:
      'Aplicação para gerenciamento de tarefas com foco em produtividade.',
    image: '',
    tags: ['TypeScript', 'React'],
    github: 'https://github.com/EVI-DEV1',
    demo: '',
    featured: false,
    example: true,
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description:
      'Loja virtual completa com carrinho, pagamentos e painel administrativo.',
    image: '',
    tags: ['React', 'JavaScript', 'Firebase'],
    github: 'https://github.com/EVI-DEV1',
    demo: '',
    featured: false,
    example: true,
  },
  {
    id: 'weather-app',
    name: 'Weather App',
    description:
      'Aplicação de previsão do tempo com geolocalização e API externa.',
    image: '',
    tags: ['JavaScript', 'APIs'],
    github: 'https://github.com/EVI-DEV1',
    demo: '',
    featured: false,
    example: true,
  },
]
