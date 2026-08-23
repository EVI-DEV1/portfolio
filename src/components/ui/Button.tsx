import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-sans text-sm font-semibold transition-all duration-200 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-fuchsia-glow text-white glow-primary ' +
    'hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border border-line-strong bg-white/[0.03] text-ink hover:border-primary-light/60 ' +
    'hover:bg-primary/10 hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'border border-line bg-transparent text-ink-soft hover:text-ink hover:border-line-strong hover:bg-white/[0.04]',
}

const sizes = {
  md: 'px-5 py-2.5',
  lg: 'px-6 py-3 text-[0.95rem]',
  sm: 'px-3.5 py-2 text-[0.8rem]',
}

interface CommonProps {
  variant?: Variant
  size?: keyof typeof sizes
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

/** Botão do design system — vira <a> automaticamente quando recebe href. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', children, className = '', ...rest } = props
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string
    }
    return (
      <a href={href} className={cls} {...anchorRest}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
