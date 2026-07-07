import { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  SvgIcon,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import { useAuth } from './AuthContext'
import { checkUser, setupAccount } from './authApi'

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /\d/.test(p) },
  { label: 'One special character (!@#$%^&*…)', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

function validatePassword(password: string): string | null {
  for (const rule of PASSWORD_RULES) {
    if (!rule.test(password)) return rule.label.toLowerCase()
  }
  return null
}

function PasswordChecklist({ password }: { password: string }) {
  if (!password) return null
  return (
    <Box component="ul" sx={{ listStyle: 'none', p: 0, mb: 2, mt: 0.5 }}>
      {PASSWORD_RULES.map(rule => {
        const pass = rule.test(password)
        return (
          <Box
            component="li"
            key={rule.label}
            sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: 12, color: pass ? 'success.main' : '#999', mb: 0.25 }}
          >
            <span style={{ fontSize: 10 }}>{pass ? '✓' : '•'}</span>
            {rule.label}
          </Box>
        )
      })}
    </Box>
  )
}

function I2PLogo() {
  return (
    <SvgIcon sx={{ fontSize: 44 }} viewBox="0 0 28 28">
      <rect x={0} y={0} width={12} height={12} fill="#d4712a" />
      <rect x={16} y={0} width={12} height={12} fill="#e8944a" />
      <rect x={0} y={16} width={12} height={12} fill="#1e2a3a" />
      <rect x={16} y={16} width={12} height={12} fill="#d4712a" />
    </SvgIcon>
  )
}

function RequestAccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [urgency, setUrgency] = useState('normal')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setFirstName('')
      setLastName('')
      setEmail('')
      setNotes('')
      setUrgency('normal')
      setError(null)
      setSuccess(false)
    }, 200)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('https://password-admin.vercel.app/api/access-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, notes, urgency, source: 'email-apex-qq' }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Request failed')
      }
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      {success ? (
        <Box sx={{ textAlign: 'center', py: 5, px: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: '#e8f5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: 28, color: '#2e7d32', fontWeight: 700 }}>✓</Typography>
          </Box>
          <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>Request Submitted</Typography>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 3 }}>
            An administrator has been notified
          </Typography>
          <Button onClick={handleClose} variant="outlined" sx={{ textTransform: 'none' }}>
            Close
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>Request Access</DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                size="small"
                fullWidth
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                size="small"
                fullWidth
              />
            </Box>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              size="small"
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Reason for access"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              multiline
              rows={3}
              size="small"
              fullWidth
              sx={{ mt: 2 }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 0.75 }}>Priority</Typography>
              <ToggleButtonGroup
                value={urgency}
                exclusive
                onChange={(_, v) => { if (v) setUrgency(v) }}
                size="small"
                fullWidth
              >
                <ToggleButton
                  value="urgent"
                  sx={{
                    textTransform: 'none',
                    color: '#d32f2f',
                    '&.Mui-selected': { bgcolor: '#fbe9e7', color: '#d32f2f', borderColor: '#d32f2f' },
                  }}
                >
                  Urgent
                </ToggleButton>
                <ToggleButton value="normal" sx={{ textTransform: 'none' }}>
                  Normal
                </ToggleButton>
                <ToggleButton value="low" sx={{ textTransform: 'none' }}>
                  Low Priority
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose} sx={{ textTransform: 'none', color: '#666' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                bgcolor: '#00446a',
                '&:hover': { bgcolor: '#003555' },
              }}
            >
              {submitting ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Submit Request'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  )
}

type Step = 'username' | 'password' | 'setup'

export default function LoginPage() {
  const { login, setSession } = useAuth()
  const [requestOpen, setRequestOpen] = useState(false)
  const [step, setStep] = useState<Step>('username')
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [prefill, setPrefill] = useState<{ firstName?: string; lastName?: string }>({})
  const [setupPassword, setSetupPassword] = useState('')

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Please enter your email or username.')
      return
    }
    setError(null)
    setSubmitting(true)

    const result = await checkUser(username.trim())
    setSubmitting(false)

    if (result.status === 'needs_setup') {
      setPrefill({ firstName: result.firstName ?? '', lastName: result.lastName ?? '' })
      setStep('setup')
    } else if (result.status === 'expired') {
      setError('This account has expired. Please contact your administrator.')
    } else {
      setStep('password')
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const form = new FormData(e.currentTarget as HTMLFormElement)
    const password = form.get('password') as string
    if (!password) {
      setError('Please enter your password.')
      return
    }
    setSubmitting(true)
    const err = await login(username.trim(), password)
    setSubmitting(false)
    if (err) setError(err)
  }

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const form = new FormData(e.currentTarget as HTMLFormElement)
    const firstName = (form.get('firstName') as string)?.trim()
    const lastName = (form.get('lastName') as string)?.trim()
    const password = form.get('password') as string
    const confirm = form.get('confirm') as string

    if (!firstName || !lastName) {
      setError('First and last name are required.')
      return
    }
    const pwError = validatePassword(password)
    if (pwError) {
      setError(`Password needs ${pwError}.`)
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    const result = await setupAccount(username.trim(), firstName, lastName, password)
    setSubmitting(false)
    if ('error' in result) {
      setError(result.error)
    } else {
      setSession(result.session)
    }
  }

  const handleBack = () => {
    setStep('username')
    setError(null)
    setSetupPassword('')
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f5f5f5',
    }}>
      <Paper
        elevation={0}
        sx={{
          width: { xs: '100%', sm: 400 },
          mx: { xs: 2, sm: 'auto' },
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          textAlign: 'center',
        }}
      >
        <I2PLogo />
        <Typography sx={{ mt: 2, mb: 0.5, fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>
          Email Quoting Demo
        </Typography>
        <Typography sx={{ mb: 3, fontSize: 14, color: 'text.secondary' }}>
          Sign in to access your account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
            {error}
          </Alert>
        )}

        {step === 'username' && (
          <form onSubmit={handleUsernameSubmit}>
            <TextField
              fullWidth
              label="Email or Username"
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              size="small"
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                bgcolor: '#00446a',
                textTransform: 'none',
                fontWeight: 600,
                py: 1.2,
                '&:hover': { bgcolor: '#003555' },
              }}
            >
              {submitting ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Continue'}
            </Button>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit}>
            <input type="hidden" name="username" autoComplete="username" value={username} />
            <Typography sx={{ mb: 2, fontSize: 14, color: 'text.secondary', textAlign: 'left' }}>
              Signing in as <strong>{username}</strong>
            </Typography>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              autoFocus
              size="small"
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                bgcolor: '#00446a',
                textTransform: 'none',
                fontWeight: 600,
                py: 1.2,
                '&:hover': { bgcolor: '#003555' },
              }}
            >
              {submitting ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Sign In'}
            </Button>
            <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                onClick={handleBack}
                sx={{ textTransform: 'none', fontSize: 13, color: '#666', p: 0, minWidth: 0 }}
              >
                &larr; Back
              </Button>
              <Typography
                component="a"
                href="https://password-admin.vercel.app/forgot-password"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontSize: 13, color: '#666', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Forgot password?
              </Typography>
            </Box>
          </form>
        )}

        {step === 'setup' && (
          <form onSubmit={handleSetupSubmit}>
            <input type="hidden" name="username" autoComplete="username" value={username} />
            <Alert severity="info" sx={{ mb: 2, textAlign: 'left' }}>
              Welcome! Set up your account to get started.
            </Alert>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              defaultValue={prefill.firstName}
              required
              autoFocus
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              defaultValue={prefill.lastName}
              required
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              required
              size="small"
              value={setupPassword}
              onChange={e => setSetupPassword(e.target.value)}
              sx={{ mb: 0.5 }}
            />
            <PasswordChecklist password={setupPassword} />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirm"
              autoComplete="new-password"
              required
              size="small"
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                bgcolor: '#00446a',
                textTransform: 'none',
                fontWeight: 600,
                py: 1.2,
                '&:hover': { bgcolor: '#003555' },
              }}
            >
              {submitting ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Create Account'}
            </Button>
            <Box sx={{ mt: 1.5, textAlign: 'left' }}>
              <Button
                onClick={handleBack}
                sx={{ textTransform: 'none', fontSize: 13, color: '#666', p: 0, minWidth: 0 }}
              >
                &larr; Back
              </Button>
            </Box>
          </form>
        )}

        {step === 'username' && (
          <>
            <Typography
              component="a"
              href="https://password-admin.vercel.app/forgot-password"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'block', mt: 1.5, fontSize: 13, color: '#666', textAlign: 'center', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Forgot password?
            </Typography>
            <Box sx={{ mt: 2.5, pt: 2.5, borderTop: '1px solid #eee' }}>
              <Typography sx={{ mb: 0.75, fontSize: 13, color: 'text.secondary' }}>
                Don&apos;t have an account?
              </Typography>
              <Button
                onClick={() => setRequestOpen(true)}
                variant="outlined"
                fullWidth
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: '#ccc',
                  color: '#333',
                  '&:hover': { borderColor: '#999', bgcolor: '#fafafa' },
                }}
              >
                Request Access
              </Button>
            </Box>
          </>
        )}

        <RequestAccessModal open={requestOpen} onClose={() => setRequestOpen(false)} />
      </Paper>
    </Box>
  )
}
