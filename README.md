# Fieldnotes

A personal travel portfolio built with Next.js, Tailwind CSS, Cloudinary uploads, and Prisma/PostgreSQL.

## Run locally

1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `BLOG_PASSWORD`, `SESSION_SECRET`, and your three Cloudinary values.
2. In Neon, use the PostgreSQL connection string for `DATABASE_URL` (including `sslmode=require`).
3. Install dependencies and start the app:

   ```bash
   npm install
   npm run dev
   ```

Open `http://localhost:3000`. Visit `/upload-a-blog` and enter `BLOG_PASSWORD` to publish a story. On first publish, the app creates the `Post` table and indexes if missing. `npm run db:push` is available to sync the Prisma schema manually. Generate a session secret with `openssl rand -base64 32`.

The journal includes three sample stories until your database has published posts. New posts, view counts, and Cloudinary photo URLs are stored in PostgreSQL. The home page features up to three most-viewed stories; when view counts are tied at zero, the latest trips appear first.
