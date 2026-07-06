import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { loginUser } from './authApi'

const LoginPage = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await loginUser({ email, password })
      if (response.data?.token && response.data?.user) {
        login(response.data.token, response.data.user)
      } else {
        setError(response.message || 'Unable to sign in right now.')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card auth-card">
      <h1>Sign in</h1>
      <p>Access your cart, place orders, and review your account.</p>
      <form className="stack" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Log in'}
        </button>
      </form>
      <p className="muted-text">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </section>
  )
}

export default LoginPage
