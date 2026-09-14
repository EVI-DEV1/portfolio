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
    id: 'centro-inteligencia-operacional',
    name: 'Torre de Controle · Centro de Inteligência Operacional',
    description:
      'Painel executivo em HTML/CSS/JS puros: torre-funil, 10 capítulos, régua por métrica e central de decisões — demonstração com dados fictícios.',
    image: '/projects/centro-inteligencia-operacional.png',
    tags: ['JavaScript', 'CSS', 'HTML'],
    github: 'https://github.com/EVI-DEV1/centro-inteligencia-operacional',
    demo: 'https://centro-inteligencia-operacional.vercel.app',
    featured: true,
  },
  {
    id: 'horizonte-painel',
    name: 'Horizonte · Painel Executivo',
    description:
      'Painel executivo de um programa de indicação fictício, num único HTML sem build nem dependência. Numa tela só: quanto deveria ter, quanto já tem, de onde vêm os cadastros e o que merece atenção, com balão dividido e linhas de fibra óptica animadas em SVG. Os números saem de um gerador com semente que se recusa a gravar se as somas da tela não fecharem.',
    image: '/projects/horizonte-painel.png',
    tags: ['JavaScript', 'HTML', 'CSS', 'SVG', 'Node.js'],
    github: 'https://github.com/EVI-DEV1/painel-executivo-captacao',
    demo: 'https://painel-executivo-captacao.vercel.app',
    featured: true,
  },
  {
    id: 'torre-controle-rotas',
    name: 'Torre de Controle · Equipes de Campo',
    description:
      'Painel de acompanhamento de equipes de rua num único HTML, em JavaScript puro e sem biblioteca: mapa vetorial em canvas com camadas, programação do dia com versões e rotas parada a parada com folha A4 para impressão. Os alertas (fora da rota, GPS offline, equipe parada, atraso) são medidos sobre uma simulação de GPS determinística: o mesmo dia sempre reproduz o mesmo cenário.',
    image: '/projects/torre-controle-rotas.png',
    tags: ['JavaScript', 'Canvas 2D', 'HTML', 'CSS'],
    github: 'https://github.com/EVI-DEV1/torre-controle-rotas',
    demo: 'https://torre-controle-rotas.vercel.app',
    featured: true,
  },
  {
    id: 'libris',
    name: 'Libris',
    description:
      'Sistema de biblioteca inteiro: API REST com as regras de negócio e front-end de operação. O empréstimo é do exemplar físico, nunca do título — e é o servidor, dentro de uma transação, que decide se ele pode sair: barra atraso, limite de simultâneos e exemplar separado para quem está na fila. Duas portas de entrada, funcionários e direção. Só a direção cria login, e a conta nasce na senha padrão da casa: quem recusa até ela ser trocada é a API, não a tela. 33 testes de integração cobrem as regras.',
    image: '/projects/libris.png',
    tags: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'JWT',
      'Zod',
      'Vitest',
    ],
    github: 'https://github.com/EVI-DEV1/libris',
    demo: 'https://libris-chi.vercel.app',
    featured: true,
  },
  {
    id: 'dragon-duas-telas',
    name: 'Dragon · Duas Telas',
    description:
      'Um dragão que atravessa fisicamente de um monitor para o outro. Não é transição de página: as duas janelas compartilham um mundo virtual único, e a borda entre os monitores é a coordenada zero desse mundo. Uma janela simula e transmite as 78 vértebras a 60 Hz por BroadcastChannel; durante a passagem, a cabeça já está numa tela enquanto a cauda ainda está na outra.',
    image: '/projects/dragon-duas-telas.png',
    tags: ['JavaScript', 'Canvas 2D', 'BroadcastChannel', 'Animação'],
    github: 'https://github.com/EVI-DEV1/dragon-duas-telas',
    demo: 'https://dragon-duas-telas.vercel.app',
    featured: true,
  },
  {
    id: 'hand-ctrl',
    name: 'HAND//CTRL',
    description:
      'Experiência de visão computacional: sua mão vira o controle de um universo de partículas em WebGL. Rastreamento em tempo real com MediaPipe, reconhecedor de gestos próprio e shaders GLSL — tudo processado no navegador, sem backend.',
    image: '/projects/hand-ctrl.jpg',
    tags: ['React', 'TypeScript', 'Three.js', 'WebGL', 'MediaPipe'],
    github: 'https://github.com/EVI-DEV1/hand-ctrl',
    demo: 'https://hand-ctrl.vercel.app',
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
