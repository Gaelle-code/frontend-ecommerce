import { Link, NavLink, Outlet } from 'react-router-dom'
import { ShoppingBag, LogOut, UserCircle, Package } from 'lucide-react'
import { useAuth } from '../features/auth/AuthProvider'
import { useEffect, useState } from 'react'
import { getCart } from '../features/cart/cartApi'

const Layout = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (!isAuthenticated) {
      setCartCount(0)
      return
    }

    const fetchCartCount = async () => {
      try {
        const response = await getCart()
        const items = response.data?.items ?? []
        const count = items.reduce((sum, item) => sum + item.quantity, 0)
        setCartCount(count)
      } catch {
        setCartCount(0)
      }
    }

    fetchCartCount()
  }, [isAuthenticated])

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <ShoppingBag size={22} />
          <span>Ecomus Store</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/">Products</NavLink>
          <NavLink to="/cart">Cart{cartCount > 0 ? ` (${cartCount})` : ''}</NavLink>
          {isAuthenticated ? <NavLink to="/orders">Orders</NavLink> : null}
        </nav>
        <div className="topbar-actions">
          {isAuthenticated ? (
            <>
              <span className="user-pill">
                <UserCircle size={16} /> {user?.email}
              </span>
              <button className="icon-button" type="button" onClick={logout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link className="text-link" to="/login">
                Login
              </Link>
              <Link className="text-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="page-shell">
        <Outlet />
      </main>
      <footer className="footer">
        <span>Powered by Ecomus API</span>
        <span className="footer-meta">
          <Package size={16} /> Live storefront demo
        </span>
      </footer>
    </div>
  )
}

export default Layout
