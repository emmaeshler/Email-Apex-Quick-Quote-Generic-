import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseCookie, verifySessionToken } from './_auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const token = parseCookie(req, 'session')
  if (!token) {
    return res.status(401).json({ ok: false, error: 'Not authenticated' })
  }

  const session = await verifySessionToken(token)
  if (!session) {
    return res.status(401).json({ ok: false, error: 'Invalid or expired session' })
  }

  return res.status(200).json({ ok: true, session })
}
