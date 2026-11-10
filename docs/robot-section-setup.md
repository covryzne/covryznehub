# Interactive 3D Robot Section — Setup Guide

Branch: `dev-robot` · Status: **code is wired up; one manual step remains**
(the Spline scene URL — see step 2). Nothing on `main` was changed.

## What was built

- `src/components/robot-section.tsx` — a new "Interactive 3D" section,
  placed between the Hero and About sections. It renders a real-time
  Spline scene on a dark purple stage; the robot's head/body follow the
  visitor's cursor (that interaction lives inside the Spline scene
  itself, not in React code).
- `src/lib/spline.ts` — the single place that holds the scene URL and
  the attribution data.
- Dependencies added: `@splinetool/react-spline` and
  `@splinetool/runtime`. The scene component is loaded with
  `next/dynamic` + `ssr: false`, so the heavy 3D runtime never blocks
  first paint and is only fetched when the section renders.
- Until a scene URL is configured, the section shows a placeholder panel
  explaining the setup — the site builds and runs fine without it.

Reference design: Spline's TikTok showcase of a Framer template hero
("PROXIMA") using this same robot. This portfolio is Next.js, not
Framer — Spline embeds into both, so no Framer account is needed.

## Step 1 — Get your own copy of the robot scene (Spline account required)

The Community file is **not** directly embeddable: a community scene has
no public runtime URL. You need your own published copy:

1. Create a free account at <https://spline.design> (the free plan is
   enough; published scenes carry a small "Made with Spline" badge,
   which the license asks us to keep anyway).
2. Open the source scene:
   <https://community.spline.design/file/615b9422-9985-43f6-8593-d7d7bc3b0be1>
   ("NEXBOT — robot character concept" by @aximoris / Maksim Borisov).
3. Click **Remix** to copy it into your workspace.
4. Optional, make it yours: adjust materials/colors, camera framing, and
   check the mouse-follow events that are already set up in the file.
   Keep the scene light — delete objects you don't use.
5. Publish a runtime URL: **Export → Public URL / Viewer → Publish**.
   Copy the resulting URL — it looks like
   `https://prod.spline.design/<id>/scene.splinecode`.

## Step 2 — Connect the scene to the site

Paste the URL in **one** of these places:

- `src/lib/spline.ts` → `SCENE_URL_FROM_CODE`, or
- environment variable `NEXT_PUBLIC_SPLINE_ROBOT_SCENE_URL`
  (e.g. in `.env.local` for dev, and in the Vercel project settings for
  production).

Then run `npm install` (if you pulled this branch fresh) and
`npm run dev` — the placeholder is replaced by the live robot.

## Rules that come with the scene

- **License CC BY 4.0 — attribution is mandatory.** The credit line
  under the canvas (model, creator, Spline Community source, license)
  must stay. Don't hide the "Made with Spline" badge either.
- **Performance:** the scene + runtime add real weight. The component
  already lazy-loads; additionally keep the published scene optimized
  (Spline: Export → check file size), and test on a mid-range phone.
- **Mobile:** there is no cursor on touch devices. The robot's idle
  animation still plays; if you want touch interaction, add a
  device-motion or tap event inside Spline later.

## How to undo

Remove `<RobotSection />` and its import from `src/app/page.tsx`. The
rest of the site is untouched; `src/lib/spline.ts`,
`src/components/robot-section.tsx`, and the two Spline packages can be
deleted with no side effects.

## Future ideas (not in this branch)

- Move the robot into the Hero once performance is proven in production.
- Swap NEXBOT for a custom-modeled character once you're comfortable in
  Spline (start from the remix — don't model from zero as a first
  project).
- Theme the stage colors to the site's light/dark mode.
