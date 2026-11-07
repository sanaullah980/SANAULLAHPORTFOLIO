# Sanaullah — Portfolio (Next.js)

Next.js 15 · React 19 · TypeScript · three.js (react-three-fiber).

## Run
```
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Deploy on Vercel
Import the repo, make sure the **Root Directory** is the folder that contains `package.json`
(not a parent folder), framework preset **Next.js**. No environment variables needed.

## Edit content
Everything is in `src/content/profile.ts`: text, email, projects, chapters, Sana AI details.
- Projects: MyBusiness, Sana AI, Connect PAF.
- Connect PAF has `soon: true` and no link. When it is ready, remove `soon` and add
  `link: { label: 'Open Connect PAF', href: '<url>' }` and set `status: 'progress'`.

## Avatar
`public/models/avatar.fbx` is dressed in a navy three-piece suit at load time (`src/lib/avatar.ts`).
It walks side-on while you scroll, then turns to the text and gestures (wave / present / think / point)
per chapter, blinks, smiles and follows the cursor. Without WebGL the photo is shown instead.
