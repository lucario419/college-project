# University LMS – Student Portal

Next.js (App Router) + Tailwind CSS v4 + Lucide React.

```bash
npm install
npm run dev   # http://localhost:3000
```

Re-theme the accent color in `app/globals.css` (`--color-brand-*`).

The app uses PostgreSQL through Prisma. Set `DATABASE_URL` in `.env` (for example, a Neon PostgreSQL connection string), then initialize and seed the database:

```bash
npm run db:push
npm run db:seed
```

The Prisma schema is in `prisma/schema.prisma`.
