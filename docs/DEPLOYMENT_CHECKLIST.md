# Deployment checklist

## Build

- Run `npm run build`
- Ensure the build outputs successfully

## Environment

- Set `VITE_API_BASE_URL` on the deployment platform

## Platform notes

- Vercel and Netlify both support Vite static builds
- Configure SPA rewrites so client-side routes resolve correctly

## Final checklist

- Confirm the app loads without console errors
- Verify protected routes redirect to login when unauthenticated
- Confirm the product catalog loads from the live API
