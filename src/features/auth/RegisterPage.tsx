import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from './authApi'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const response = await registerUser({ name, email, password })
      setSuccess(response.message || 'Registration successful. Please sign in.')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to create an account right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card auth-card">
      <h1>Create your account</h1>
      <p>Join ShopWithGaelle to save favorites, track orders, and enjoy a faster checkout experience.</p>
      <form className="stack" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        {success ? <p className="form-success">{success}</p> : null}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Register'}
        </button>
      </form>
      <p className="muted-text">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </section>
  )
}

export default RegisterPage
