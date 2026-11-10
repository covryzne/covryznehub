# Pass 2 — Dusk motion and composition revision

10 November 2026. R1–R5 implemented and visually reviewed in order against the
supplied Dusk recording and `docs/dusk-reference.md`.

## Changes and review decisions

| Revision | Delivered / observed |
| --- | --- |
| R1 | About through Contact inside a paper sheet; 40px top corners, -16px overlap, z-index 20 and soft top shadow. Original inner container widths preserved. The skills band reserves 32px bottom space and has a subtle Dusk gradient so the edge is visible in both themes. Footer remains outside. |
| R2 | Reviewed 1440 × 1000 and 390 × 844, both themes. Content was already vertically top-aligned. Text overlaps the robot in some poses but remained readable through the existing scrim and light outline, so title/name/tagline layout was retained. Replaced only the cue's 220px spacer with auto flex margin and 32–64px breathing room. At 390px the hero height fell from 931px to 844px; cue ends at 780px and clears actions. |
| R3 | Full-width night finale in both themes: static stars, a single 4.8s light-beam sweep on first entry, outlined COVRYZNE behind a violet/periwinkle horizon. Sweep pauses off-screen and becomes static under reduced motion. Existing copyright, owner and Home link retained. Decorations are aria-hidden, pointer-inert, and clipped locally. |
| R4 | Updated the existing MASTER from implemented CSS. Found that `.gitignore` excluded the entire folder, explaining its absence from the audited commit. Added targeted exceptions for MASTER, README, this report and the browser runner; local screenshot/JSON artifacts remain ignored. |
| R5 | Center-band IntersectionObserver highlights the nearest intersecting experience row. No added scroll listener or frame loop. Other headings mute and rows dim (.78 night / .96 day); reduced motion removes highlight state and leaves all rows bright. Content, numbering and layout stay unchanged. |

The content sheet rises through native document scrolling. This pass implements
the requested sheet composition, footer finale and reading emphasis; it does not
introduce multi-page wipes or a separate pinned statement scene.

`skills.tsx` is retained: About still imports it.

## Validation

- `npx tsc --noEmit`: passed.
- `npm run lint`: 0 errors; the same 19 existing unused-variable warnings.
- Production compilation, static generation and type validation: passed with
  Next.js 15.5.9. Used an isolated `.next/pass-2-production` output and temporary
  build configuration; the checked-in Next/TypeScript configuration and running
  development server were preserved. An initial isolated-build harness discarded
  a default config function during serialization; the harness was corrected and
  the build completed successfully. This was not an application compile failure.
- Browser: 12 dark/light width cases at 320 / 375 / 390 / 768 / 1024 / 1440px;
  no horizontal overflow, marquee clipping, container-width change, or footer
  placement issue.
- Hero: four requested theme/width views inspected. Cue clears CTAs and stays
  inside the viewport at 1440 × 1000 and 390 × 844. Pointer routing unchanged.
- Experience: rows 1, 3 and 6 became the single active row on desktop and phone;
  reduced-motion preference reset all rows to opacity 1.
- axe WCAG A/AA and 2.1 AA on Experience in both themes: zero reported violations,
  including active/inactive row contrast. Dimming levels intentionally differ by
  theme to retain readable secondary text.
- Footer: verified night text roles in light mode, decorative semantics, static
  reduced-motion beam, animation when allowed, off-screen pause and Home link.
- Chat: verified the portal remains a direct body child at z-index 10000 above
  the content sheet and footer. No chat or email request was sent by these checks.

The browser runner is [verify.cjs](verify.cjs). It expects Playwright (or an
existing installation through `DUSK_PLAYWRIGHT_MODULE`), installed Chrome and
axe-core. Default target is the existing `http://localhost:3000` dev server;
`DUSK_BASE_URL` can override it. It does not start or stop that server.

## Local visual evidence

Screenshots and raw measurements are deliberately ignored by Git; these links
work in the current checkout after the checks have generated them.

- R1 sheet: [desktop dark](r1-sheet-1440-dark.png), [phone light](r1-sheet-390-light.png).
- R2 before: [desktop dark](r2-before-1440-dark.png), [desktop light](r2-before-1440-light.png),
  [phone dark](r2-before-390-dark.png), [phone light](r2-before-390-light.png).
- R2 after: [desktop dark](r2-after-1440-dark.png), [desktop light](r2-after-1440-light.png),
  [phone dark](r2-after-390-dark.png), [phone light](r2-after-390-light.png).
- R3 finale: [desktop dark](r3-footer-1440-dark.png), [phone light](r3-footer-390-light.png).
- R5 reading: [desktop](r5-reading-1440.png), [phone](r5-reading-390.png).
- Measurements: `r1-r2-baseline.json`, `r2-review.json`, `r3-review.json`, `results.json`.

## Preserved contracts and limits

The robot integration file, Spline scene config, assistant component and API
route, data, email action and validation schema are unchanged from the starting
commit. Existing hero pointer-event rules are unchanged. Robot camera zoom,
canvas shifts, scene and off-screen pause logic were not edited.

Chrome checks and captures use a software GPU and phone viewport emulation;
they do not certify physical-device rendering or every moving robot pose. Some
initial captures include the scene's introductory rendering or headless
compositing artifacts; final hero captures allow the scene to settle. The locked
Spline runtime's original motion behavior remains in place. Reduced-motion
verification here covers the newly added reading and footer effects.
