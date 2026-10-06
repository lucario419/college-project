# University LMS – Student Portal

Next.js (App Router) + Tailwind CSS v4 + Lucide React.

```bash
npm install
netlify dev   # runs Next.js with Netlify Database locally
```

Re-theme the accent color in `app/globals.css` (`--color-brand-*`).

Data lives in Netlify Database (Postgres) via Drizzle ORM. The schema is in `db/schema.ts`; after changing it run
`npx drizzle-kit generate --name <change>` — migrations in `netlify/database/migrations/` are applied automatically on deploy.

Demo accounts: `student@university.edu` / `Student@123`, `priya@university.edu` / `Student@123`.
