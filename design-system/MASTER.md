# Dusk × AI Lab — MASTER

Version 1.1 · 10 November 2026 · Owner: Shendi Teuku Maulana Efendi

Status: implemented locally; see [Pass 2 QA](qa/pass-2/REPORT.md) for evidence and limitations.
Scope: single-page AI Engineer portfolio, Next.js 15.5 / React 19 / Tailwind CSS 4.
Read this file before every later redesign prompt. All sections and the assistant
inherit it. No section or page overrides exist. Change this document deliberately
when a future user instruction changes the design direction.

## 1. Authority and visual intent

Priority: current user instruction → repository behavior/content contracts → this
MASTER → supporting skill recommendations. The extracted values in
[dusk-reference.md](../docs/dusk-reference.md) are the palette and sky authority;
[redesign-prompt.md](../docs/redesign-prompt.md) supplies section scope and locks.
Its older draft colors yield to the extracted Dusk values below.

Reference: [Dusk live demo](https://dusk-app-template.vercel.app/). The supplied
reference records a public HTML/CSS extraction dated 10 November 2026. The demo
could not be opened through the web tool during this task; no independent visual
verification of that live URL, recovered component code, or exact responsive behavior is claimed.
The user-provided 30.6-second Dusk recording was inspected for Pass 2; the
additional motion observations are recorded in `docs/dusk-reference.md`.

The ui-ux-pro-max design-system search and one narrower retry returned generic
Swiss/minimal portfolio recommendations, with palettes and type pairings that
conflict with this brief. No verified Dusk-specific match was found. Those outputs
are not persisted as design authority. This MASTER is a deliberate synthesis of
the supplied tokens and project constraints; the skill's verified reduced-motion,
contrast, focus, and layout guidance informs its quality rules. The stack results
targeted Next.js 16.2; version-specific advice is excluded from this Next.js 15 spec.

**Character:** a quiet midnight research lab in Dusk's sky. Broad violet atmosphere,
generous space, sculptural robot, confident type, restrained technical annotations.
The portfolio should first communicate a real person's work and contact path.
HUD details support this hierarchy. Primary audience: hiring teams, collaborators,
and engineers assessing AI/MLOps experience.

**Composition:** luminous full-bleed robot hero → narrow skills band → readable
About bento → numbered Experience rows → Projects → Certifications → Contact
support panel on a rounded content sheet → night-sky Footer finale. Preserve this order and existing section anchors.

## 2. Behavior and content locks

- Preserve `src/app/_sections/hero/hero-robot-background.tsx` and `src/lib/spline.ts`.
  Canvas remains full-bleed behind content, with the same scene URL. Zoom remains
  0.45 below 640px, 0.6 below 1024px, and 0.75 above; downward canvas translations
  remain 14% below 640px and 10% from 640px upward. Do not resize or reposition
  the robot to accommodate the new design; adapt surrounding type and decoration.
- Hero content remains `pointer-events: none`; badge and actual interactive
  controls explicitly restore `pointer-events: auto`. All decorative overlays
  ignore pointers. Cursor follow, touch `pan-y`, taps/drags, and native vertical
  scrolling must remain intact. Preserve off-screen IntersectionObserver pause.
- Retain `.text-outline-hero` on the light-mode name and tagline wherever they
  overlap the robot. Its white rim is supplementary; contrast still needs review.
- Preserve the hero's existing typewriter roles, CV download, social destinations,
  availability link, contact form validation/submission, and all section content.
- Assistant skin only: `src/components/chat-assitant.tsx` retains its portal to
  `document.body`, state, flows, and current z-index values. Do not change
  `src/app/api/assistant/route.ts`, its guardrails, model logic, or request behavior.
- Experience, projects, certifications, and skills come from `src/lib/data.tsx`;
  identity/contact from `src/lib/site-config.ts`; prose from existing sections.
  Preserve ordering, descriptions, existing More/Less and Show All/Hide controls,
  certification View/Verify dialog and credential flow, and contact behavior.
  Render all six experience entries. Preserve the four-item initial project and
  certification views and any additional records behind their existing controls.
- Do not invent years, review counts, shipped totals, issuer dates, music tastes,
  achievements, availability claims, or live telemetry. A proposed statistic or
  personal/currently card without existing factual content must be omitted.
  In particular, the About component currently has no music-taste statement.

## 3. Color architecture

Three layers: Dusk primitives → theme semantic roles → component roles. Components
consume semantic tokens, never fresh hex values. Keep violet as the action color;
cyan is a sparse AI/status annotation. Amber is optional: at most one decorative
highlight per section, including its badges/cards. Semantic error feedback is
independent of that decorative budget and always includes words/icons.

### Primitive lineage

| Dusk primitive | Day | Night | Portfolio use |
| --- | --- | --- | --- |
| night | — | #0b0a1f | Default midnight page |
| paper | #f6f6fb | #0f0e26 | Day page / night recessed panel |
| ink | #0f0f1a | #efedfa | Main text |
| card | #ffffff | #1a1940 | Opaque cards |
| haze | #f3ecfd | #231d52 | Tinted panels, hover |
| lilac | #d9dcfb | #2b2866 | Secondary surfaces |
| mute | #676784 | #a3a1c6 | Secondary text |
| violet | #7436ff | #7436ff | Primary fill, atmosphere |
| ultra | #3000c1 | #a08cff | Accessible links, active accents |
| periwinkle | #8798f7 | #8798f7 | Decorative glow |
| blue / pink | #2d46ee / #e6c4fb | same | Sky / decorative highlight only |

Added functional pairs: AI cyan #22d3ee night / #08758a day; amber #f59e0b
night / #925400 day. These extend Dusk; they do not replace its base palette.
Functional borders and status colors are adaptations chosen for readable controls.

### Theme semantic specification (CSS variables)

This CSS is documentation for a later global-shell task. Both blocks must be
implemented together. `:root` is dark-first; `.light` is explicit day lab;
`.dark` overrides system preference. Preserve the next-themes class strategy and
saved user choice. When later configuring default dark, do not force dark over
an explicit visitor selection or introduce a hydration flash.

```css
:root,
.dark {
  color-scheme: dark;
  --background: #0b0a1f;
  --paper: #0f0e26;
  --reading-dim-opacity: .78;
  --lilac: #2b2866;
  --ultra: #a08cff;
  --shadow-sheet: 0 -24px 64px rgb(4 5 26 / .20);
  --foreground: #efedfa;
  --surface-recessed: #0f0e26;
  --card: #1a1940;
  --card-foreground: #efedfa;
  --popover: #1a1940;
  --popover-foreground: #efedfa;
  --primary: #7436ff;
  --primary-foreground: #ffffff;
  --primary-hover: #6330df;
  --primary-pressed: #5425c5;
  --link: #a08cff;
  --link-hover: #c4b5ff;
  --secondary: #2b2866;
  --secondary-foreground: #efedfa;
  --muted: #0f0e26;
  --muted-foreground: #a3a1c6;
  --accent: #231d52;
  --accent-foreground: #efedfa;
  --border: rgb(160 140 255 / 0.20);
  --border-strong: #77719c;
  --input: #77719c;
  --ring: #a08cff;
  --ai: #22d3ee;
  --ai-soft: rgb(34 211 238 / 0.08);
  --warm: #f59e0b;
  --warm-soft: rgb(245 158 11 / 0.10);
  --success: #70e1bc;
  --destructive: #ff9cab;
  --destructive-foreground: #0b0a1f;
  --glass: rgb(26 25 64 / 0.90);
  --glass-hover: rgb(35 29 82 / 0.96);
  --glass-border: rgb(239 237 250 / 0.22);
  --grid: rgb(160 140 255 / 0.06);
  --scrim: rgb(4 5 26 / 0.76);
  --shadow-card: 0 24px 50px rgb(4 5 26 / 0.36);
  --shadow-button: 0 8px 24px rgb(40 20 90 / 0.18);
  --shadow-active: 0 6px 18px rgb(48 0 193 / 0.45);
  --glow-violet: rgb(116 54 255 / 0.45);
  --spotlight: rgb(160 140 255 / 0.08);
  --hero-scrim: rgb(4 5 26 / 0.72);
}

.light {
  color-scheme: light;
  --background: #f6f6fb;
  --paper: #f6f6fb;
  --reading-dim-opacity: .96;
  --lilac: #d9dcfb;
  --ultra: #3000c1;
  --shadow-sheet: 0 -24px 64px rgb(30 20 120 / .10);
  --foreground: #0f0f1a;
  --surface-recessed: #f3ecfd;
  --card: #ffffff;
  --card-foreground: #0f0f1a;
  --popover: #ffffff;
  --popover-foreground: #0f0f1a;
  --primary: #7436ff;
  --primary-foreground: #ffffff;
  --primary-hover: #6330df;
  --primary-pressed: #5425c5;
  --link: #3000c1;
  --link-hover: #5425c5;
  --secondary: #d9dcfb;
  --secondary-foreground: #0f0f1a;
  --muted: #f3ecfd;
  --muted-foreground: #676784;
  --accent: #f3ecfd;
  --accent-foreground: #0f0f1a;
  --border: rgb(48 0 193 / 0.16);
  --border-strong: #77718d;
  --input: #77718d;
  --ring: #3000c1;
  --ai: #08758a;
  --ai-soft: rgb(8 117 138 / 0.07);
  --warm: #925400;
  --warm-soft: rgb(146 84 0 / 0.08);
  --success: #08765b;
  --destructive: #b42345;
  --destructive-foreground: #ffffff;
  --glass: rgb(255 255 255 / 0.92);
  --glass-hover: rgb(243 236 253 / 0.98);
  --glass-border: rgb(48 0 193 / 0.20);
  --grid: rgb(48 0 193 / 0.05);
  --scrim: rgb(15 15 26 / 0.48);
  --shadow-card: 0 24px 50px rgb(30 20 120 / 0.14);
  --shadow-button: 0 8px 24px rgb(40 20 90 / 0.18);
  --shadow-active: 0 6px 18px rgb(48 0 193 / 0.25);
  --glow-violet: rgb(165 115 245 / 0.35);
  --spotlight: rgb(116 54 255 / 0.05);
  --hero-scrim: rgb(246 246 251 / 0.94);
}
```

`--border` is decorative hairline only. Inputs, outlined controls, and meaningful
boundaries use `--border-strong` / `--input`; an alpha hairline cannot alone
identify an action. Disabled controls retain legible labels, use disabled semantics,
and do not respond to hover. Links are underlined in prose; never use the primary
fill color as small dark-theme link text. No per-card cyan/amber border rainbow.

Later Tailwind v4 mapping: retain existing `@theme inline` aliases such as
`--color-background: var(--background)`, and add `--color-ai`, `--color-warm`,
`--color-link`, `--color-border-strong` as needed. Keep shadcn semantic role names.
Do not add a Tailwind v3 config or install a second component/motion library.

### Hero skies and text protection

Preserve these exact base gradients from the reference. The sky is confined to
the hero and fades into the page background near its bottom edge.

```css
/* Dark: primary Dusk atmosphere */
--hero-sky-night: linear-gradient(180deg,
  #04051a 0%, #0b0a1f 45%, #17146a 80%, #2a1f9a 100%);
/* Day: retain the blue-to-lavender Dusk sky, not a gray or cyan replacement */
--hero-sky-day: linear-gradient(180deg,
  #2d46ee 0%, #3f52f0 26%, #7d7cf5 50%, #b39af8 74%, #dcc3fb 100%);
```

Night adds a radial violet glow at 50% 75%, using `rgb(116 54 255 / .45)`;
day retains the `rgb(165 115 245 / .9)` radial at 50% 72%, corner periwinkle
radials `rgb(135 152 247 / .95)` and `rgb(135 168 248 / .9)`, and soft white
cloud ellipses. These are decorative sky layers beneath the robot. Avoid stacking
new glows over the robot component's existing halo; that halo remains untouched.

Text above the sky uses theme foreground on a localized protective scrim:
`--hero-scrim` behind the content region, faded only outside text bounds. The day
scrim gives dark text a lavender-white backing while leaving the outer sky visible;
the night scrim protects pale text near the brightest violet horizon. Scrims and
decorations ignore pointer events. Keep the robot silhouette clear in its current
lower-hero position. Retain the light outline on name/tagline. Do not assume a
stroke or text shadow guarantees contrast over a moving scene. If a moving overlap
fails contrast, strengthen the local text backing, never reposition the robot.

### Contrast contract

Normal text ≥4.5:1; large text ≥3:1; meaningful icons, focus indicators, and
required control boundaries ≥3:1 against adjacent colors. Verify both modes.
The opaque token-pair ratios are recorded in §11. Glass, gradients, spotlight,
and moving Spline require composed screenshots and cannot be certified by hex
pair measurements alone. Periwinkle, grid, and alpha borders are decorative.

## 4. Typography

Final pairing: **Bricolage Grotesque** display, **Geist** body, **Geist Mono**
labels. Bricolage carries the portfolio's identity and already exists in the repo;
Geist/Geist Mono retain Dusk's clean reading texture. Do not also load Space
Grotesk, Inter, JetBrains Mono, or Darker Grotesque in the final implementation.
Current font wiring is inconsistent: `src/lib/fonts.ts` defines Bricolage as
sans and Darker as heading, while globals references Geist variables. Resolve
this explicitly in the later shell task; no font setup changes are part of this
delivery. Define loader variables distinct from Tailwind aliases to avoid cycles:

```css
/* Specification only: next/font loaders provide these three *-face variables. */
--font-display: var(--font-bricolage-face), ui-sans-serif, system-ui, sans-serif;
--font-sans: var(--font-geist-face), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-geist-mono-face), ui-monospace, monospace;
```

| Role | Size | Weight / line height | Tracking / measure |
| --- | --- | --- | --- |
| Hero display | clamp(2.5rem, 6vw, 6.5rem) | 650–700 / 1.04 | -0.04em; 16ch target |
| Hero name | clamp(1.5rem, 3.2vw, 3rem) | 600 / 1.15 | -0.025em; wrap full name |
| Section heading | clamp(2rem, 4vw, 3.5rem) | 600 / 1.1 | -0.03em; 22ch |
| Card / role title | clamp(1.25rem, 2vw, 1.5rem) | 600 / 1.25 | -0.02em |
| Lead | clamp(1.125rem, 1.6vw, 1.25rem) | 400 / 1.6 | normal; 55ch |
| Body / input | 1rem | 400 / 1.65 | normal; 65ch max |
| Secondary metadata | .875rem | 400–500 / 1.5 | normal |
| Eyebrow / mono index | .75rem | 500 / 1.5 | 0.08em; short uppercase |
| Button | .875rem–1rem | 600 / 1.25 | -0.01em |
| Statistic | clamp(2rem, 4vw, 3.5rem) | 600 / 1.1 | -0.03em; tabular figures |

Use one h1 for the hero role, h2 for section titles, h3 for cards/roles. Labels
such as `SYS.01 // ABOUT` are paragraphs, not substitute headings. Labels never
contain essential prose at 12px. No thin display weights or all-caps paragraphs.
Allow natural wrapping, balanced short headings, and long URLs to wrap safely.
Keep the long name intact as content; never force it onto one line. Font fallback,
200% zoom, and narrow screens must remain usable. Load fonts through the existing
Next font mechanism in the later implementation; preload only critical faces.

## 5. Layout, spacing, radius, layers

| Token | Value / use |
| --- | --- |
| Space scale | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px (`--space-1/2/3/4/6/8/12/16/24/32`) |
| Main container | max-width 1200px, centered; full-bleed hero sky/canvas |
| Gutters | 20px below 640; 24px at 640; 32px at 768; 48px at 1024+ |
| Section vertical padding | 64px phone; 96px tablet; 128px desktop |
| Heading to content | 32px phone; 48px desktop |
| Grid gap | 16px phone; 24px tablet/desktop |
| Card padding | 24px phone; 32px desktop; compact cards 16–24px |
| Reading width | 65ch prose; hero lead 55ch |
| Radius small / medium | .375rem / .75rem (Dusk values) |
| Radius large / feature | 1rem / 1.5rem (Dusk + large-panel adaptation) |
| Radius pill | 9999px, nav/buttons/chips; chips may wrap |
| Content sheet radius | 2.5rem / 40px, top corners only |
| Sheet overlap | -16px top margin, 16px internal top padding |
| Sheet shadow | `--shadow-sheet`: dark 0 -24px 64px rgb(4 5 26 / .20); day rgb(30 20 120 / .10) |
| Hairline | 1px; no subpixel borders |
| Minimum web control | 44 × 44 CSS px; minimum 8px gap |
| Header clearance | reserve 96px; anchor scroll margin 112px; increase if nav grows |

Use the same spacing variables throughout. Set semantic base `--radius: 1rem`
later; explicitly map small/medium/large radii instead of relying on the old
shadcn subtraction formulas to accidentally reproduce these values.

Mobile-first breakpoints: 640 / 768 / 1024 / 1280px. Verify 375 / 768 / 1024 /
1440px plus 320px reflow, 200% zoom, and phone landscape. No horizontal page
scroll. Use shrinkable flex/grid text children and wrapping chips. Hero retains
`min-h-svh`; content may extend beyond one viewport on short screens. Never clip
text to make the hero fit. Sticky layouts become static on short/narrow viewports.

Layer contract: hero decoration below canvas; robot retains z-0; noninteractive
hero content z-10; section sticky heading z-20; header z-40; mobile menu z-50;
ordinary dialog/backdrop below 9999. Preserve assistant launcher 9999, panel
10000, and its current internal overlay 10002. Never create a transformed parent
around the portal root. Overlays must not hide focused controls; preserve scroll
and focus behavior of existing dialogs. Avoid arbitrary new z-index values.

## 6. Shared components and effects

**Glass pill navigation.** Floating centered pill with 12–16px top offset, 8px
inner padding, theme `--glass`, 1px `--glass-border`, 20px backdrop blur. Dusk's
white/15 glass is visual inspiration; the stronger specified backing protects
labels over the moving robot. Active link uses theme `--link` fill and reversed
foreground: dark active fill #a08cff with #0b0a1f text; day #3000c1 with white.
Use a small current-location dot and `aria-current="location"`. Active shadow is
`--shadow-active`. Other links use theme foreground. On narrow widths, logo,
theme control, and a labeled Menu button replace the full link row; menu contains
all six existing anchors. Provide Escape close and focus return. Theme control
uses Lucide sun/moon with an accessible action label. No hover-only navigation.

**Buttons.** Violet primary fill with white label; hover/pressed use specified
tokens. One dominant action per group. Hero's secondary CV action uses the Dusk
white/ink combination; other secondary actions use opaque theme card foreground
and meaningful outline. 48px default height, 44px compact minimum; 20–24px inline
padding; pill corners; 16px icon and 8px label gap. No label duplication in the
accessibility tree for Dusk-style vertical slide effects; prefer a simple color
transition. Icon-only controls are 44px with accessible names. Keyboard focus:
2px ring, 3px offset with backing matching the local surface; never remove it.

**Cards.** Use opaque `--card` for reading; reserve translucent glass for nav,
hero annotations, Contact feature panel, and chat chrome. Feature panels radius
24px; normal cards 16px; fields 12px. Default 1px decorative border; interactive
cards add a clear link/button and a visible focus state. Corner brackets are
12px segments inset 8px, 1px stroke at two opposing corners, decorative and
pointer-inert. At most one bracketed feature card per section. No brackets on
every chip/input. Floating hero cards, if used, are small truthful annotations,
at most two on desktop and zero on phones; never obscure the robot or CTAs.

**Blueprint grid.** 80px square cells, 1px `--grid`, feathered with a static mask.
Hero and one About/Contact feature panel only. Never behind long prose at full
strength. Optional noise ≤2% opacity, static, no expensive animated filter.
No dense crosshairs, fake terminal output, waveform clutter, or blinking status.

**Project spotlight.** One 240px radial `--spotlight` at local `--x/--y`; update
through a ref/CSS variables at most once per animation frame without React
rerenders. Enable only for fine pointer with hover and no reduced motion.
Do not animate blur or background-position each frame. Keep glow behind an
opaque reading area, omit persistent `will-change`, and reset on pointer leave.
Keyboard focus gets the same border emphasis without pointer tracking.

**Fields and chips.** Fields use opaque card surfaces, `--input` boundary, 48px
minimum height and 16px input text; textarea min-height 144px. Visible labels and
associated inline errors. Chips use secondary surface and foreground, mono or
body metadata at 12–14px, 8px gap, and wrap before labels shrink. Static tags are
not buttons and do not acquire hover cursors. Status labels always include text.

Use the installed Lucide icon family consistently: 16/20/24px, 1.5–2px strokes.
Existing official logos may retain their supplied branding. Decorative SVGs hide
from assistive technology; icon controls expose name and state. No emoji icons.

## 7. Section patterns

### Home — `#home` · `SYS.00 // AI ENGINEER`

Retain the full-bleed robot in its exact lower-hero framing. Centered content in
the upper region: existing availability badge → oversized typewriter role h1 →
full name → existing tagline → Get in touch / Download CV / LinkedIn / GitHub.
Eyebrow sits quietly above the role. Let the name wrap; do not add large side
panels or a split layout that competes with the robot. Reserve a stable role
line box so typing does not shift later content. Stats below the CTA are optional
and require existing verified values; no invented placeholder metrics.

Phone CTAs wrap or stack; social controls remain a compact pair. A small bottom
scroll cue is decorative, pointer-inert, with no repeated bounce. A functional
scroll link instead requires the normal interactive pointer exception. Spline
loading/failure retains the sky, content, and actions without reflow or blocking.

### Skills transition band

Between Home and About: hairline top/bottom, 16px top / 32px bottom padding, muted mono
labels from existing skills data, 32px item gap. Infinite loop is optional motion,
never a source of page overflow. Expose one semantic list, hide duplicate loop
copies from screen readers and keyboard traversal. Supply a visible Pause/Play
button; also pause on hover and focus-within. Reduced motion shows a static
wrapping list with all skills readable. Do not add technologies absent from data.

### About — `#about` · `SYS.01 // ABOUT`

Desktop 12-column bento: main intro 7 columns, supporting factual skills/current
work card 5 columns; second row only when existing material warrants it. Main
intro preserves both existing paragraphs and Contact link. Skill groups may be
rearranged without rewriting facts. Verified stats are optional; absent data
means fewer cards, not invented numbers. Use one corner-bracket card. Mobile:
single column in reading order, no equal-height filler or tiny body text.

### Experience — `#experience` · `SYS.02 // EXPERIENCE`

At 1024px+, 4/8 split: sticky title/introduction on left, six numbered Dusk rows
on right; sticky top clears header. Rows: 01–06 mono index, company and role,
period, original description, then technology chips. Hairline separates rows;
24–32px row padding, no vertical timeline rail. Hover/focus highlights the
background without changing layout bounds. All descriptions remain visible by
default. If a later prompt explicitly adds collapse behavior, use an actual
button with expanded state, keyboard support, and touch parity; never hide
details exclusively behind hover. Static rows must not be fake buttons/tab stops;
interactive row controls receive focus. Phone: heading above rows, metadata wraps.

### Projects — `#projects` · `SYS.03 // PROJECTS`

Two equal columns from 768px where content fits, one below; 24px gaps. Each card:
reserved 16:9 preview → title → original description with existing More/Less
behavior → wrapping stack chips → existing working destinations. Preserve Show
All/Hide and data order. Keep media readable in both themes; use supplied assets,
not generated screenshots. Missing preview gets a quiet labeled placeholder;
missing URL is omitted or disabled with explanation, never linked to `#` as a
fake destination. A card container is not a nested link around other controls.
Pointer spotlight is subtle; hover/focus border may brighten with no card scaling.
Images below hero are lazy, dimensions reserved. Existing videos need pause/static
presentation under reduced motion; no newly introduced autoplay decoration.

### Certifications — `#certifications` · `SYS.04 // CERTIFICATIONS`

Compact two-column grid from 768px, one on phone. Title leads; issuer/year/ID
uses mono metadata only where present in data. Existing thumbnails are contained
without cropping essential certificate details; reserve aspect ratio. Preserve
description, View/Verify actions, credential-copy flow, Show All/Hide, and full
image dialog. On phones wrap action row rather than shrinking labels. Keyboard
focus and full-size images in the dialog remain usable; no decorative gold badge
on every certification. At most one warm section highlight if needed.

### Contact — `#contact` · `SYS.05 // CONTACT`

Dusk support panel: 24px radius, theme glass/opaque backing, a generous display
heading using existing contact wording, and clear invitation. Desktop 5/7 split:
existing email/LinkedIn/GitHub rows left, existing form right. Each direct link
has an icon, visible destination label, and clear focus/hover. Stack links then
form on phone. Preserve all current fields, validation and submission behavior.
Style idle, focused, invalid, sending, success and failure states without
changing the flow; never clear draft input on failure. Robot watermark is optional
static decoration at ≤4% opacity and never a second Spline scene.

### Footer · `SYS.06 // END`

Full-width `.footer-finale` sits outside `.content-sheet`, after Contact, in both
modes. Reuse the exact night sky gradient, a static sparse star field, and one
4.8-second diagonal light-beam sweep on first entry. IntersectionObserver starts
and pauses the sweep off-screen; reduced motion shows a static beam. Keep its
existing copyright/owner content and the `shendi.` Back to Home anchor in the
unchanged-width `.site-container`. The fixed back-to-top control is unchanged.

A decorative outlined `COVRYZNE` wordmark sits behind the violet horizon arc:
Bricolage, clamp(3rem, 17.5vw, 17rem), 650 weight, 1px ultra stroke, 75% opacity.
The horizon occludes the lower wordmark edge. Clip decoration within the footer;
all decorative layers are aria-hidden and pointer-inert. Periwinkle is the
secondary horizon glow. Preserve readable night foreground/muted/link/ring roles
inside the footer even when the surrounding page is in day mode.

### Ask Shendi Assistant · persistent widget

Preserve its current identity, title, conversation, send/clear/close actions and
all backend behavior. Skin: theme card-backed glass shell, 16px radius, hairline,
violet launcher, small mono header annotation `AI // ASSISTANT`; use cyan only
for a small decorative assistant marker, never fake online telemetry. User bubble
violet/white, assistant bubble secondary/foreground; body text 16px. Suggested
prompts remain existing content. Preserve current portal and layering exactly.

Specify visual treatments for existing idle/loading/response/error states: calm
loading indicator, legible message text, clear retry/error wording where already
available. No per-token reveal, new typing logic, auto-send, storage, tracking,
or changes to live announcements as part of a skin task. On mobile cap the panel
to the available dynamic viewport with safe-area/keyboard clearance and internal
conversation scrolling; close and composer remain visible. Preserve focus flows;
later QA must check close/return-focus and keyboard operation. If behavior fails
QA, report it separately before expanding a styling-only task.

## 8. Motion rules

Use existing framer-motion and CSS; no GSAP installation. Spline is the primary
moving subject. At most one supplementary animated focal effect in a viewport.
Do not combine robot, drifting cards, twinkling sky, marquee, and animated counters
as competing attention sources.

| Token / effect | Rule |
| --- | --- |
| `--motion-fast` | 140ms; press, icon and local feedback |
| `--motion-base` | 220ms; color, border, hover |
| `--motion-panel` | 280ms open / 180ms close; optional small translate + opacity |
| `--motion-enter` | 800ms first hero entrance; 14px rise + fade, Dusk-derived |
| Section reveal (FM-1) | Framer Motion LabReveal orchestrates RevealItem children: 700ms, 20px rise, once; 80ms stagger + 100ms initial delay; ease [.22, 1, .36, 1] |
| `--ease-enter` | cubic-bezier(.22, 1, .36, 1) |
| `--ease-ui` | cubic-bezier(.2, .8, .2, 1) |
| Drift, optional | 8–12s, ≤6px travel, at most two desktop annotations |
| Footer beam | 4800ms once on entry; transform/opacity only; paused off-screen; static under reduced motion |
| Stars, optional | 5s subtle opacity twinkle; static default while robot animates |
| Marquee | 30–40s linear cycle; pause on hover/focus and visible Pause control |
| Counters | Optional 600ms once for verified metrics; final value always accessible |

Entrance must not delay access or hide content when JavaScript fails. Animate
transform/opacity, with bounded color transitions for controls; no layout-bound
animation, scroll hijacking, pinned narrative, or continuously animated blur.
Interactions remain interruptible. Off-screen effects stop and hidden tabs do
not run decorative loops. For any continuous decorative motion over five seconds,
provide a pause mechanism or keep it static; default stars/cards are static here.

`prefers-reduced-motion: reduce`: no drift, twinkle, marquee scrolling, spotlight
tracking, counter tween, rise, hover rotation, or scroll animation; render final
content immediately. Typewriter's accessible text is stable; a static visual
role is the reduced-motion target, preserving all role content elsewhere without
repeated live announcements. Do not rewrite the locked robot integration to add
animation control. Any reduced-motion gap in the existing Spline/typewriter is
a later accessibility task requiring explicit scope; skin-only work must report
the gap rather than silently claim it passed. Never disable the canvas's existing
pointer/touch contract as a styling shortcut.

## 9. Anti-patterns

- Generic purple-pink AI gradients on every section; cyan replacing Dusk violet.
- Neon outlines, bloom on body text, glitch effects, fake terminal text or metrics.
- Extra Spline scenes, heavy animated noise/blur, global pointer listeners that
  compete with the robot, or page rerenders on every cursor move.
- Robot zoom/framing/scene changes, pointer-blocking scrims, or a portal moved
  inside a stacking context; restyling chatbot logic or its API route.
- Tiny mono body copy, low-contrast muted text, outline-only text as a contrast
  solution, essential information in hover-only reveals or color alone.
- Every row/card acting clickable; nested interactive controls inside a link;
  unavailable actions disguised by `href="#"`.
- New facts, fabricated testimonials, percentage skill bars or fake live statuses.
- Excessively round form fields, brackets on everything, rainbow stack badges,
  adding font families or UI libraries without a clear need.
- Replacing all public preview photography/screenshots with SVGs: SVG is for
  icons; project/certificate raster assets remain valid and should be optimized.

## 10. Pre-delivery checklist for later implementation

These are future acceptance checks, not claims that UI implementation is done.

- [ ] Read this MASTER; use the supplied Dusk primitive pairs and exact hero skies.
- [ ] Preserve all anchors, content/order, More/Less, Show All/Hide, CV/social,
  certification dialog/credential flow, and contact submission behavior.
- [ ] Dark first visit, saved choice and explicit light mode work without flash;
  both modes have the same information hierarchy and usable component states.
- [ ] Verify 375 / 768 / 1024 / 1440px, 320px reflow, 200% zoom, landscape,
  long labels, font fallback, menu open, dialog open, and keyboard visible.
- [ ] No horizontal page scrolling; no text or action hidden by nav/chat/sticky UI.
- [ ] Measure body ≥4.5:1, large type ≥3:1, controls/focus ≥3:1 in both themes;
  inspect actual glass/gradient/Spline composites including the bright horizon.
- [ ] Check semantic headings, skip link, names for icon controls, alt text,
  keyboard order, visible focus, focus return, and no hover-only information.
- [ ] Targets ≥44px with 8px separation; tags wrap and long destinations remain
  available; form labels/errors/loading/success/failure are understandable.
- [ ] Test robot cursor follow across the hero, CTA clicks, phone tap/drag and
  native scroll, exact zoom/downshift, scene loading/failure and off-screen pause.
- [ ] Light-mode outline remains on the name/tagline; decorative layers do not
  capture input; no new effects obscure the robot silhouette.
- [ ] Assistant portal and 9999/10000/10002 layering remain; chat opens above
  page overlays at every scroll position; API route and guardrails unchanged.
- [ ] Reduced motion disables new loops/reveals/tracking; marquee has Pause and
  static fallback; report existing locked Spline/typewriter gaps separately.
- [ ] Media dimensions are reserved, below-fold images lazy, existing preview
  videos controllable, no JS-driven spotlight rerenders or duplicate 3D scene.
- [ ] Use at most one warm highlight per section; cyan stays sparse; decorative
  hairlines never stand in for functional boundaries.
- [ ] Run repository lint/typecheck and relevant build/checks when implementing
  code; document failures and distinguish prior issues from introduced ones.
- [ ] Record any deliberate deviation in this MASTER before calling work aligned.

## 11. Original documentation validation record

The original design-system delivery only created design documentation. Application
rendering, robot, assistant, responsiveness, font loading, and performance were
not changed or tested at that stage. The subsequent implementation is recorded in
`qa/REPORT.md`. CSS examples here remain the normative implementation contract.

Opaque semantic pair contrast is checked numerically during documentation
delivery. Composited glass and live hero contrast remain future acceptance work.
See the recorded measurements below; ratios are rounded to two decimals.


| Opaque pair | Foreground / background | Contrast |
| --- | --- | --- |
| Night body/page | `#efedfa` / `#0b0a1f` | 16.86:1 |
| Night muted/card | `#a3a1c6` / `#1a1940` | 6.74:1 |
| Night link/card | `#a08cff` / `#1a1940` | 6.12:1 |
| Day body/page | `#0f0f1a` / `#f6f6fb` | 17.66:1 |
| Day muted/haze | `#676784` / `#f3ecfd` | 4.73:1 |
| Day link/haze | `#3000c1` / `#f3ecfd` | 9.62:1 |
| Primary label/fill | `#ffffff` / `#7436ff` | 5.65:1 |
| Night cyan/card | `#22d3ee` / `#1a1940` | 9.24:1 |
| Day cyan/haze | `#08758a` / `#f3ecfd` | 4.65:1 |
| Night amber/card | `#f59e0b` / `#1a1940` | 7.78:1 |
| Day amber/haze | `#925400` / `#f3ecfd` | 5.22:1 |
| Night success/card | `#70e1bc` / `#1a1940` | 10.49:1 |
| Day success/haze | `#08765b` / `#f3ecfd` | 4.86:1 |
| Night error/card | `#ff9cab` / `#1a1940` | 8.43:1 |
| Day error/haze | `#b42345` / `#f3ecfd` | 5.58:1 |
| Night input boundary/card | `#77719c` / `#1a1940` | 3.68:1 |
| Day input boundary/haze | `#77718d` / `#f3ecfd` | 4.02:1 |


## 12. Pass 2 implementation contract — R1–R5

The current implementation is the source of truth for this addendum. Changes
were reviewed in order: sheet, hero collision/cue, footer, then documentation.
The supplied audit's missing-MASTER statement did not match the checkout: this
file already existed and was updated in place.

| Dusk name | Implemented binding | Day / night |
| --- | --- | --- |
| paper | `--paper`, sheet background | #f6f6fb / #0f0e26 |
| night | `--night` | #0b0a1f, shared fixed primitive |
| lilac | `--lilac` and secondary surface | #d9dcfb / #2b2866 |
| ultra | `--ultra` and link family | #3000c1 / #a08cff |
| violet | `--violet`, primary fill | #7436ff, shared fixed primitive |
| periwinkle | `--periwinkle`, horizon glow | #8798f7, shared fixed primitive |
| ink, card, haze, mute | foreground, card, accent/surface, muted-foreground | Existing paired table and CSS block above |

**Sheet structure:** Hero → skills band → `.content-sheet > .site-container`
containing About, Experience, Projects, Certifications, Contact → full-width
Footer. Sheet: relative, z-index 20, -16px margin, 16px internal top padding,
40px top corners, paper background, soft top shadow. The skills band reserves
32px bottom padding, so the 16px overlap clears its text and controls. Its
surface-to-secondary gradient makes the curved sheet edge visible in both modes.
Native document scrolling carries the sheet upward. Container widths, section
content, anchor targets, and all pointer routing remain unchanged.

**Hero verification:** The content was already vertically top-aligned (128px
phone / 136px desktop inset). Its name/tagline were readable with the existing
scrim and light-mode outline at 1440px and 390px. No title/name layout change was
needed. Replace only the scroll cue's 220px spacer with auto flex margin and
clamp(32px, 5svh, 64px) breathing room. On a 390 × 844 viewport, the hero now fits
844px and the cue ends at 780px, clearing the CTA group. Exact robot camera zoom,
canvas shifts, scene URL, source file and pointer-event declarations stay locked.

**Typography and component inheritance:** Bricolage display, Geist body, Geist
Mono labels; `SYS.XX // SECTION` convention; 4px spacing base; 12px fields, 16px
cards, 24px feature panels, 40px sheet top corners, pill controls. Glass nav,
corner brackets, frame-batched project spotlight, one-shot `lab-reveal` (14px,
480ms, ease-enter), and 38s marquee with Pause/reduced-motion fallback remain as
implemented. `skills.tsx` is retained because About imports it.

**Hard contracts:** Do not edit `hero-robot-background.tsx`, `src/lib/spline.ts`,
or `src/app/api/assistant/route.ts` for these revisions. Chat must retain its
body portal, 9999 / 10000 / 10002 layering, request/storage/delete behavior and
all guardrails. Content, validation schema, server actions and destinations stay
sourced from the existing data. All new decorative layers ignore pointers.

**Pass 2 acceptance:** Review the sheet boundary and hero at 1440/390 in both
modes; check no marquee/cue clipping, unchanged inner widths, footer outside the
sheet, no wordmark overflow, readable night footer in day mode, reduced-motion
beam static, and the original chat/robot contracts. Evidence and remaining
verification limits are recorded under `design-system/qa/pass-2/`.


### R5 — Experience reading highlight

`useReadingHighlight` observes row intersections with a centered band: pixel
root margins equal to 40% of viewport height above/below, with thresholds
0 / .1 / .25 / .5 / 1. At observer notifications, select the intersecting row
whose center is nearest the viewport center. Exactly one row is active; no
scroll event listener, requestAnimationFrame loop, React render loop, reordered
content, added tab stops, or layout changes. Resize rebuilds the observer after
100ms; preference changes immediately reset it.

Active row: opacity 1, card background, stronger border. Other rows: muted
heading color and `--reading-dim-opacity` (.78 night / .96 day), with 320ms
opacity/color transitions. Night muted text over paper remains about 5.05:1;
night links about 4.64:1; day muted text after dimming about 4.66:1. Keep day
dimming shallow to preserve AA contrast. Hover/focus-within restores full
emphasis. Reduced motion disconnects the observer and removes all reading
attributes, leaving every row fully bright; CSS also provides that fallback.

### Repository persistence

The folder existed locally but was ignored by Git. `.gitignore` now allows the
MASTER, README, this pass's QA report and browser runner to be tracked. Screenshots,
raw JSON and old local QA artifacts remain ignored. The MASTER is self-contained;
source brief and reference files may remain local according to repository policy.


## FM-1 ? Framer Motion reveal migration (10 November 2026)

Current user instruction supersedes the earlier CSS reveal timing above and the
historical 480ms implementation record. `LabReveal` keeps its children/className
API and uses a transform-free motion container with whileInView, once: true,
and viewport margin "-12% 0px -12% 0px". `RevealItem` owns opacity 0?1 and y 20?0;
items inherit the shared 80ms stagger and 100ms delay. About cards, all six
Experience rows, project/certificate cards, and Contact heading/links/form use
this system. Each list/grid shares one trigger; no per-item observers.

SSR uses initial=false so content is visible without JavaScript. After hydration,
Framer controls arm off-screen items. MotionConfig reducedMotion="user" remains
in charge of transforms; Framer's useReducedMotion hook keeps opacity visible
without custom matchMedia checks. Container/sheet transforms are not introduced.
Existing reading-highlight behavior is preserved; its migration, hero parallax,
sheet changes, and nav layoutId are outside FM-1.

See [FM-1 QA](qa/fm-1/REPORT.md) for production-browser checks and screenshots.


## Glass navbar correction - 10 November 2026

User requested a visibly glass navbar. Dedicated --nav-glass, --nav-edge,
--nav-highlight, and --nav-shadow roles provide paper at 58% opacity in light
mode and card at 52% in dark mode, with 24px backdrop blur, 160% saturation,
a fine edge and inset highlight. An opaque card fallback applies when backdrop
filtering is unavailable. Nav labels use foreground; active labels retain their
theme-specific contrast. Shared --glass surfaces and pointer rules are unchanged.

Light-hero replacement is undecided. Three local screenshot previews live at
/design-options/light-hero/index.html. Their CSS is applied only in preview
browsers; keep the app hero unchanged until Shendi selects an option.


## Hero and navigation simplification - 10 November 2026

Current user decision supersedes the undecided light-hero preview: remove the
hero-content::before oval entirely in both themes. No replacement scrim is
introduced; the Spline canvas, framing, sky, pointer rules, and hero content are
unchanged. Remove section annotations SYS.01 through SYS.06 from their call
sites, keeping actual headings and content. SYS.00 in the hero is unchanged.

Navbar glass tint is now 24% in both themes, retaining the 24px blur, edge,
highlight and opaque fallback. A scoped LayoutGroup and shared layoutId pill
move the deep violet-blue highlight across desktop links on hover or keyboard
focus. Hover previews do not change aria-current or scroll position; clicks
and section observation still own activeSection. Mouse leave restores the active
selection; reduced-motion preference uses an immediate highlight transition.

Light hero display/name/tagline now use white text with a bounded dark text
shadow for separation from the black robot after removing the oval. Existing
text-outline-hero classes stay in place; no backing surface is added.


## Reference navbar and sky navigation - 10 November 2026

User-supplied screenshots now define the header composition: unboxed logo left,
glass capsule containing only desktop links centered, separate circular theme
button right. Phone/tablet uses theme and hamburger circles side by side, with
no surrounding glass header capsule. No Get the App action or phone mockup.

Mobile menu uses an accessible Radix modal portal with Framer Motion entrance:
full viewport opacity fade with 32px downward settle, followed by 70ms staggered
large navigation links. It has a night star field / horizon glow and a light
blue-lavender sky variant; decoration ignores pointers. Theme and close circles
remain at the top. Escape, focus trap, focus return, scroll lock, selecting a
section and resizing to desktop retain expected modal/navigation behavior.
Reduced motion removes entrance translation, timing and stagger. Desktop pill
hover/focus movement is retained. Robot integration, content and assistant
layering stay unchanged. Evidence: qa/sky-navigation/REPORT.md.


### Navbar refinements

User requested a subtler light border: white edge alpha reduced from .55 to .24
and inset highlight from .70 to .14. Both header/menu wordmarks now read only
covryzne., using Geist at weight 500 and tight tracking like the hamburger links.
The mobile menu clips overflow rather than scrolling. All six links fit within
the viewport; short screens reduce gaps and use two columns below 420px height.
Verified 390x844, 320x568, 844x390 and 320x320: all links visible, matching fonts,
no menu scroll after wheel input. Typecheck and changed-component lint passed.


## Shared sky on main website

User approved both hamburger sky themes and requested them on the main website.
Hero and footer now share --sky-background with the menu: midnight in dark mode,
blue-to-lavender in light mode. Hero grid is replaced by the same static sparse
star field used in menu/footer. A lower-horizon glow fades toward the content
sheet; no center circle or text backing is reintroduced. The content sheet has
a quieter, theme-aware star texture, while existing card/text surfaces remain.
Stars use shared CSS gradient declarations, no canvas, animation, new library,
or pointer handlers. Robot scene/integration and page behaviors are untouched.

TypeScript, hero-component ESLint and diff checks passed. Chrome checked both
themes at 390 and 1440px: no horizontal overflow or runtime errors. Hero, menu
and footer star maps match; decorative stars ignore pointers and are static.
Screenshots/results: qa/main-sky/.


## Hero LCP correction

User reported 3.21s local LCP with the hero tagline selected. Hero copy now
renders visible in server HTML, without the opacity-zero entrance. Typewriter
starts with its complete first role rather than an empty title; the full-role
pause timer now cleans up correctly. Light text uses a single small shadow.

DeferredHeroRobot is a memoized scheduling wrapper: after initial font readiness,
two animation frames and an idle callback, it mounts the existing dynamically
loaded robot. The locked robot scene/zoom/touch/pause implementation is unchanged.
The star field remains static in hero/menu/footer. The full-content-sheet star
layer and hero star mask were removed to reduce large decorative paint surfaces.

Exploratory local development measurements (390x844, normal motion) are recorded
in qa/lcp/before.json and after.json. Initial baseline: 1172ms. Disabling entrance
in that exploratory run: 572ms; disabling stars: 936ms. These single samples have
unequal resource timing and do not establish isolated causal improvements.
Three post-change dev samples: 888, 1072, 776ms, all at first contentful paint.
They are not production/field results or a direct reproduction of the user's
3210ms measurement. Long tasks still occur when WebGL initializes/renders.

Typecheck, changed-component ESLint, diff check and real-browser smoke checks
passed. Hero remains visible without JS; one Spline canvas loads with pan-y;
mobile menu works and no horizontal overflow/runtime errors were observed.


### Render-cost refinement after user reported 1.32s LCP

Robot is not established as the cause of the reported regression after adding
sky styling. A same-page exploratory comparison with the robot loaded measured
95th-percentile frames at 16.8ms in every mode: sky on, stars off, all sky/blur
effects off, sky on again. This environment did not reproduce the user's perceived
slowdown and cannot rule out GPU-specific costs on their hardware. Raw data:
qa/lcp/sky-ablation.json. No causal FPS improvement is claimed.

Further low-impact reductions: HeroTypewriter owns its timer state so typing
no longer rerenders the entire hero. It pauses offscreen/in hidden tabs and
skips the timer under reduced motion; server-rendered first role remains visible.
The three gradient star layers are replaced by a single repeating 920-byte SVG
tile shared by hero/menu/footer; opacity is baked into the tile. Sky palette and
interactive robot remain. Typecheck/lint/browser checks passed: text cycles,
pauses/resumes, static reduced-motion role, JS-disabled content, shared star
asset loaded, one robot canvas, working menu and no runtime errors. Evidence:
qa/lcp/render-refinement.json. Its single 600ms LCP reading is not a benchmark.


## First-visit progress intro and React Bits cursor

Explicit user request implements both features. SplashCursor-JS-CSS was installed
using npx shadcn@latest add @react-bits/SplashCursor-JS-CSS --yes. Registry source
is retained in SplashCursor.jsx/css; SiteCursor is the project integration.

SiteExperience wraps the page with a client-only, once-per-tab-session sky intro.
Readiness stages reflect hydration, fonts, initial load and an optional robot
wait; percentages are stage progress, not measured network bytes or a promise
that lazy below-fold media is downloaded. The visual intro has a minimum 1.1s
presentation, final fill/exit, skip action and a 6.5s watchdog (plus short exit).
Optional robot wait is capped at 4s. Content is inert and body scroll locked only
while loading. Focus returns to main on completion. Without JS the server HTML
stays accessible; no blocking overlay is serialized.

Cursor loads only after intro completion and first fine-pointer movement, uses
low quality, fixed violet/cyan palette, no bloom/shading/intro, and a short trail.
Touch-only/reduced-motion devices do not mount it. Hidden tabs unmount the effect
and release resources; visibility restoration rearms on mouse movement. The
registry's own simulation sleeps after pointer inactivity. Overlay ignores
pointers and does not hide the native cursor. This adds a fluid WebGL effect;
no claim is made that the loading intro accelerates download/rendering or that
this effect has zero GPU cost.

Typecheck, changed TS/TSX ESLint and browser checks passed: progress to 100,
revisit skip, manual skip, stalled robot release, click-through navigation/theme,
mobile/reduced-motion exclusion, no-JS content and no page errors. Source JSX is
outside this repo's ESLint matching configuration, but was compiled and exercised
in the browser. Evidence: qa/intro-cursor/.


### SplashCursor preset adapted from supplied GlowCursor example

The user's attachment describes GlowCursor, but their request is to adapt its
setup to existing SplashCursor. Keep SplashCursor's simulation/overlay and map
color to a one-color palette #1d00a3, intensity 1.25, glow .9, clickBurst to
clickSplash=true. Added optional trailWidth/linger/maxDevicePixelRatio settings
to the installed JS component: 23 CSS-pixel Gaussian core diameter converted
using canvas CSS height, a 2-second inactivity cutoff and linger-based dye decay,
and DPR capped at 1 by the integration. Existing normalized size/trail behavior
is retained when the new optional settings are omitted. This is an adaptation;
the two simulations do not produce identical trails.

Quality stays low, intro/shading stay off, theme follows site light/dark, and
existing lazy loading, fine-pointer/reduced-motion checks and click-through
behavior remain. Browser checks at deviceScaleFactor 2 confirmed 1200 CSS pixels
map to a 1200-pixel canvas, actual rendered ink in both themes, GL error 0,
pointer-events none and working About navigation. Typecheck and wrapper lint
passed. Evidence: qa/cursor-preset/results.json and screenshots.


## Correction: use the actual GlowCursor

The user explicitly corrected the component choice: use GlowCursor, not a
SplashCursor preset. Current implementation supersedes all SplashCursor setup
records above. GlowCursor.jsx and GlowCursor.css were copied from the second
user attachment's Full Component Source and Component CSS blocks. The only
source addition is a JSDoc prop type so optional JS props are recognized by
TypeScript callers; the supplied simulation and CSS are unchanged.

SiteCursor now imports GlowCursor and passes color #5f8bff, intensity 1.3,
trailWidth 3, linger 1.4, glow 1.2 and clickBurst. Quality low and DPR 1 retain the
prior performance budget. Theme follows the site. Fixed full-viewport positioning
and pointer-events none are integration styles; the supplied component remains
usable in contained contexts. Startup deferral, touch-only/reduced-motion
exclusion, hidden-tab cleanup and the loading intro remain unchanged.

Unused SplashCursor JSX/CSS were removed. Typecheck, wrapper lint and browser
checks passed: actual GlowCursor renders pixels in dark/light with screen/normal
blend respectively, no GL/runtime errors, click-through About navigation and
no cursor renderer on touch/reduced motion. Evidence: qa/glow-cursor/.


## Tools of the Trade uses the supplied React Bits LogoLoop

User requested replacing the old text marquee with LogoLoop and the exact logos
from The Toolkit. LogoLoop.jsx/css were extracted from their supplied Full
Component Source / Component CSS blocks. Added JSDoc prop declarations for JS/TS
interop; the supplied runtime/CSS is otherwise unchanged. No react-icons or
other new dependency is needed because every node comes from skillsData.icon.

SkillsMarquee retains its section API, label and accessible Pause/Play control,
but renders LogoLoop using a stable module-level mapping of all 14 skillsData
names/icons in the same order as Skills. Settings: 50px/s left, 32px logos,
40px gap, inline names, pause on hover, no scale/magnify/intro. Engine handles
viewport/hidden-tab pause. Toolkit itself is unchanged. Original marquee CSS
and custom observer were removed. Scoped SVG sizing overrides the shared
size-12 class only in the strip. Reduced-motion / scripting-none CSS shows one
complete wrapping list with no transforms and hides redundant copies/control.

Typecheck, wrapper ESLint, whitespace and actual browser checks passed: all 14
names/order/SVG markup match Toolkit exactly; loop moves and pause/play works;
32px logos and no horizontal overflow in both themes at 390/1440px. All 14 tools
are visible in reduced-motion and JS-disabled static layouts, with no runtime
page errors. Evidence: qa/logo-loop/results.json and screenshots.


### LogoLoop clean Dock preset and placement correction

Current user instruction moves the loop to the content sheet, directly between
AboutSection and ExperienceSection. Remove the hero-adjacent strip, its title,
tinted band, inline names and visible pause control. Use one transparent 200px
row, retaining the exact 14 Toolkit icons. The user screenshot is the selected
preset: line, left, speed 60, logoHeight/gap 44, hoverSpeed 0, scaleOnHover false,
bend .5, magnify .8, labels hover, muted .5, focus/tiltX/tiltY/scrollBoost 0,
fadeOut true with width .14, step false, draggable and intro true. Examples with
placeholder image logos/duplicate props are not additional requested loops.

Preserve accessibility via named icon nodes and a pause control visible only
on keyboard focus. Reduced-motion and scripting-none show a complete static
wrapping list (container can grow beyond 200px in those modes). Toolkit remains
unchanged. Typecheck/wrapper lint/browser checks passed: immediate preceding and
following siblings are #about/#experience, transparent 200px row, 44px SVGs,
no inline labels/strip title, real magnify response, all tools available, both
themes at 390/1440px without overflow or runtime errors. Evidence:
qa/logo-loop-dock/results.json and screenshots.


## Reversible reference hero layout trial

User explicitly approved trying the supplied mobile/desktop placement images,
keeping the existing assets and matching hamburger typography. This supersedes
the earlier centered-hero/framing composition: desktop content left, existing
robot centered at 75% width; mobile text above the existing robot. Runtime zoom,
scene and interaction code stay untouched. Robot positioning is CSS on a stage
wrapper, clipped within the hero. Name hierarchy is Hey, I'm / Shendi gradient /
Teuku Maulana Efendi, with a smaller role above. Mobile social buttons form their
own row. Existing Geist replaces Bricolage for all display/heading roles, as
requested; fonts.ts no longer downloads that unused display family.

Header max width aligns to the 1200px desktop content and logo padding aligns
with mobile content. The startup readiness selector now follows the robot stage.
The loop stays between About and Experience. No new image/robot asset is added.
Rollback snapshot + guarded restore script and QA evidence are stored in
qa/hero-layout-trial/. Four implementation files are snapshotted. Typecheck,
changed-component lint and 12 viewport/theme browser checks passed.


## React Bits Shuffle on the hero name

User explicitly requested installing @react-bits/Shuffle-JS-CSS with the flip
preset. CLI installed Shuffle.jsx/css plus gsap and @gsap/react dependencies.
This current request supersedes the earlier no-GSAP preference for this effect.
HeroName applies actual Shuffle separately to Shendi and Teuku Maulana Efendi,
retaining the approved two-line scale, Geist family, case, alignment and gradient.
The supplied pixel-font/uppercase/hidden demo CSS is overridden only within the
hero name. A per-character CSS index in Shuffle keeps the gradient visible when
flipped characters have their own transformed layers. Added JSDoc for optional
JS props consumed by TypeScript; the animation engine is otherwise unchanged.

Settings match the user: flip/down, duration 1.5, sequence, shuffleTimes 4,
power3.out, stagger .07, threshold .1, triggerOnce/triggerOnHover true,
hoverRadius 0, motionBlur false, respectReducedMotion true, maxDelay 0,
uppercase scramble charset, loop false, loopDelay 0. Names are pointer targets
for hover while the rest of the hero pointer contract stays unchanged.

GSAP/Shuffle is lazy loaded after the first-visit loader makes content non-inert;
it does not play behind the loading screen. Server/Suspense fallback text stays
visible and reduced-motion users get static names without importing GSAP.
Typecheck, changed TSX ESLint and browser checks passed: after-loader animation,
complete final name, hover replay, matching Geist/case, no mobile horizontal
overflow at 320/390, visible reduced-motion/no-JS fallback and zero page errors.
Evidence: qa/shuffle-name/results.json and screenshots.


## Shuffle canceled: plain white raised hero lettering

User canceled Shuffle and requested plain white text from the role through the
full name, with a thin shadow for subtle depth. HeroName is now static markup;
Shuffle JSX/CSS and unused gsap/@gsap/react dependencies were removed. The
existing role typewriter behavior is retained, with a white caret. Role,
Hey I'm, first name and surname now use #ffffff with shadows 0 1px 1px at 40%
black and 0 3px 6px at 20% black, in both themes. The name gradient and all
Shuffle styling/state were removed; typography/placement stay as approved.

Typecheck and changed-component lint passed. After restarting the dev server
which had retained stale CSS, browser computed styles verified white color/fill,
non-empty shadow, absent Shuffle DOM and no mobile horizontal overflow in both
themes. No background panel/circle was introduced.


## Hero robot edge alignment and compact mobile text

User requested lowering the desktop robot to the hero boundary, while shrinking
mobile typography to lift the robot and expose more of its body. Desktop stage
shift is now 0% instead of -4%, so the renderer wrapper's bottom matches the
hero's bottom. Existing runtime scene/zoom and touch settings are unchanged.

Mobile first name is clamp(56px,17vw,72px), 66.3px at 390px; role, surname,
intro and tagline are smaller, and vertical gaps are tighter. Hero minimum is
max(100svh,820px) instead of 1000px. Its stage shift uses a viewport-aware pixel
clamp to keep the robot head around the lower content area across phone heights;
tablet has its own offset. Desktop typography/column sizing stays unchanged.

Actual Chrome screenshots and seven viewport checks passed at 320x568,375x812,
390x844,390x1000,768x1024,1024x768,1440x900: no horizontal overflow, one unchanged
Spline canvas with pan-y, mobile content fits upper portion, desktop renderer
bottom equals hero bottom. Evidence: qa/hero-framing-refine/.


## Remove content-sheet overlap at hero boundary

User identified that the content sheet covers the robot at the hero boundary.
Removed its -16px top margin and upward box shadow; sheet now follows hero in
normal flow at margin-top 0. Rounded top corners, padding, background and sticky
ancestor behavior are retained. Current user decision supersedes previous
sheet-over-hero overlap styling. Browser checks at 390/768/1440px confirmed
sheet top equals hero bottom exactly, margin 0, no shadow and no page overflow.
Robot position, source and hero's own boundary clipping are unchanged.


## Reviewer statistics replace The Toolkit card

User supplied reviewer-specific facts: 1000+ code reviews, 4.9/5.0 average
rating and more than one year of external code-review experience. These are
authorized user-provided metrics, superseding the earlier no-new-review-counts
restriction for these three facts. Replace only the lower The Toolkit About
card with an External Code Reviewer / Dicoding Indonesia card. The existing
Experience & Exploration card stays; tools remain in the separate LogoLoop.

Installed the requested @react-bits/CountUp-JS-CSS via shadcn. Registry ships
CountUp.jsx (inline styling, no separate CSS). Its motion dependency shares the
deduplicated framer-motion version installed by npm. Added JSDoc prop typing;
counting engine is unchanged. ReviewerStats lazily loads it as the metrics near
the viewport, keeping the full final values in server HTML and Suspense fallback.
Settings: from 0, count, easeOut, standard, empty separator/prefix, up, 3.2s,
no delay, trigger view, replayOnHover. Suffix/decimals produce exact 1000+,
4.9/5.0 and 1+. Main metric uses 72px/500; compact secondary values fit phones.
Stable screen-reader values accompany aria-hidden animated numbers. Reduced
motion renders static final values without loading the counter.

Typecheck, About/ReviewerStats ESLint and browser checks passed: sampled count
0+ then 454+ then exact final metrics, hover replay, Toolkit card absent while
LogoLoop remains, values fit both themes at 320/390/1440px, correct reduced-motion
and JS-disabled output, zero page errors. Evidence: qa/reviewer-countup/.

### About counters � scroll trigger (10 Nov 2026)
- All five About metrics count whenever their numbers re-enter the viewport; hover does not replay them.
- Experience/project totals come from the existing datasets, displayed as 06 and 07 with two-digit padding throughout the animation.
- Shared AboutCounter uses React Bits CountUp, preserving static final values for reduced motion and without JavaScript.
- Verified in Chrome: intermediate values animate, final values remain after hover; viewport re-entry restarts from zero, no horizontal overflow at 390px. TypeScript and targeted ESLint pass.

### Homepage file organization (10 Nov 2026)

Page sections and their private helpers live under src/app/_sections, grouped by section.
Header and footer live in src/app/_components; reusable UI stays in src/components.
This is a file/import refactor; section order, content, styles, and interactions are preserved.
