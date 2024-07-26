# My Next.js Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment Setup

Before running the project, you need to set up your environment variables. Create a file named `.env` in the root directory of your project and add the following variables:

```
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
API_URL=http://localhost:3001/api
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Explanation of Environment Variables

- `NEXTAUTH_SECRET`: A secret key used by NextAuth.js for encryption. In production, use a strong, unique secret.
- `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox API token for map functionality.
- `API_URL`: The URL of your API. Set to `http://localhost:3001/api` for local development.
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID for authentication.
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret for authentication.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.