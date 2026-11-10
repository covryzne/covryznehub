# Framer Motion Migration — Pass 2 (Opsi B: bertahap)

Keputusan Shendi (10 Nov 2026): transisi dimigrasikan ke Framer Motion
secara BERTAHAP. Pass ini hanya: **reveal system + hero + sheet**.
Experience reading-highlight dan nav pill layoutId ditunda ke pass 3.
Prompt R1 di `revision-prompts-pass2.md` DIGANTIKAN oleh FM-3 di sini;
R2 (cek tabrakan hero) dilakukan SETELAH FM-2; R3/R4 tidak berubah.

Konteks teknis (sudah terverifikasi dari kode):
- framer-motion v12.23.24 sudah terinstall; `MotionConfig
  reducedMotion="user"` sudah ada di page.tsx.
- Reveal sekarang: LabReveal (IntersectionObserver + CSS 480ms) — satu
  section fade sebagai satu blok, tanpa stagger, tanpa motion yang
  coupled ke scroll. Itu yang terasa "buluk".
- Jebakan: ancestor ber-transform merusak `position: sticky` keturunan
  (heading Experience sticky) → sheet TIDAK boleh dianimasikan pakai
  transform; rasa meluncurnya datang dari parallax hero.

Jalankan berurutan: FM-1 → FM-2 → FM-3. Review visual tiap langkah.

---

## FM-1 — Reveal system: LabReveal → Framer Motion + stagger per item

```
Migrate the scroll reveal system from the custom IntersectionObserver
implementation to Framer Motion (framer-motion v12 is already installed).

Current state: src/components/lab-reveal.tsx toggles a data attribute via
IntersectionObserver; globals.css transitions opacity/transform over
480ms. Every section is revealed as ONE block — no stagger, which looks
flat.

Requirements:
- Reimplement LabReveal with motion.div and variants: hidden = opacity 0,
  y 20; visible = opacity 1, y 0; duration 0.7; ease [0.22, 1, 0.36, 1];
  viewport { once: true, margin: "-12% 0px -12% 0px" }.
- Export a RevealItem component from the same file (a motion.div carrying
  the item variants, no trigger of its own) and update the sections
  (about, experience, projects, certifications, contact) so each card or
  row inside a LabReveal is wrapped in a RevealItem. The container
  variants use staggerChildren 0.08 and delayChildren 0.1 — items must
  cascade in, not fade as one block.
- Keep the LabReveal API (children, className) and all existing class
  names; delete the now-unused data-reveal CSS rules from globals.css.
- Accessibility: content stays fully visible without JS and under
  prefers-reduced-motion — MotionConfig reducedMotion="user" is already
  in page.tsx, rely on it; do not add manual media-query checks.
- Animate transform and opacity only. Do not touch the Spline canvas,
  hero-robot-background.tsx, the API route, or any pointer-events rules.
```

## FM-2 — Hero: entrance timeline + parallax pas scroll pergi

```
Add a Framer Motion entrance timeline and scroll-away parallax to the
hero (src/app/_sections/hero/hero-section.tsx and the hero rules in globals.css).

Entrance (on load, once): stagger the hero content top-down — eyebrow,
availability badge, title, name, tagline, actions, scroll cue — each
fades and rises 16px, duration 0.8, ease [0.22, 1, 0.36, 1], stagger
0.09, after a 0.15s initial delay. Use variants with the hero content
children as motion elements; keep all existing class names for styling.

Scroll-away parallax: useScroll with the hero section as the target
(offset ["start start", "end start"]); map progress onto the CONTENT
layer only: y from 0 to 60, opacity from 1 to 0.25. The robot background
and the sky/grid layers receive no transforms.

Hard constraints:
- hero-robot-background.tsx, the Spline scene, zoom values, and canvas
  transforms: untouched.
- The pointer-events contract stays exactly as-is (.hero-content is
  pointer-events none; .availability and .hero-actions are auto).
- Keep the typewriter behavior and .text-outline-hero on name/tagline.
- Remove the old CSS hero-enter keyframe if it conflicts.
- Remove the fragile padding-top: 220px on .hero-scroll; the cue is
  positioned by the hero flex layout (margin-top: auto).
```

## FM-3 — Sheet transition (R1 versi aman, tanpa transform di sheet)

```
Implement the Dusk sheet transition WITHOUT breaking sticky elements.

Architecture (decided — do not deviate): the sheet itself gets NO
transform animation, because a transformed ancestor breaks
position: sticky for its descendants and the Experience heading is
sticky. The sense of motion comes from the hero parallax plus the
sheet's static overlap.

Implement:
- Wrap everything after the hero + skills marquee (About through
  Contact, NOT the footer) in a sheet container: background = the paper
  token, border-radius 2.5rem on the top corners, margin-top: -2.5rem
  overlap, position relative, z-index above the hero layers, and a soft
  top shadow suited to each theme.
- Keep all inner .site-container widths and section paddings unchanged.
- The footer stays outside the sheet on the night background.
- Verify in both themes at 1440px and 390px: the overlap must not clip
  the marquee or the hero scroll cue, and the Experience sticky heading
  must still stick while scrolling (test it, do not assume).
```

---

## Sesudah pass ini

1. Screenshot hero (desktop + mobile, dua tema) → jalankan R2 dari
   `revision-prompts-pass2.md` (cek tabrakan teks vs robot).
2. Pass 3 (ditunda): Experience reading-highlight berbasis
   scrollYProgress, nav pill `layoutId`, AnimatePresence untuk modal chat.
