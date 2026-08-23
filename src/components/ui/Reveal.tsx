import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Atraso em segundos (para escalonar cards de uma grade). */
  delay?: number
  /** Direção de onde o elemento entra. */
  from?: 'up' | 'left' | 'right' | 'none'
  className?: string
}

/**
 * Entrada suave ao rolar: o elemento já é visível por padrão para
 * quem prefere movimento reduzido; para os demais, sobe/desliza com
 * ease-out exponencial uma única vez.
 */
export function Reveal({ children, delay = 0, from = 'up', className }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const offset =
    from === 'up' ? { y: 28 } : from === 'left' ? { x: -32 } : from === 'right' ? { x: 32 } : {}

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
