import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'
import type { AuthUser } from './_auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { username } = req.body ?? {}
  if (!username) {
    return res.status(400).json({ error: 'Username is required' })
  }

  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    return res.status(500).json({ error: 'Auth not configured' })
  }

  try {
    const redis = new Redis({ url, token })
    const users = (await redis.get<AuthUser[]>('auth:users')) ?? []
    const user = users.find(u => u.email.toLowerCase() === username.toLowerCase())

    if (!user) {
      return res.json({ status: 'not_found' })
    }

    if (user.expiresAt && Date.now() > user.expiresAt) {
      return res.json({ status: 'expired' })
    }

    if (user.hash === '') {
      return res.json({
        status: 'needs_setup',
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
      })
    }

    return res.json({ status: 'active' })
  } catch {
    return res.status(500).json({ error: 'Unable to connect to authentication service' })
  }
}
