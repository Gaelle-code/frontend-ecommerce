import apiClient from '../../lib/apiClient'

export interface CartItem {
  id: string
  productId: string
  productName?: string
  price: number
  quantity: number
  subtotal?: number
  image?: string
}

export interface CartResponse {
  success: boolean
  data?: {
    items?: CartItem[]
    total?: number
  }
  message?: string
}

export const getCart = async () => {
  const { data } = await apiClient.get<CartResponse>('/api/auth/cart')
  return data
}

export const addToCart = async (productId: string, quantity = 1) => {
  const { data } = await apiClient.post<CartResponse>('/api/auth/cart/items', { productId, quantity })
  return data
}

export const updateCartItem = async (itemId: string, quantity: number) => {
  const { data } = await apiClient.patch<CartResponse>(`/api/auth/cart/items/${itemId}`, { quantity })
  return data
}

export const removeCartItem = async (itemId: string) => {
  const { data } = await apiClient.delete<CartResponse>(`/api/auth/cart/items/${itemId}`)
  return data
}
