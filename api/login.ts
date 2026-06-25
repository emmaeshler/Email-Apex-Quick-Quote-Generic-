import type { VercelRequest, VercelResponse } from '@vercel/node'
import { authenticateUser, createSessionToken, sessionCookie } from './_auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { email, password } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: 'Email and password are required' })
  }

  const session = await authenticateUser(email, password)
  if (!session) {
    return res.status(401).json({ ok: false, error: 'Invalid credentials' })
  }

  const token = await createSessionToken(session)
  res.setHeader('Set-Cookie', sessionCookie(token, 86400))
  return res.status(200).json({ ok: true, session })
}
