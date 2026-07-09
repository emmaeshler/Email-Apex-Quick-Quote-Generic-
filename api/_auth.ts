import { SignJWT, jwtVerify } from 'jose'
import { compare } from 'bcryptjs'
import { Redis } from '@upstash/redis'
import type { VercelRequest } from '@vercel/node'

export interface AuthUser {
  email: string
  firstName?: string
  lastName?: string
  hash: string
  role: 'admin' | 'viewer' | 'client'
  demos: string
  expiresAt?: number
}

export interface SessionPayload {
  email: string
  displayName?: string
}

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET env var is not set')
  return new TextEncoder().encode(secret)
}

async function getUsers(): Promise<AuthUser[]> {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    throw new Error('KV_REST_API_URL and KV_REST_API_TOKEN must be set')
  }
  const redis = new Redis({ url, token })
  const users = await redis.get<AuthUser[]>('auth:users')
  return users ?? []
}

export async function authenticateUser(email: string, password: string): Promise<SessionPayload | null> {
  const users = await getUsers()
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return null

  if (user.expiresAt && Date.now() > user.expiresAt) return null

  const valid = await compare(password, user.hash)
  if (!valid) return null

  const nameParts = [user.firstName, user.lastName].filter(Boolean)
  return {
    email: user.email,
    displayName: nameParts.length > 0 ? nameParts.join(' ') : undefined,
  }
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecret())
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return {
      email: payload.email as string,
      displayName: (payload.displayName as string) || undefined,
    }
  } catch {
    return null
  }
}

export function parseCookie(req: VercelRequest, name: string): string | undefined {
  const cookie = req.headers.cookie
  if (!cookie) return undefined
  const match = cookie.split(';').map(c => c.trim()).find(c => c.startsWith(`${name}=`))
  return match ? match.slice(name.length + 1) : undefined
}

export function sessionCookie(token: string, maxAge: number): string {
  const parts = [
    `session=${token}`,
    `HttpOnly`,
    `Path=/`,
    `SameSite=Lax`,
    `Max-Age=${maxAge}`,
  ]
  if (process.env.VERCEL) parts.push('Secure')
  return parts.join('; ')
}
