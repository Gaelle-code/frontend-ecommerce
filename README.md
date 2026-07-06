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
