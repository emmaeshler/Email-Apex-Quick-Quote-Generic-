import type { VercelRequest, VercelResponse } from '@vercel/node'

const AUTH_ADMIN_URL = process.env.AUTH_ADMIN_URL || 'https://password-admin.vercel.app'
const BASE_URL = 'https://emailapexqq-gray.vercel.app'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const callbackUrl = `${BASE_URL}/api/callback`
  const ssoUrl = `${AUTH_ADMIN_URL}/auth?app=email-apex-qq&redirect=${encodeURIComponent(callbackUrl)}`
  return res.redirect(302, ssoUrl)
}
