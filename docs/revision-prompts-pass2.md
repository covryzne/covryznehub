# Revision Prompts — Pass 2 (dari audit Covryzne atas commit dd1cadb, 10 Nov 2026)

Audit verdict: fondasi pass 1 solid — token Dusk nempel di globals.css, semua
kontrak dev-robot UTUH (file hero-robot-background.tsx, spline.ts, dan
api/assistant/route.ts tidak berubah; pola pointer-events hero dipertahankan
lewat CSS `.hero-content`; portal chat utuh; typecheck lulus). Yang di bawah
ini poles-nya, urut prioritas. Jalankan satu-satu, review visual tiap habis satu.

## R1 — Sheet-over-hero (signature Dusk yang belum ada)

```
The redesign is missing Dusk's signature transition: the content sheet that
slides over the hero. Currently all sections sit flat inside .site-container
on the page background.

Implement a sheet transition:
- Wrap everything after the hero + skills marquee (About through Contact,
  not the footer) in a sheet container with: background = the paper token,
  border-radius 2.5rem on the top corners, a negative top margin so it
  overlaps the marquee band slightly, position relative with a z-index
  above the hero layers, and a soft top shadow.
- Keep the inner .site-container widths exactly as they are.
- The footer stays OUTSIDE the sheet on the night background (see R3).
- Verify in both themes: in dark mode the sheet uses the dark paper token;
  the overlap must not clip the marquee text or the hero scroll cue.
- Do not touch hero-robot-background.tsx, the Spline scene, or any
  pointer-events rules.
```

## R2 — Cek tabrakan teks hero vs robot (verifikasi dulu, baru ubah)

```
The redesigned hero centers its content (.hero-content is centered), while
the Spline robot framing (zoom/anchor in hero-robot-background.tsx) was
tuned for the previous top-aligned layout.

First, render the hero at 1440px and 390px widths in dark and light mode
and check: does the centered title/name/tagline overlap the robot's head
or torso in a way that hurts readability, beyond what .hero-content::before
scrim already handles?

If there is a real collision, adjust ONLY the hero content layout in
globals.css / hero-section.tsx (e.g. top-aligned content with the robot
anchored lower, or a narrower content column) — never change the robot's
zoom values, canvas transform, or scene. Remove the fragile
padding-top: 220px on .hero-scroll and position the scroll cue with the
hero's flex layout instead. Report what you changed and why.
```

## R3 — Footer finale: wordmark raksasa + horizon glow

```
Upgrade the footer to the Dusk-style finale (see docs/dusk-reference.md):
- The footer sits on the night gradient background with a subtle star
  field and one slow light-beam sweep (respect prefers-reduced-motion).
- Behind the footer content, add a giant outlined wordmark "COVRYZNE"
  (display font, transparent fill, 1px stroke in the lilac/ultra token,
  partially clipped by the bottom edge) with a glowing horizon arc under
  it (radial gradient in the violet token).
- Keep all existing footer links/content and the back-to-top behavior.
- The wordmark is decorative: aria-hidden, pointer-events none, and it
  must never cause horizontal overflow (overflow-x-clip is already on).
```

## R4 — Persist design system (hutang Prompt 1)

```
Prompt 1 asked for a persisted design system but no design-system/ files
were created; the tokens currently live only in globals.css.

Create design-system/MASTER.md documenting the system AS IMPLEMENTED:
the token table (from globals.css, mapped to docs/dusk-reference.md
names), typography (Bricolage Grotesque display, Geist body, Geist Mono
labels), spacing/radius/shadow tokens, the eyebrow label convention
(SYS.XX // SECTION), component patterns (glass pill nav, bracket cards,
spotlight cards, lab-reveal motion, marquee), and the hard contracts
(robot hero, chat portal, API route). Do not change any code in this task.
```

## R5 — Experience: baris aktif mengikuti scroll (opsional, rasa Dusk)

```
In the Experience section (sticky heading + rows already in place), add
the Dusk "reading highlight" behavior: as the user scrolls through the
rows, the row nearest the reading position is fully bright while the
others are dimmed (muted foreground + reduced opacity), with a smooth
transition between states. Use IntersectionObserver with a rootMargin
band around the vertical center; do not add a scroll listener that runs
per frame. Respect prefers-reduced-motion (all rows fully bright).
Keep the row content, numbering, and layout unchanged.
```

## Catatan kecil

- Token periwinkle `#8798f7` dari referensi belum terpakai — pakai untuk
  glow sekunder (mis. horizon footer R3) atau biarkan.
- `src/components/skills.tsx` tidak lagi diimpor page.tsx (digantikan
  skills-marquee) — kandidat dead code, hapus hanya kalau sudah dicek
  tidak ada import lain.
