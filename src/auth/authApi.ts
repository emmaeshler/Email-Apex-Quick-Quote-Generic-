export interface Session {
  email: string
  displayName?: string
}

export async function checkUser(username: string): Promise<{
  status: 'active' | 'needs_setup' | 'not_found' | 'expired'
  firstName?: string
  lastName?: string
}> {
  try {
    const res = await fetch('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })
    if (!res.ok) return { status: 'not_found' }
    return await res.json()
  } catch {
    return { status: 'not_found' }
  }
}

export async function setupAccount(
  username: string,
  firstName: string,
  lastName: string,
  password: string,
): Promise<{ session: Session } | { error: string }> {
  try {
    const res = await fetch('/api/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, firstName, lastName, password }),
    })
    const data = await res.json()
    if (!res.ok || !data.ok) return { error: data.error ?? 'Setup failed' }
    return { session: data.session }
  } catch {
    return { error: 'Unable to reach the server. Please try again.' }
  }
}

export async function login(email: string, password: string): Promise<{ session: Session } | { error: string }> {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok || !data.ok) return { error: data.error ?? 'Invalid credentials' }
    return { session: data.session }
  } catch {
    return { error: 'Unable to reach the server. Please try again.' }
  }
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
