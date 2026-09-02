import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Confere a senha do painel admin no servidor (ADMIN_SECRET nunca
 * vai para o navegador — ao contrário da antiga VITE_ADMIN_PASSWORD,
 * que ficava embutida no JS do site).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método não permitido.' })
    return
  }

  const secret = process.env.ADMIN_SECRET
  if (!secret) {
    res.status(503).json({
      ok: false,
      configured: false,
      error: 'ADMIN_SECRET ainda não configurado na Vercel — veja o README (seção Painel admin).',
    })
    return
  }

  const { password } = (req.body ?? {}) as { password?: string }
  if (typeof password !== 'string' || password !== secret) {
    res.status(401).json({ ok: false, error: 'Senha incorreta.' })
    return
  }

  res.status(200).json({ ok: true })
}
