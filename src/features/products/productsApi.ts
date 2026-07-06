import apiClient from '../../lib/apiClient'

export interface ProductCategory {
  id: string
  name: string
  description?: string | null
}

export interface Product {
  id: string
  name: string
  description: string
  categoryId: string
  brand?: string
  price: number
  stock: number
  images?: string[]
  category?: ProductCategory
  createdAt?: string
  updatedAt?: string
}

export interface ProductsResponse {
  success: boolean
  data: {
    all: Product[]
    grouped?: Record<string, Product[]>
  }
}

export const getProducts = async () => {
  const { data } = await apiClient.get<ProductsResponse>('/api/public/products')
  return data.data.all
}

export const getProductById = async (id: string) => {
  const { data } = await apiClient.get<{ success: boolean; data: Product }>('/api/public/products/' + id)
  return data.data
}

export const getCategories = async () => {
  const { data } = await apiClient.get<{ success: boolean; data: ProductCategory[] }>('/api/categories')
  return data.data
}
