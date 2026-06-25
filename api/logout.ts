import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sessionCookie } from './_auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  res.setHeader('Set-Cookie', sessionCookie('', 0))
  return res.status(200).json({ ok: true })
}
