import apiClient from '../../lib/apiClient'

export interface Order {
  id: string
  total?: number
  createdAt?: string
  items?: Array<{ productId?: string; name?: string; quantity?: number; price?: number }>
}

export const getOrders = async () => {
  const { data } = await apiClient.get<{ success: boolean; data: Order[] }>('/api/auth/orders')
  return data.data
}

export const placeOrder = async () => {
  const { data } = await apiClient.post<{ success: boolean; message: string; data?: { order?: Order } }>('/api/auth/orders')
  return data
}
