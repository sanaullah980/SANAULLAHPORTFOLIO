# Sanaullah Portfolio

A personal portfolio built with Next.js 15, React 19 and TypeScript. The existing warm-paper, ink and orange visual identity is intentionally retained.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build and deploy

```bash
npm run typecheck
npm run build
```

The project is configured for Vercel with the Next.js framework. Keep `vercel.json`, `next.config.mjs` and the `app/` directory in the repository root.

## Updating portfolio content

- `src/content/profile.ts` is the single source of truth for homepage text, navigation, skills and project cards.
- `src/content/caseStudies.ts` contains the detailed case-study content for each project.
- `public/photo.jpg` is the profile portrait used in metadata and the homepage.
- `app/globals.css` contains the existing site styles plus the additional project-preview and case-study styles.

## Project pages

Each featured project has a static, SEO-friendly case-study route:

- `/projects/mybusiness`
- `/projects/sana-ai`
- `/projects/connect-paf`
- `/projects/rajput-fragrance`
- `/projects/cpp-inventory`

Project preview panels on the homepage are CSS-built illustrative previews, not screenshots of the live products. Replace them with real product screenshots when available.

## SEO

The app includes Open Graph and Twitter metadata, `sitemap.xml`, and `robots.txt` routes. Update the canonical domain in `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts` if the production domain changes.
