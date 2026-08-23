import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Digita `text` caractere por caractere uma única vez.
 * Quem prefere movimento reduzido vê o texto completo de imediato.
 */
export function useTypingEffect(text: string, speedMs = 140, startDelayMs = 400) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? text.length : 0)

  useEffect(() => {
    if (reduce) return
    let i = 0
    let interval: ReturnType<typeof setInterval> | undefined
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length && interval) clearInterval(interval)
      }, speedMs)
    }, startDelayMs)
    return () => {
      clearTimeout(start)
      if (interval) clearInterval(interval)
    }
  }, [text, speedMs, startDelayMs, reduce])

  return { typed: text.slice(0, count), done: count >= text.length }
}
