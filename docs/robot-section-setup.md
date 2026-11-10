# COVBOT — 3D Robot as the Hero Background

Architecture (design lock, 10 Nov 2026): the Spline robot is **not** a
standalone section anymore. It renders as a full-bleed background layer
behind the hero content (typing headline, name, tagline, CTAs) on branch
`dev-robot`. The previous standalone section (`robot-section.tsx`) was
removed; the scene now mounts from `HeroSection`.

## How it is wired

- `src/components/hero-robot-background.tsx` — client component that
  lazy-loads `@splinetool/react-spline` (`next/dynamic`, `ssr: false`),
  positions the canvas absolute + full viewport width behind the hero,
  fades it in on load, and pauses rendering while the hero is off-screen
  (IntersectionObserver → `app.stop()` / `app.play()`).
- `src/components/hero-section.tsx` — the hero is `min-h-svh`; its
  content sits in a `pointer-events: none` layer so mouse movement falls
  through to the canvas (the robot keeps following the cursor), while the
  badge link and the CTA row re-enable `pointer-events: auto`.
- On small screens the canvas is `pointer-events: none` entirely, so it
  can never trap touch scrolling; the robot idles.
- `src/lib/spline.ts` — scene URL (`SCENE_URL_FROM_CODE`, overridable via
  `NEXT_PUBLIC_SPLINE_ROBOT_SCENE_URL`) and the CC BY attribution data
  rendered in the footer.

## Scene (Spline side)

- File: "COVBOT - Robot Design" (remix of "NEXBOT — robot character
  concept" by @aximoris / Maksim Borisov, CC BY 4.0 — attribution lives
  in the footer; keep it).
- Production scene URL:
  `https://prod.spline.design/rWVleq0k2IugueUD/scene.splinecode`
- Play Settings required for background use:
  - BG Color: alpha 0% in the editor **and** "Hide" in Play Settings.
  - Orbit / Pan / Zoom / Soft Orbit: **No**; Touch Orbit / Pan:
    **Disabled**; Touch Zoom: **None**.
  - Page Scroll: **Yes** (desktop and touch).
  - Renderer: **WebGL** (WebGPU Only leaves Safari/Firefox visitors
    with an empty hero).
  - Animated Turntable: off.

## "Both" integrations

Two export routes exist for the same scene URL; only one renders at a
time (two live canvases would double the GPU/download cost for identical
pixels):

1. **React (active)** — `@splinetool/react-spline`, as above. Required
   for the fade-in and play/pause control.
2. **Web component (fallback)** — zero-code swap if the React runtime
   ever breaks:

```html
<script type="module" src="https://cdn.spline.design/@splinetool/viewer@2.0.159/build/spline-viewer.js" async></script>
<spline-viewer url="https://prod.spline.design/rWVleq0k2IugueUD/scene.splinecode"></spline-viewer>
```

(The iframe embed from the viewer page works too but gives no control
over loading or pausing, so it is not used.)

## Reverting

Remove `<HeroRobotBackground />` from `hero-section.tsx` and restore the
hero's previous spacing classes; the page returns to the pre-robot hero.
Nothing else depends on the scene.
