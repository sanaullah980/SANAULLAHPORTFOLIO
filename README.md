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
- **3D character** (`src/components/StoryAvatar.tsx` → `AvatarCanvas.tsx`): your FBX avatar walks while you scroll and
  its head follows the cursor. Without WebGL (or on very low-memory / data-saver devices) your photo is shown instead.

## Avatar

`public/models/avatar.fbx` is rendered by `src/components/AvatarCanvas.tsx` (FBXLoader). It is posed procedurally from
the skeleton (arms lowered, walk cycle, head follows the cursor) and its outfit texture is swapped for
`public/models/outfit-formal.jpg` (white shirt, charcoal trousers, black shoes). To change the outfit, edit that JPG
(same UV layout as the original). The photo in `public/photo.jpg` is the fallback when WebGL is unavailable.

## Sana AI section

`src/components/SanaAI.tsx` + the `sana` block in `src/content/profile.ts`. The Analyzer / Predictor / Calculator previews
use standard formulas in the browser; they are illustrations of each engine, not the language model.
