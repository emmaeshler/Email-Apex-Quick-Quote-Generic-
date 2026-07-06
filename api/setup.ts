import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'
import { hash, genSalt } from 'bcryptjs'
import { createSessionToken, sessionCookie } from './_auth.js'
import type { AuthUser } from './_auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { username, firstName, lastName, password } = req.body ?? {}
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' })
  if (!/[A-Z]/.test(password)) return res.status(400).json({ error: 'Password must include an uppercase letter' })
  if (!/[a-z]/.test(password)) return res.status(400).json({ error: 'Password must include a lowercase letter' })
  if (!/\d/.test(password)) return res.status(400).json({ error: 'Password must include a number' })
  if (!/[^A-Za-z0-9]/.test(password)) return res.status(400).json({ error: 'Password must include a special character' })

  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    return res.status(500).json({ error: 'Auth not configured' })
  }

  try {
    const redis = new Redis({ url, token })
    const users = (await redis.get<AuthUser[]>('auth:users')) ?? []
    const idx = users.findIndex(u => u.email.toLowerCase() === username.toLowerCase())

    if (idx === -1 || users[idx].hash !== '') {
      return res.status(400).json({ error: 'Account not eligible for setup' })
    }

    const user = users[idx]
    const salt = await genSalt(10)
    const hashed = await hash(password, salt)

    user.hash = hashed
    if (firstName?.trim()) user.firstName = firstName.trim()
    if (lastName?.trim()) user.lastName = lastName.trim()
    users[idx] = user
    await redis.set('auth:users', users)

    const nameParts = [user.firstName, user.lastName].filter(Boolean)
    const session = {
      email: user.email,
      displayName: nameParts.length > 0 ? nameParts.join(' ') : undefined,
    }

    const jwt = await createSessionToken(session)
    res.setHeader('Set-Cookie', sessionCookie(jwt, 86400))
    return res.status(200).json({ ok: true, session })
  } catch {
    return res.status(500).json({ ok: false, error: 'Unable to connect to authentication service' })
  }
}
