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

export interface PublishResult {
  ok: boolean
  error?: string
  commitUrl?: string
}

/**
 * Publica um arquivo de src/data/ direto no site no ar (commit via
 * /api/publish). `password` é a senha da sessão admin atual —
 * conferida de novo no servidor a cada chamada.
 */
export const VERCEL_DEV_HINT =
  'Isso não funciona com `npm run dev` puro (Vite não roda funções serverless) — use `npx vercel dev` para testar o painel completo, ou teste direto no site publicado.'

export async function publish(file: string, password: string, content: string): Promise<PublishResult> {
  try {
    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file, password, content }),
    })
    if (!(res.headers.get('content-type') ?? '').includes('application/json')) {
      return { ok: false, error: VERCEL_DEV_HINT }
    }
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; commitUrl?: string } | null
    if (!res.ok || !data?.ok) {
      return { ok: false, error: data?.error ?? `Falha ao publicar (HTTP ${res.status}).` }
    }
    return { ok: true, commitUrl: data.commitUrl }
  } catch {
    return { ok: false, error: 'Não consegui falar com /api/publish — confira sua internet.' }
  }
}
