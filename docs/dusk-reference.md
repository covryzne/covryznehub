# Dusk Reference — Extracted Design Tokens

Source: https://dusk-app-template.vercel.app/ (live demo of the "Dusk – App
Website Template" by ReactHive on 21st.dev). Tokens below were extracted
from the demo's PUBLIC HTML/CSS on 10 Nov 2026 and serve as a token-level
visual reference for the redesign — not a copy of the template's source
code (the template itself is a paid product).

How to use: feed this file to the design-system generation (Prompt 1 in
`docs/redesign-prompt.md`) as the visual target. Adapt the tokens to the
"Dusk × AI Lab" theme; the robot hero replaces Dusk's app-screen mockups.

## Color tokens (CSS variables, light / dark pairs where both exist)

| Token        | Light     | Dark      | Role                        |
| ------------ | --------- | --------- | --------------------------- |
| `night`      | —         | `#0b0a1f` | Dark base background        |
| `paper`      | `#f6f6fb` | `#0f0e26` | Page background / surface   |
| `ink`        | `#0f0f1a` | `#efedfa` | Primary text                |
| `card`       | `#ffffff` | `#1a1940` | Card background             |
| `haze`       | `#f3ecfd` | `#231d52` | Soft tinted surface         |
| `lilac`      | `#d9dcfb` | `#2b2866` | Secondary surface / bars    |
| `mute`       | `#676784` | `#a3a1c6` | Muted text                  |
| `violet`     | `#7436ff` | `#7436ff` | Primary accent              |
| `ultra`      | `#3000c1` | `#a08cff` | Deep accent / active states |
| `periwinkle` | `#8798f7` | `#8798f7` | Secondary accent, glows     |
| `blue`       | `#2d46ee` | `#2d46ee` | Hero sky top (day)          |
| `pink`       | `#e6c4fb` | `#e6c4fb` | Soft highlight              |

## Signature hero gradients

Day (light mode hero sky):

```
linear-gradient(180deg, #2d46ee 0%, #3f52f0 26%, #7d7cf5 50%, #b39af8 74%, #dcc3fb 100%)
+ radial glow rgb(165 115 245 / 0.9) at 50% 72%
+ periwinkle radials rgb(135 152 247 / .95) and rgb(135 168 248 / .9) at the corners
+ soft white blurred "cloud" ellipses
```

Night (dark mode hero sky):

```
linear-gradient(180deg, #04051a 0%, #0b0a1f 45%, #17146a 80%, #2a1f9a 100%)
+ radial glow rgb(116 54 255 / 0.45) at 50% 75%
+ tiny star dots with a 5s "twinkle" animation
+ slowly drifting translucent glass cards
```

Portfolio adaptation: the robot stands where Dusk floats its app cards —
night gradient + stars + the violet radial behind the robot; day gradient
in light mode (keep the existing `.text-outline-hero` readability fix).

## Typography

- Sans/display: **Geist** (tight tracking on display text, ≈ -0.05em on the
  logo, `font-display` for oversized numerals/headlines).
- Mono: Geist Mono (labels/metadata).
- Buttons/labels: medium–semibold, slight negative tracking (-0.01em).

## Component patterns observed

- **Pill glass nav**: `bg-white/15`, `ring-1 ring-white/30`, `backdrop-blur-xl`,
  fully rounded; active item = filled `ultra` pill with colored shadow
  `0 6px 18px rgb(48 0 193 / .45)` and a small white dot.
- **Buttons**: full-radius; primary = white bg + ink text + soft shadow
  `0 8px 24px rgb(40 20 90 / .18)`; hover swaps label with a vertical slide.
- **Floating glass cards** (hero): white/92 bg, large radius, shadow
  `0 24px 50px rgb(30 20 120 / .22)`, slow `drift` float animation with
  per-card delay/duration.
- **Enter animations**: fade + rise (`--enter-y: 14px`, ≈0.8–0.9s,
  cubic-bezier(.22,1,.36,1)), staggered delays per element.
- **Theme toggle**: circular glass button; sun/moon morph icon that
  rotates on hover.
- **Radii**: md .375rem, xl .75rem, 2xl 1rem; cards/pills often fully rounded.

## Limits of this reference

The demo is a compiled production build: utilities are visible in the
HTML and variables in the CSS, but component source, exact responsive
rules, and JS-driven animation logic are not recoverable from it. Treat
these tokens as the target look; the design system (and the sections)
are still written fresh for this portfolio.

## Motion & section transitions (from the official screen recording, 10 Nov 2026)

Static CSS cannot show these; they were read from a recording of the demo:

- **Sheet-over-hero (signature transition):** content sections live on a
  light "sheet" with large rounded top corners that slides OVER the
  gradient hero while scrolling; the hero stays pinned/parallaxes behind
  it. The same sheet device separates gradient zones from light content
  throughout the page.
- **Sky-state sequencing:** the page is a journey through gradient
  "skies" — day gradient → light sheet → deep night → bright violet →
  light sheet → night footer. Backgrounds morph per section instead of
  one flat page color.
- **Scroll-synced steps ("One night with Dusk"):** a sticky visual panel
  (phone + huge ghost numerals behind it) stays fixed while a vertical
  list of timed steps highlights one by one as you scroll; the visual
  content swaps with the active step.
- **Reading-highlight list:** a stacked list of benefit lines where only
  the line at the reading position is fully bright; the rest are dim —
  highlight advances with scroll.
- **Statement interstitial:** a full-screen gradient break with a giant
  sentence ("Let the day go.") whose letters/words stagger up into place.
- **Reveals everywhere:** staggered fade + rise on scroll (headlines,
  cards, nav), floating glass stat cards drifting around the hero
  visual, animated counters on statistics.
- **Page wipe:** switching pages wipes through a full-screen gradient
  (multi-page only; not needed for this one-page portfolio).
- **Footer finale:** night gradient returns; giant outlined wordmark
  ("Dusk") sits behind a glowing horizon arc at the very bottom, with a
  slow light beam sweeping across a star field.

Portfolio translations: sheet-over-hero between the robot hero and the
light sections; scroll-synced steps for Experience (sticky panel +
highlighting roles); reading-highlight list for an "what I do" statement
in About; a statement interstitial before Projects; animated counters in
the hero stats row; giant outlined "COVRYZNE" wordmark + horizon glow in
the footer.
