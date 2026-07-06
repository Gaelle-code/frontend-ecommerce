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
