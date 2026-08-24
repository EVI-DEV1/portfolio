import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { profile } from '../../lib/content'
import { whatsappLink } from '../../lib/whatsapp'

interface SocialLinksProps {
  className?: string
  /** Tamanho do quadrado do ícone. */
  size?: 'md' | 'lg'
}

/** Ícones sociais reutilizados no hero, contato e footer. Links vazios não renderizam. */
export function SocialLinks({ className = '', size = 'md' }: SocialLinksProps) {
  const box = size === 'lg' ? 'size-11' : 'size-10'
  const icon = size === 'lg' ? 'size-5' : 'size-[1.05rem]'

  const items = [
    { href: profile.socials.github, label: 'GitHub', Icon: FaGithub },
    { href: profile.socials.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
    { href: profile.socials.instagram ?? '', label: 'Instagram', Icon: FaInstagram },
    { href: whatsappLink(profile.socials.whatsapp ?? ''), label: 'WhatsApp', Icon: FaWhatsapp },
  ].filter((i) => i.href)

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`${box} flex items-center justify-center rounded-xl border border-line bg-white/[0.03] text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-light/60 hover:text-ink hover:shadow-[0_6px_20px_-4px_rgba(139,92,246,0.5)]`}
          >
            <Icon className={icon} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  )
}
