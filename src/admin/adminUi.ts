/** Estilos compartilhados do painel admin (mesmo mundo visual do site). */

export const fieldClass =
  'w-full rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm text-ink ' +
  'placeholder:text-ink-faint transition-colors duration-200 ' +
  'hover:border-line-strong focus:border-primary-light/70 focus:outline-none ' +
  'focus:ring-2 focus:ring-primary/30'

export const labelClass = 'mb-1.5 block text-[0.8rem] font-medium text-ink-soft'

/** Baixa um arquivo de texto gerado pelo painel. */
export function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
