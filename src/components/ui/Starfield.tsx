import { useReducedMotion } from 'framer-motion'

/**
 * Céu ambiente do site: estrelas que cintilam + estrelas cadentes
 * cruzando a tela em diagonal, numa camada fixa sobre o fundo.
 *
 * Regras do mundo visual: apenas transform/opacity (leve em GPU),
 * cores da família violeta, `aria-hidden` (puro ornamento) e, para
 * quem prefere movimento reduzido, só os pontinhos estáticos.
 * As keyframes vivem em src/index.css (shooting-star / twinkle).
 */

interface Shooting {
  top: string
  left: string
  delay: number
  dur: number
  len: number
}

const SHOOTING: Shooting[] = [
  { top: '6%', left: '78%', delay: 1.2, dur: 9, len: 200 },
  { top: '15%', left: '104%', delay: 4.6, dur: 12, len: 150 },
  { top: '2%', left: '46%', delay: 7.9, dur: 11, len: 230 },
  { top: '30%', left: '94%', delay: 10.3, dur: 13, len: 130 },
  { top: '9%', left: '62%', delay: 13.8, dur: 14, len: 175 },
]

interface Twinkle {
  top: string
  left: string
  size: number
  delay: number
  dur: number
}

const TWINKLES: Twinkle[] = [
  { top: '8%', left: '12%', size: 2, delay: 0, dur: 4.2 },
  { top: '18%', left: '88%', size: 3, delay: 1.1, dur: 5.4 },
  { top: '26%', left: '38%', size: 2, delay: 2.3, dur: 3.8 },
  { top: '34%', left: '72%', size: 2, delay: 0.7, dur: 4.8 },
  { top: '44%', left: '8%', size: 3, delay: 1.9, dur: 5.1 },
  { top: '52%', left: '94%', size: 2, delay: 3.1, dur: 4.4 },
  { top: '58%', left: '28%', size: 2, delay: 0.4, dur: 5.7 },
  { top: '66%', left: '64%', size: 3, delay: 2.6, dur: 4.1 },
  { top: '74%', left: '16%', size: 2, delay: 1.5, dur: 5.9 },
  { top: '80%', left: '84%', size: 2, delay: 3.6, dur: 4.6 },
  { top: '88%', left: '46%', size: 3, delay: 0.9, dur: 5.2 },
  { top: '94%', left: '70%', size: 2, delay: 2.0, dur: 4.9 },
]

export function Starfield() {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {/* estrelas fixas que cintilam */}
      {TWINKLES.map((star, i) => (
        <span
          key={`t-${i}`}
          className="twinkle-star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.dur}s`,
            animationPlayState: reduce ? 'paused' : undefined,
          }}
        />
      ))}

      {/* estrelas cadentes */}
      {!reduce &&
        SHOOTING.map((star, i) => (
          <span
            key={`s-${i}`}
            className="shooting-star-track"
            style={{ top: star.top, left: star.left }}
          >
            <span
              className="shooting-star"
              style={{
                width: star.len,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.dur}s`,
              }}
            />
          </span>
        ))}
    </div>
  )
}
