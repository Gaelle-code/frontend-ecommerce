import apiClient from '../../lib/apiClient'

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  role: string
  createdAt?: string
  updatedAt?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    token?: string
    user: AuthUser
  }
}

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/users/register', payload)
  return data
}

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/users/login', payload)
  return data
}

export const getProfile = async () => {
  const { data } = await apiClient.get<AuthResponse>('/api/auth/users/me')
  return data
}
