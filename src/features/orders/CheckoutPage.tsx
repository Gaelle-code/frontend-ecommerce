import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCart } from '../cart/cartApi'
import { placeOrder } from './ordersApi'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState<Array<{ id: string; productName?: string; productId: string; quantity: number; price: number }>>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true)
        const response = await getCart()
        setItems(response.data?.items ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load your cart.')
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])

  const handleCheckout = async () => {
    try {
      setSubmitting(true)
      const response = await placeOrder()
      if (response.success) {
        navigate('/orders', { state: { orderPlaced: true } })
        return
      }
      setError(response.message || 'Checkout could not be completed.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout could not be completed.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="page-state">Preparing checkout…</div>
  }

  if (error) {
    return <div className="page-state error-state">{error}</div>
  }

  return (
    <section className="stack">
      <div className="section-heading">
        <h1>Checkout</h1>
        <Link className="text-link" to="/cart">
          Back to cart
        </Link>
      </div>
      <div className="cart-layout">
        <div className="stack">
          {items.map((item) => (
            <article key={item.id} className="card">
              <div className="section-heading">
                <h2>{item.productName || item.productId}</h2>
                <span>{item.quantity} × ${item.price.toFixed(2)}</span>
              </div>
            </article>
          ))}
        </div>
        <aside className="card summary-card">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button type="button" onClick={handleCheckout} disabled={submitting || items.length === 0}>
            {submitting ? 'Placing order…' : 'Place order'}
          </button>
        </aside>
      </div>
    </section>
  )
}

export default CheckoutPage
