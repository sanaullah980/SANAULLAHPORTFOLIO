# Portfolio update notes

## Visual direction preserved
- Kept the existing warm-paper background, orange accent, typography, header, portrait, ambient treatment, animations and homepage section styling.
- Kept the existing Vercel and Next.js configuration.
- Kept the existing Sana AI browser-based engine previews and modal.

## Improvements made
- Sharpened the homepage positioning toward software development and applied AI/ML.
- Added five distinct CSS-built project preview panels. They are labelled in code and README as illustrative previews, not screenshots of deployed products.
- Added a dedicated case-study route for each project, with problem, approach, capabilities, architecture flow, engineering notes, stack and external links.
- Updated MyBusiness to reflect web/PWA and Android scope.
- Changed Connect PAF from an unavailable/coming-soon card to an in-development project and linked its repository.
- Added project links to the relevant repositories, live site or Hugging Face model where known.
- Added page-specific metadata, Open Graph/Twitter metadata, Person structured data, sitemap and robots routes.
- Added a branded 404 page.
- Made the shared navigation work correctly from project detail pages.
- Updated README with setup and content-editing instructions.

## Important accuracy notes
- The project preview panels are conceptual CSS illustrations. Replace them with real application screenshots when available.
- Sana AI is described as active model development/experimentation, not a production-validated AI service.
- Connect PAF is described as in development; OCR and extraction capabilities are not claimed as fully deployed.
- C++ Inventory details are intentionally conservative because no implementation repository was supplied for inspection.

## Validation
- All 23 TypeScript/TSX files passed a TypeScript transpilation syntax check.
- A full Next.js build/typecheck could not be run in this environment because npm registry access failed (DNS/network error while downloading Next.js dependencies).
- Run `npm install`, `npm run typecheck`, and `npm run build` locally before deploying.

## Latest round
- Removed the standing photo from the journey section (the homepage hero portrait is unchanged); the chapters are now centred.
- Connect PAF is back to "Coming soon" with no link, no case-study page and no sitemap entry. To publish it later, add `link`/`slug` in `src/content/profile.ts` and a matching entry in `src/content/caseStudies.ts`, and remove `soon`.
- Added a thin scroll-progress bar at the top of the page.
