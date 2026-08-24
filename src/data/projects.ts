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
 * │  • example: true = selo "Exemplo" (conteúdo ilustrativo).    │
 * │                                                              │
 * │  Lista atual: todos os projetos são REAIS, importados do     │
 * │  seu GitHub (EVI-DEV1) e da sua máquina em 2026-08-23.       │
 * ╰──────────────────────────────────────────────────────────────╯
 */
export const projects: Project[] = [
  {
    id: 'hand-ctrl',
    name: 'HAND//CTRL',
    description:
      'Experiência de visão computacional: sua mão vira o controle de um universo de partículas em WebGL. Rastreamento em tempo real com MediaPipe, reconhecedor de gestos próprio e shaders GLSL — tudo processado no navegador, sem backend.',
    image: '/projects/hand-ctrl.jpg',
    tags: ['React', 'TypeScript', 'Three.js', 'WebGL', 'MediaPipe'],
    github: 'https://github.com/EVI-DEV1/hand-ctrl',
    demo: '',
    featured: true,
  },
  {
    id: 'devorbit',
    name: 'DevOrbit',
    description:
      'Plataforma para devs com feed de artigos, cursos, ranking semanal, autenticação e painel administrativo completo.',
    image: '/projects/devorbit.png',
    tags: ['React', 'Styled Components', 'API REST'],
    github: 'https://github.com/EVI-DEV1/devorbit',
    demo: '',
    featured: true,
  },
  {
    id: 'poupe-ai',
    name: 'Poupe.ai',
    description:
      'Educador financeiro inteligente com React e IA Generativa — simulações personalizadas em 6 passos. Projeto do Bootcamp Santander AI React Front-end.',
    image: '/projects/poupe-ai.png',
    tags: ['React', 'TypeScript', 'IA Generativa'],
    github: 'https://github.com/EVI-DEV1/POUPE.AI',
    demo: 'https://poupe-ai.vercel.app',
    featured: true,
  },
  {
    id: 'estacionamento',
    name: 'Estacionamento',
    description:
      'Sistema de controle de estacionamento com registro de placas, histórico e caixa, em JavaScript puro.',
    image: '/projects/estacionamento.png',
    tags: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/EVI-DEV1/ESTACIONAMENTO',
    demo: '',
    featured: false,
  },
  {
    id: 'classificador-herois',
    name: 'Classificador de Heróis',
    description:
      'Desafios de lógica da DIO: classificação de heróis por XP, cálculo de partidas rankeadas e mecânicas de jogo.',
    image: '',
    tags: ['JavaScript', 'Lógica'],
    github: 'https://github.com/EVI-DEV1/CLASSIFICADOR.DE.HEROIS',
    demo: '',
    featured: false,
  },
  {
    id: 'contador',
    name: 'Contador',
    description:
      'Contador interativo manipulando a DOM com JavaScript — um dos primeiros projetos da minha jornada.',
    image: '',
    tags: ['JavaScript', 'DOM'],
    github: 'https://github.com/EVI-DEV1/CONTADOR',
    demo: '',
    featured: false,
  },
]
