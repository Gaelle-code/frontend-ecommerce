import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile } from './authApi'
import type { AuthUser } from './authApi'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (token: string, user: AuthUser) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('ecomus_token')
    const storedUser = localStorage.getItem('ecomus_user')
    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
      setLoading(false)
      return
    }

    if (token) {
      getProfile()
        .then((response) => {
          const nextUser = response.data?.user
          if (nextUser) {
            setUser(nextUser)
            localStorage.setItem('ecomus_user', JSON.stringify(nextUser))
          }
        })
        .catch(() => {
          localStorage.removeItem('ecomus_token')
          localStorage.removeItem('ecomus_user')
        })
        .finally(() => setLoading(false))
      return
    }

    setLoading(false)
  }, [])

  const login = (token: string, nextUser: AuthUser) => {
    localStorage.setItem('ecomus_token', token)
    localStorage.setItem('ecomus_user', JSON.stringify(nextUser))
    setUser(nextUser)
    navigate('/')
  }

  const logout = () => {
    localStorage.removeItem('ecomus_token')
    localStorage.removeItem('ecomus_user')
    setUser(null)
    navigate('/login')
  }

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout, loading }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
