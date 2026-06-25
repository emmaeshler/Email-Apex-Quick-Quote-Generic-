import { useState } from 'react'
import { useAuth } from './AuthContext'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

function I2PLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
      <rect x={0} y={0} width={12} height={12} fill="#d4712a" />
      <rect x={16} y={0} width={12} height={12} fill="#e8944a" />
      <rect x={0} y={16} width={12} height={12} fill="#1e2a3a" />
      <rect x={16} y={16} width={12} height={12} fill="#d4712a" />
    </svg>
  )
}

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Please enter your email or username and password.')
      return
    }
    setSubmitting(true)
    const err = await login(email.trim(), password)
    setSubmitting(false)
    if (err) setError(err)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="w-full max-w-[400px] mx-4 p-8 bg-white rounded-xl border border-[#e0e0e0] text-center">
        <I2PLogo />
        <h1 className="mt-4 mb-1 text-[22px] font-bold text-[#1a1a2e]">
          Email Quoting Demo
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Sign in to access the demo
        </p>

        {error && (
          <div className="mb-4 p-3 text-sm text-left text-red-700 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-2">
            <Label htmlFor="email">Email or Username</Label>
            <Input
              id="email"
              type="text"
              autoComplete="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#00446a] hover:bg-[#003555]"
            disabled={submitting}
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <a
          href="https://password-admin.vercel.app/forgot-password"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-[13px] text-[#666] hover:underline"
        >
          Forgot password?
        </a>
      </div>
    </div>
  )
}
