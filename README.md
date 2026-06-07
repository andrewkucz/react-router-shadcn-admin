# Shadcn Admin React Router Template

Adapted from: https://github.com/satnaing/shadcn-admin

- Tanstack Router -> React Router v7
- Clerk -> Better Auth
- ESLint + Prettier -> Biome
- \+ TRPC
- \+ DrizzleORM (Postgres)

## Stack

- React Router
- Shadcn UI
  - Tailwind CSS
  - Radix UI
- Drizzle ORM
  - Postgres
- Better Auth
- tRPC
  - React Query 

Also included:

- [jotai](https://jotai.org/) | global state management
- [biome](https://biomejs.dev/guides/getting-started/) | formatting and linting
- [nuqs](https://nuqs.dev/) | url query param management
- [@t3-oss/env-core](https://env.t3.gg/docs/introduction) | env validation
- [@tanstack/table](https://tanstack.com/table/latest) | headless table ui
- [@better-auth-ui/react](https://better-auth-ui.com/) | better auth helpers 

## Dev

To run dev database locally:

```bash
docker compose -f docker-compose.dev.yml up -d

# generate migration and apply
npm run db:generate && npm run db:migrate

# OR: push schema right to db
npx drizzle-kit push
```

To reset the local database entirely (wipes all data):

```bash
docker compose -f docker-compose.dev.yml down --volumes
docker compose -f docker-compose.dev.yml up -d
sleep 5
npx drizzle-kit migrate
```

## Info

Note: Better auth is setup and configured with email and password auth. The template has been configured so that the main dashboard is gated behind authentication. To change this behavior update the `loader` method in `app/routes/_authenticated.tsx`

## Customization

### Fonts

Update the tailwind theme variable(s) in `app/styles/theme.css` ([docs](https://tailwindcss.com/docs/theme))

Update the root stylesheet preload link in `app/root.tsx`:

```
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
```

Browse [Google Fonts](https://fonts.google.com/)


# Possible Todo
- Proper deployment setup + working demo
- Beautify README, add example images etc.
- 1 central configuration for site name, description, etc
- Email sending configuration with Resend?
- Better auth form feedback + toasts