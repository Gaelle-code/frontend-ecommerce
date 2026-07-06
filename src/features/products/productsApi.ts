import apiClient from '../../lib/apiClient'

export interface ProductCategory {
  id: string
  name: string
  description?: string | null
}

// Files attached to products are represented with a URL and optional metadata.
export interface FileReference {
  url: string
  format?: string
  size?: number
}

// Variants are selectable options for products, and the cart API requires a variant id
// when adding an item to the cart. The storefront uses these values to render and
// select the correct product variant.
export interface Variant {
  id: string
  color?: string
  size?: string
  sku?: string
  price?: number
  stock?: number
}

export interface Product {
  id: string
  name: string
  description: string
  categoryId: string
  brand?: string
  price: number
  stock: number
  images?: FileReference[]
  variants?: Variant[]
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
  const { data } = await apiClient.get<{ success: boolean; data: { product: Product } }>('/api/public/products/' + id)
  return data.data.product || data.data
}

export const getCategories = async () => {
  const { data } = await apiClient.get<{ success: boolean; data: ProductCategory[] }>('/api/categories')
  return data.data
}
