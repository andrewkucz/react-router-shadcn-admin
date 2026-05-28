# Shadcn Admin Template (the remix)

Adapted from: https://github.com/satnaing/shadcn-admin

- Tanstack Router -> React Router v7
- Clerk -> Better Auth
- ESLint + Prettier -> Biome
- + TRPC
- + DrizzleORM (Postgres)

## Stack

- React Router
- Shadcn UI
 - Tailwind CSS
 - Radix UI
- Drizzle ORM
  - Postgres
- Better Auth
- tRPC

Also included:

- [biome](https://biomejs.dev/guides/getting-started/) | formatting and linting
- [nuqs](https://nuqs.dev/) | url query param management
- [@tanstack/table](https://tanstack.com/table/latest) | headless table ui
- [@daveyplate/better-auth-tanstack](https://github.com/daveyplate/better-auth-tanstack) | better-auth + @tanstack/react-query helpers

## Dev

To run dev database locally:

```bash
docker compose -f docker-compose.dev.yml up -d

# generate migration and apply
npm run db:generate && npm run db:migrate

# OR: push schema right to db
npx drizzle-kit push
```

## TODO
- test auth flow 
- add unauth handling + make dashboard auth only?
- fix light mode flash based on cookie