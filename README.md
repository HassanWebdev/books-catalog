# Books Catalog

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Live demo

https://books-catalog-1197.vercel.app/

## Local setup

- Requirements: Node.js 18+, npm or yarn or pnpm, Git
- Steps:
  1. Clone the repository
  2. Install dependencies: npm install
  3. Create a .env.local file at the project root (see Environment variables)
  4. Start the development server: npm run dev
  5. Open http://localhost:3000

## Features

- Browse the catalog with search and filtering
- View detailed book pages
- Wishlist and cart management
- User account area and profile management
- Admin tools for managing books and categories
- Responsive, accessible UI
- Fast loads with server-side rendering and caching
- Robust error and loading states

## Authentication flow

- Users can sign up and sign in with email/password or OAuth providers if configured
- On success, a session is created and stored in secure cookies; client components access session state via a provider
- Protected pages and API routes require an active session; unauthenticated users are redirected to the sign-in page
- Signing out clears the session and returns the user to a public page

## Environment variables

Create a file named .env.local in the project root with values for your environment:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-strong-random-string
JWT_SECRET=replace-with-a-strong-random-string
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

https://books-catalog-1197.vercel.app/
