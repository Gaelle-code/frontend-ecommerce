# Walkthrough notes

## Project structure

- src/features/auth — login, register, and protected route handling
- src/features/products — product list and details
- src/features/cart — cart view and cart requests
- src/features/orders — order history flow
- src/lib/apiClient.ts — centralized Axios client with auth headers

## Architecture decisions

- The app uses React Router for navigation and simple route protection
- API requests are centralized in feature modules and the Axios client
- UI state stays local to the component while server-backed data is fetched directly from the API

## Auth flow

- Successful login stores the JWT and user profile in localStorage
- Protected routes redirect unauthenticated users to the login page

## Cart persistence

- Cart data is driven by the live API when available
- If the API rejects an add-to-cart request, the UI surfaces that error instead of silently inventing a success state

## API integration

- Base URL: `https://e-commas-apis-production-e0f8.up.railway.app`
- Swagger docs: `https://e-commas-apis-production-e0f8.up.railway.app/api-docs/`
- Public product browsing uses `/api/public/products` and `/api/public/products/{id}`.
- Categories are fetched with `/api/categories`.
- User registration and login use `/api/auth/users/register` and `/api/auth/users/login`.
- Authenticated profile retrieval uses `/api/auth/users/me`.
- Cart endpoints are protected and use `/api/auth/cart`, `/api/auth/cart/items`, `/api/auth/cart/items/{itemId}`.
- `POST /api/auth/cart/items` requires a `productId`, a `variantId`, and a `quantity`.
- Cart items may return nested `variant` metadata or just `variantId`, and the frontend renders whichever is available.
- Order history and checkout use `/api/auth/orders`.
- Auth tokens are attached by the shared axios client in `src/lib/apiClient.ts`.
- The app provides fallback demo images in `src/features/products/productsApi.ts` because the live API returns empty `images` arrays for product data.
