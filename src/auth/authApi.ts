export interface Session {
  email: string
  displayName?: string
}

export function redirectToLogin() {
  window.location.href = '/api/login-redirect'
}

export async function getSession(): Promise<Session | null> {
  try {
    const res = await fetch('/api/session')
    if (!res.ok) return null
    const data = await res.json()
    return data.ok ? data.session : null
  } catch {
    return null
  }
}

export async function logout(): Promise<void> {
  await fetch('/api/logout', { method: 'POST' })
}
