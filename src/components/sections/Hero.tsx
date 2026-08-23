import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Code2, Rocket } from 'lucide-react'
import { SiReact } from 'react-icons/si'
import { profile } from '../../lib/content'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { Button } from '../ui/Button'
import { SocialLinks } from '../ui/SocialLinks'

/** Chip flutuante ao redor do retrato. */
function FloatingChip({
  children,
  className,
  delay = 0,
  label,
}: {
  children: React.ReactNode
  className: string
  delay?: number
  label: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      role="img"
      aria-label={label}
      className={`absolute flex items-center justify-center rounded-2xl card-glass shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] ${className}`}
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={reduce ? undefined : { duration: 4.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

/** Mini janela de código decorativa (como no layout aprovado). */
function CodeWindow() {
  const lines = [
    ['w-10 bg-primary-light/80', 'w-16 bg-rose-400/70'],
    ['w-6 bg-sky-400/70', 'w-12 bg-ink-faint/60'],
    ['w-14 bg-emerald-400/60', 'w-8 bg-primary-light/60'],
    ['w-9 bg-ink-faint/50', 'w-11 bg-rose-400/50'],
  ]
  return (
    <div className="w-40 p-3">
      <div className="mb-2 flex gap-1.5">
        <span className="size-2 rounded-full bg-rose-400/80" />
        <span className="size-2 rounded-full bg-amber-300/80" />
        <span className="size-2 rounded-full bg-emerald-400/80" />
      </div>
      <div className="space-y-1.5">
        {lines.map((pair, i) => (
          <div key={i} className="flex gap-1.5">
            {pair.map((cls, j) => (
              <span key={j} className={`h-1.5 rounded-full ${cls}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Retrato dentro do hexágono neon. */
function HexPortrait() {
  const reduce = useReducedMotion()
  return (
    <div className="relative mx-auto w-[min(78vw,420px)]">
      {/* brilho atmosférico atrás do hexágono */}
      <div
        aria-hidden
        className="absolute inset-[-15%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.35),rgba(168,85,247,0.12)_45%,transparent_70%)] blur-2xl"
      />

      <svg viewBox="0 0 400 440" className="relative w-full" role="img" aria-label="Foto de perfil emoldurada em um hexágono neon">
        <defs>
          <linearGradient id="hex-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="55%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <clipPath id="hex-clip">
            <path d="M200 16 L372 118 V322 L200 424 L28 322 V118 Z" />
          </clipPath>
          <filter id="hex-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* hexágono de fundo deslocado, como eco */}
        <path
          d="M232 44 L390 138 V330 L232 424"
          fill="none"
          stroke="rgba(168,85,247,0.25)"
          strokeWidth="2"
        />

        <g clipPath="url(#hex-clip)">
          <rect width="400" height="440" fill="#16112e" />
          <image
            href={profile.avatar}
            x="0"
            y="0"
            width="400"
            height="440"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>

        <path
          d="M200 16 L372 118 V322 L200 424 L28 322 V118 Z"
          fill="none"
          stroke="url(#hex-stroke)"
          strokeWidth="3"
          filter="url(#hex-glow)"
        />
      </svg>

      {/* pontinhos decorativos */}
      <div aria-hidden className="absolute -right-2 top-6 grid grid-cols-4 gap-1.5 opacity-60">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="size-1 rounded-full bg-primary-light/70" />
        ))}
      </div>

      <FloatingChip label="Ícone de código" className="left-[-6%] top-[8%] size-16" delay={0}>
        <Code2 className="size-7 text-sky-300" aria-hidden />
      </FloatingChip>
      <FloatingChip label="Ícone do React" className="bottom-[4%] right-[-2%] size-16" delay={1.2}>
        <motion.span
          animate={reduce ? undefined : { rotate: 360 }}
          transition={reduce ? undefined : { duration: 14, repeat: Infinity, ease: 'linear' }}
          className="inline-flex"
        >
          <SiReact className="size-8 text-[#61dafb]" aria-hidden />
        </motion.span>
      </FloatingChip>
      <FloatingChip label="Janela de código" className="right-[-10%] top-[38%] hidden md:flex" delay={0.6}>
        <CodeWindow />
      </FloatingChip>
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const { typed, done } = useTypingEffect(profile.brand)

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section id="inicio" aria-label="Apresentação" className="relative overflow-hidden">
      {/* fundo: grade de pontos + auroras discretas */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(rgba(167,139,250,0.13)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_60%_35%,black_25%,transparent_72%)]"
      />
      <div
        aria-hidden
        className="absolute -left-40 top-[-20%] h-[480px] w-[480px] rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-[-30%] h-[420px] w-[420px] rounded-full bg-fuchsia-glow/15 blur-[120px]"
      />

      <div className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-14 px-5 pb-16 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-20">
        <div>
          <motion.p
            {...enter(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-mono text-[0.72rem] font-medium tracking-wide text-primary-soft"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-light opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-primary-light" />
            </span>
            {profile.role}
          </motion.p>

          <motion.h1
            {...enter(0.15)}
            className="mt-6 font-display text-[clamp(2.6rem,7vw,4.4rem)] font-bold leading-[1.05] tracking-tight text-ink"
          >
            Olá, eu sou{' '}
            <span className="whitespace-nowrap">
              <span className="text-gradient">{typed || ' '}</span>
              <span
                aria-hidden
                className={`ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] rounded-full bg-primary-light align-baseline ${
                  done ? 'animate-pulse' : ''
                }`}
              />
            </span>
          </motion.h1>

          <motion.p {...enter(0.25)} className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            {profile.headline}
          </motion.p>

          <motion.div {...enter(0.35)} className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#projetos" size="lg">
              Ver projetos
              <Rocket className="size-4" aria-hidden />
            </Button>
            <Button href="#contato" variant="outline" size="lg">
              Entrar em contato
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </motion.div>

          <motion.div {...enter(0.45)} className="mt-9">
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.94 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const },
              })}
          className="relative"
        >
          <HexPortrait />
        </motion.div>
      </div>
    </section>
  )
}
