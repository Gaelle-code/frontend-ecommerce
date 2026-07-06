import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getOrders } from './ordersApi'
import type { Order } from './ordersApi'

const OrdersPage = () => {
  const location = useLocation()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const data = await getOrders()
        setOrders(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load your orders.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return <div className="page-state">Loading your orders…</div>
  }

  if (error) {
    return <div className="page-state error-state">{error}</div>
  }

  return (
    <section className="stack">
      <div className="section-heading">
        <h1>Order history</h1>
        <Link className="text-link" to="/">
          Browse products
        </Link>
      </div>
      {location.state?.orderPlaced ? <div className="form-success">Order placed successfully.</div> : null}
      {orders.length === 0 ? (
        <div className="page-state">No orders yet. Place one from your cart to see it here.</div>
      ) : (
        <div className="stack">
          {orders.map((order) => (
            <article key={order.id} className="card order-card">
              <div className="section-heading">
                <h2>Order #{order.id.slice(0, 8)}</h2>
                <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Pending'}</span>
              </div>
              <p>Total: ${((order.total ?? 0)).toFixed(2)}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default OrdersPage
