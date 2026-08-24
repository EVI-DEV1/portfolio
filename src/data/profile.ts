import type { Profile, Stat } from '../types'

/**
 * ╭──────────────────────────────────────────────────────────────╮
 * │  SEUS DADOS PESSOAIS — edite apenas este arquivo para        │
 * │  mudar nome, textos, links e contatos do site inteiro.       │
 * │                                                              │
 * │  Campos entre [colchetes] são placeholders: troque pelos     │
 * │  seus dados reais antes de divulgar o site.                  │
 * ╰──────────────────────────────────────────────────────────────╯
 */
export const profile: Profile = {
  brand: 'EVI',
  fullName: 'Eliane Vitoriano Luiz',
  role: 'Desenvolvedora Front-end',
  headline:
    'Desenvolvedora Front-end apaixonada por criar experiências web modernas, acessíveis e de alta performance.',
  location: 'São José dos Campos — SP',

  email: 'e.vitoriano@outlook.com',
  // Telefone oculto por padrão — preencha (ex.: '(12) 9 9999-9999') se quiser exibir:
  phone: '',

  // Salve sua foto como public/profile.jpg e ela entra no hexágono
  // automaticamente (enquanto não existir, aparece a arte provisória):
  avatar: '/profile.jpg',

  // Coloque seu currículo em /public/cv.pdf e troque para '/cv.pdf'.
  // Enquanto for '', o botão "Baixar CV" fica oculto.
  resumeUrl: '/cv.pdf',

  socials: {
    github: 'https://github.com/EVI-DEV1',
    linkedin: 'https://www.linkedin.com/in/eliane-vitoriano-luiz-1152892b1',
    // Deixe '' para ocultar o Instagram:
    instagram: '',
    // WhatsApp de serviço (vira link wa.me — deixe '' para ocultar):
    whatsapp: '(12) 98231-9139',
  },

  // Parágrafos da seção "Sobre mim":
  about: [
    'Tenho 23 anos e sou apaixonada por tecnologia desde sempre. Comecei minha jornada na programação com HTML e CSS e hoje atuo com foco em React, criando interfaces modernas e funcionais.',
    'Acredito que tecnologia transforma vidas e busco sempre aprender algo novo todos os dias.',
  ],
}

/** Cards de números da seção "Sobre mim". */
export const stats: Stat[] = [
  {
    value: '2+',
    label: 'Anos de experiência',
    description: 'Desenvolvendo soluções para web',
    icon: 'Rocket',
  },
  {
    value: '15+',
    label: 'Projetos concluídos',
    description: 'Entre pessoais e profissionais',
    icon: 'Code2',
  },
  {
    value: '100%',
    label: 'Comprometimento',
    description: 'Com qualidade e resultado',
    icon: 'Users',
  },
  {
    value: 'Sempre',
    label: 'Aprendendo',
    description: 'Evoluindo como desenvolvedora',
    icon: 'BookOpen',
  },
]
