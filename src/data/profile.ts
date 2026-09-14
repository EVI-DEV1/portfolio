import type { Profile, Stat } from '../types'

/**
 * Arquivo gerado pelo painel admin em 12/09/2026.
 * Para publicar: substitua src/data/profile.ts por este arquivo,
 * confira com `npm run dev` e faça commit + push.
 */
export const profile: Profile = {
  "brand": "EVI",
  "fullName": "Eliane Vitoriano Luiz",
  "role": "Desenvolvedora Front-end",
  "headline": "Desenvolvedora Front-end apaixonada por criar experiências web modernas, acessíveis e de alta performance.",
  "location": "São José dos Campos — SP",
  "email": "e.vitoriano@outlook.com",
  "phone": "",
  "avatar": "/profile.jpg",
  "resumeUrl": "/cv.pdf",
  "socials": {
    "github": "https://github.com/EVI-DEV1",
    "linkedin": "https://www.linkedin.com/in/eliane-vitoriano-luiz-1152892b1",
    "instagram": "",
    "whatsapp": "(12) 98231-9139"
  },
  "about": [
    "Tenho 23 anos e sou apaixonada por tecnologia desde sempre. Comecei minha jornada na programação com HTML e CSS e hoje atuo com foco em React, criando interfaces modernas e funcionais.",
    "Acredito que tecnologia transforma vidas e busco sempre aprender algo novo todos os dias."
  ]
}

/** Cards de números da seção "Sobre mim". */
export const stats: Stat[] = [
  {
    "value": "1-",
    "label": "Anos de experiência",
    "description": "Desenvolvendo soluções para web",
    "icon": "Rocket"
  },
  {
    "value": "15+",
    "label": "Projetos concluídos",
    "description": "Entre pessoais e profissionais",
    "icon": "Code2"
  },
  {
    "value": "100%",
    "label": "Comprometimento",
    "description": "Com qualidade e resultado",
    "icon": "Users"
  },
  {
    "value": "Sempre",
    "label": "Aprendendo",
    "description": "Evoluindo como desenvolvedora",
    "icon": "BookOpen"
  }
]
