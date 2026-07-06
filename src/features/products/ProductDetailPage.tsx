import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addToCart } from '../cart/cartApi'
import { getProductById } from './productsApi'
import type { Product } from './productsApi'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!id) {
      return
    }

    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await getProductById(id)
        setProduct(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load this product.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!product) {
      return
    }
    try {
      const response = await addToCart(product.id, 1)
      setMessage(response.message || 'Added to cart.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unable to add to cart.')
    }
  }

  if (loading) {
    return <div className="page-state">Loading product details…</div>
  }

  if (error) {
    return <div className="page-state error-state">{error}</div>
  }

  if (!product) {
    return <div className="page-state">This product could not be found.</div>
  }

  return (
    <section className="stack">
      <Link className="text-link" to="/">
        ← Back to products
      </Link>
      <div className="detail-layout card">
        <div className="product-image large" aria-hidden="true">
          {product.images?.[0] ? <img src={product.images[0]} alt={product.name} /> : <span>Product image</span>}
        </div>
        <div className="stack">
          <p className="eyebrow">{product.category?.name || 'Uncategorized'}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="meta-row">
            <span>Brand: {product.brand || '—'}</span>
            <span>Stock: {product.stock}</span>
          </div>
          <strong className="price">${product.price.toFixed(2)}</strong>
          <button type="button" onClick={handleAddToCart}>
            Add to cart
          </button>
          {message ? <p className="form-success">{message}</p> : null}
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
