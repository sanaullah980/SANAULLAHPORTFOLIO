# Sanaullah — Portfolio (Next.js)

Next.js 15 (App Router) + React 19 + TypeScript, with a react-three-fiber 3D character.
Styled with warm paper, near-black ink, one orange accent and frosted glass; no gradients.

## Run

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploys to Vercel with no configuration (import the repo).

## Edit your content

Everything shown on the site lives in **`src/content/profile.ts`**: hero text, journey chapters,
projects, skills, about, contact and links. Your photo is `public/photo.jpg`.

## How the home page works

- **Journey** (`src/components/Journey.tsx`): on desktop, vertical scroll drives a horizontal walk.
  The character stays put while the chapters slide past. Arrow keys and the bottom rail jump between chapters.
  On phones, with reduced motion, or without JavaScript, it is a plain vertical timeline.
- **3D character** (`src/components/StoryAvatar.tsx`, `src/lib/avatar.ts`): your own rigged avatar
  (`public/models/avatar.fbx`), dressed in a navy three-piece suit: long sleeves with white cuffs, shirt and collar,
  tie, waistcoat, lapels and pocket square, plus navy trousers and black shoes. The suit pieces are fitted to the
  model's body in code, and the clothes' fabric is recoloured (`public/models/outfit-*.jpg`). It walks while you
  scroll, blinks, and its head follows the cursor. Without WebGL (or on very low-memory / data-saver devices)
  your photo is shown instead.
- **Contact:** your email is set in `src/content/profile.ts` (`email`) and appears in the journey, contact section and footer.

## Changing the avatar

Replace `public/models/avatar.fbx` with another Ready Player Me-style FBX (same bone names, a mesh named `outfit`
for the clothes). Colours of the suit pieces are at the top of `dressAvatar` in `src/lib/avatar.ts`.
