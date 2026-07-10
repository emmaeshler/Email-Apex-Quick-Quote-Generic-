import { useEffect } from 'react'
import { redirectToLogin } from './authApi'

export default function LoginPage() {
  useEffect(() => {
    redirectToLogin()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <p style={{ color: '#666', fontSize: 14 }}>Redirecting to sign in...</p>
    </div>
  )
}
