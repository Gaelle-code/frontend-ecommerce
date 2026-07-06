import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCart, removeCartItem, updateCartItem } from './cartApi'
import type { CartItem } from './cartApi'

const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await getCart()
      setItems(response.data?.items ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load cart.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const onQuantityChange = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      return
    }
    try {
      await updateCartItem(itemId, quantity)
      await fetchCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update quantity.')
    }
  }

  const onRemove = async (itemId: string) => {
    try {
      await removeCartItem(itemId)
      await fetchCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to remove item.')
    }
  }

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])

  if (loading) {
    return <div className="page-state">Loading cart…</div>
  }

  if (error) {
    return <div className="page-state error-state">{error}</div>
  }

  return (
    <section className="stack">
      <div className="section-heading">
        <h1>Your cart</h1>
        <Link className="text-link" to="/">
          Continue shopping
        </Link>
      </div>
      {items.length === 0 ? (
        <div className="page-state">Your cart is empty right now.</div>
      ) : (
        <div className="cart-layout">
          <div className="stack">
            {items.map((item) => (
              <article key={item.id} className="card cart-item">
                <div>
                  <h2>{item.productName || item.productId}</h2>
                  <p>${item.price.toFixed(2)} each</p>
                </div>
                <div className="cart-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => onQuantityChange(item.id, Number(event.target.value))}
                  />
                  <button type="button" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </article>
            ))}
          </div>
          <aside className="card summary-card">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Items</span>
              <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link className="button-link" to="/checkout">
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  )
}

export default CartPage
