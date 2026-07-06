# Ecomus storefront

A responsive React storefront that consumes the live Ecomus REST API for public product browsing, authentication, and cart flows.

## Features

- Browse products from the public catalog
- Search, filter by category, and sort products
- View product details and add items to the cart
- Register/login with the API and protect cart/order routes
- Review order history from the authenticated API
- Responsive layout for mobile, tablet, and desktop

## Tech stack

- React + TypeScript + Vite
- React Router
- Axios
- Lucide icons

## Environment

Create a `.env` file from `.env.example`:

```bash
VITE_API_BASE_URL=https://e-commas-apis-production-e0f8.up.railway.app
```

## API integration

- Live base URL: `https://e-commas-apis-production-e0f8.up.railway.app`
- Swagger docs: `https://e-commas-apis-production-e0f8.up.railway.app/api-docs/`
- All API calls are centralized in the `src/features/*/*Api.ts` modules and use `src/lib/apiClient.ts` for axios configuration.
- Authentication requests use `/api/auth/users/register`, `/api/auth/users/login`, and `/api/auth/users/me`.
- Cart requests use protected routes under `/api/auth/cart` and require a bearer token stored in `localStorage`.
- `POST /api/auth/cart/items` requires a `productId`, a `variantId`, and a `quantity` in the request payload.
- Cart items may include a nested `variant` object or fallback `variantId` in responses, and the frontend surfaces that metadata in the cart and checkout UI.
- Orders are placed with `/api/auth/orders` and order history is fetched from the same endpoint.
- Product browsing uses `/api/public/products`, `/api/public/products/{id}`, and `/api/categories`.
- The app handles loading, error, and empty states explicitly for every API-driven view.
- Note: the live API currently returns empty `images` arrays for many products, so the frontend provides fallback demo images in `src/features/products/productsApi.ts`.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- The public products and categories endpoints are used directly.
- Authentication uses JWT tokens stored in localStorage as the API relies on bearer tokens.
- The cart endpoints are wired to the API when available; if the API returns an unsupported payload, the UI surfaces the error rather than pretending the cart has succeeded.
- The order history endpoint exists but may return an empty list for new accounts.
