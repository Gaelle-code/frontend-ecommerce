# API endpoints

## Public endpoints

- GET /api/public/products — list public products
- GET /api/public/products/{id} — product details
- GET /api/categories — browse categories

## Authentication

- POST /api/auth/users/register — register a new user
- POST /api/auth/users/login — login and receive a JWT token
- GET /api/auth/users/me — fetch the authenticated user profile

## Cart

- GET /api/auth/cart — fetch cart contents
- POST /api/auth/cart/items — add a product to the cart (requires `productId`, `variantId`, and `quantity`)
- PATCH /api/auth/cart/items/{itemId} — update quantity
- DELETE /api/auth/cart/items/{itemId} — remove an item

## Orders

- GET /api/auth/orders — fetch order history
- POST /api/auth/orders — place an order from the current cart

## Notes

- The cart endpoint may require specific variant metadata in the API. The frontend reports errors when the live response is unsupported instead of silently inventing data.
- Order history may be empty for newly created accounts.
- Authentication tokens are stored in `localStorage` and attached to protected requests by the shared Axios client in `src/lib/apiClient.ts`.
- Product and category calls are implemented in `src/features/products/productsApi.ts`.
- Auth calls are implemented in `src/features/auth/authApi.ts`, cart calls in `src/features/cart/cartApi.ts`, and orders in `src/features/orders/ordersApi.ts`.
- Because the live API currently returns empty `images` arrays, the app maps demo image URLs for products in `src/features/products/productsApi.ts` so the storefront remains visually complete.
