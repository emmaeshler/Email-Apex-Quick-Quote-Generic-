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
} from '@mui/material'
import { useAuth } from './AuthContext'

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

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email or Username"
            type="text"
            name="email"
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
        </form>
        <Typography
          component="a"
          href="https://password-admin.vercel.app/forgot-password"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ display: 'block', mt: 1.5, fontSize: 13, color: '#666', textAlign: 'center', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Forgot password?
        </Typography>
      </Paper>
    </Box>
  )
}
