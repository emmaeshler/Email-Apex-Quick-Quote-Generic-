import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { Session } from './authApi'
import * as api from './authApi'

interface AuthContextValue {
  session: Session | null
  loading: boolean
  login: () => void
  logout: () => void
  setSession: (session: Session) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getSession().then(s => {
      setSession(s)
      setLoading(false)
    })
  }, [])

  const login = useCallback(() => {
    api.redirectToLogin()
  }, [])

  const logout = useCallback(async () => {
    await api.logout()
    setSession(null)
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading, login, logout, setSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
