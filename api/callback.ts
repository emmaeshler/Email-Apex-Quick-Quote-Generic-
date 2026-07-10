import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createSessionToken, sessionCookie } from './_auth.js'
import type { SessionPayload } from './_auth.js'

const AUTH_ADMIN_URL = process.env.AUTH_ADMIN_URL || 'https://password-admin.vercel.app'
const BASE_URL = 'https://emailagenticquoting.vercel.app'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = (req.query.token as string) || ''

  if (!token) {
    return redirectToSSO(res, 'invalid_token')
  }

  const apiKey = process.env.AUTH_API_KEY
  if (!AUTH_ADMIN_URL || !apiKey) {
    return res.status(500).json({ error: 'Auth service not configured' })
  }

  try {
    const exchangeRes = await fetch(`${AUTH_ADMIN_URL}/api/auth/exchange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ token }),
    })

    if (!exchangeRes.ok) {
      return redirectToSSO(res, 'invalid_token')
    }

    const data = await exchangeRes.json()
    if (!data.user) {
      return redirectToSSO(res, 'invalid_token')
    }

    const nameParts = [data.user.firstName, data.user.lastName].filter(Boolean)
    const session: SessionPayload = {
      email: data.user.email,
      displayName: nameParts.length > 0 ? nameParts.join(' ') : undefined,
    }

    const jwt = await createSessionToken(session)
    res.setHeader('Set-Cookie', sessionCookie(jwt, 86400))
    return res.redirect(302, '/')
  } catch {
    return redirectToSSO(res, 'exchange_failed')
  }
}

function redirectToSSO(res: VercelResponse, error: string) {
  const callbackUrl = `${BASE_URL}/api/callback`
  const ssoUrl = `${AUTH_ADMIN_URL}/auth?app=email-apex-qq&redirect=${encodeURIComponent(callbackUrl)}&error=${error}`
  return res.redirect(302, ssoUrl)
}
