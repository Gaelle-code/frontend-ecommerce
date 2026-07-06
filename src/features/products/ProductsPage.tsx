import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, getProducts } from './productsApi'
import type { Product, ProductCategory } from './productsApi'

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortMode, setSortMode] = useState('featured')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const [productsResponse, categoriesResponse] = await Promise.all([getProducts(), getCategories()])
        setProducts(productsResponse)
        setCategories(categoriesResponse)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const nextProducts = products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category?.name === categories.find((category) => category.id === selectedCategory)?.name
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch)
      return matchesCategory && matchesSearch
    })

    if (sortMode === 'price-asc') {
      return [...nextProducts].sort((a, b) => a.price - b.price)
    }
    if (sortMode === 'price-desc') {
      return [...nextProducts].sort((a, b) => b.price - a.price)
    }
    if (sortMode === 'name') {
      return [...nextProducts].sort((a, b) => a.name.localeCompare(b.name))
    }
    return nextProducts
  }, [categories, products, search, selectedCategory, sortMode])

  return (
    <section className="stack">
      <div className="hero-card card">
        <div>
          <p className="eyebrow">New season</p>
          <h1>Browse the latest essentials from Ecomus.</h1>
          <p>Search products, filter by category, and explore live details from the API.</p>
        </div>
      </div>

      <div className="toolbar card">
        <input
          aria-label="Search products"
          placeholder="Search products"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      {loading ? (
        <div className="page-state">Loading products…</div>
      ) : error ? (
        <div className="page-state error-state">{error}</div>
      ) : filteredProducts.length === 0 ? (
        <div className="page-state">No products matched your filters.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="card product-card">
              <div className="product-image" aria-hidden="true">
                {product.images?.[0] ? <img src={product.images[0]} alt={product.name} /> : <span>Product image</span>}
              </div>
              <div className="product-content">
                <p className="eyebrow">{product.category?.name || 'Uncategorized'}</p>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="product-footer">
                  <strong>${product.price.toFixed(2)}</strong>
                  <Link className="text-link" to={`/products/${product.id}`}>
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductsPage
