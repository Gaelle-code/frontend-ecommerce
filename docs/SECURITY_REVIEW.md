# Security review

## Checks performed

- Verified the app uses an environment variable for the API base URL
- Centralized requests through a single Axios client
- Attached bearer tokens only when present
- Cleared auth tokens on 401/403 responses and logout

## Issues found and fixes applied

- Initial starter content was replaced with application routes and API-backed screens
- Protected routes now redirect unauthenticated users to login
- Sensitive debug information is not exposed in the UI

## Remaining risks and assumptions

- JWTs are stored in localStorage because the API expects a bearer token on the client side
- No payment or financial data is accepted in the current flow
