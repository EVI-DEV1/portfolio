import { useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react'
import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SocialLinks } from '../ui/SocialLinks'
import { Accent, SectionHeading } from '../ui/SectionHeading'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

const inputClass =
  'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-ink ' +
  'placeholder:text-ink-faint transition-colors duration-200 ' +
  'hover:border-line-strong focus:border-primary-light/70 focus:outline-none ' +
  'focus:ring-2 focus:ring-primary/30'

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // honeypot: bots preenchem, humanos não
    if (data.get('botcheck')) return

    if (!WEB3FORMS_KEY) {
      setStatus('error')
      setErrorMessage(
        'O envio ainda não foi configurado. Fale comigo diretamente pelo e-mail ao lado. 🙂',
      )
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Novo contato pelo portfólio — ${String(data.get('name'))}`,
          from_name: 'Portfólio',
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      })
      const result: { success?: boolean; message?: string } = await response.json()

      if (response.ok && result.success) {
        setStatus('success')
        form.reset()
      } else {
        throw new Error(result.message ?? 'Falha no envio')
      }
    } catch {
      setStatus('error')
      setErrorMessage(
        'Não consegui enviar sua mensagem agora. Tente de novo em instantes ou use o e-mail ao lado.',
      )
    }
  }

  return (
    <section id="contato" aria-label="Contato" className="relative bg-bg-deep">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[320px] w-[560px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading>
              Vamos <Accent>conversar?</Accent>
            </SectionHeading>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
                Estou disponível para novos projetos, freelances e oportunidades incríveis.
                Me chame e retorno o quanto antes!
              </p>

              <ul className="mt-8 space-y-4">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-3.5 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-primary-light transition-colors group-hover:border-primary-light/50">
                      <Mail className="size-4.5" aria-hidden />
                    </span>
                    {profile.email}
                  </a>
                </li>
                {profile.phone ? (
                  <li className="flex items-center gap-3.5 text-sm text-ink-soft">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-primary-light">
                      <Phone className="size-4.5" aria-hidden />
                    </span>
                    {profile.phone}
                  </li>
                ) : null}
                <li className="flex items-center gap-3.5 text-sm text-ink-soft">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-primary-light">
                    <MapPin className="size-4.5" aria-hidden />
                  </span>
                  {profile.location}
                </li>
              </ul>

              <SocialLinks className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={0.15} from="right">
            <form
              onSubmit={handleSubmit}
              noValidate={false}
              className="rounded-2xl card-glass p-6 sm:p-8"
              aria-label="Formulário de contato"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-ink">
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    placeholder="Como posso te chamar?"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-ink">
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="seu@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-ink">
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  placeholder="Me conte sobre seu projeto ou oportunidade…"
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* honeypot anti-spam — invisível para pessoas */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      Enviando…
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                    </>
                  ) : (
                    <>
                      Enviar mensagem
                      <Send className="size-4" aria-hidden />
                    </>
                  )}
                </Button>
              </div>

              <div aria-live="polite">
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 flex items-start gap-2.5 rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-sm text-emerald-200"
                    >
                      <CheckCircle2 className="mt-0.5 size-4.5 shrink-0" aria-hidden />
                      Mensagem enviada com sucesso! Obrigada pelo contato — respondo em breve.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 flex items-start gap-2.5 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-rose-200"
                    >
                      <AlertCircle className="mt-0.5 size-4.5 shrink-0" aria-hidden />
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
