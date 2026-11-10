# Redesign Prompt Pack — Portfolio "Dusk × AI Lab"

Branch: `redesign-porto` (dari `dev-robot`) · Agent: Codex + UI UX Pro Max skill + 21st MCP
Dokumen ini = brief + prompt siap tempel. Ikuti urutannya; jangan loncat.

---

## 0. Cara pakai

1. Selesaiin setup: `uipro init --ai codex` (di root repo), 21st MCP aktif, Framer MCP aktif.
2. Tempel **Prompt 1** dulu → skill meng-generate design system dan menyimpannya ke
   `design-system/` (Master). Ini kontrak desain kita; semua prompt berikutnya mengacu ke sana.
3. Kerjakan **Prompt 2–7** satu per satu (satu section per prompt). Review hasilnya sebelum lanjut.
4. Terakhir **Prompt 8** (QA/polish global).
5. Aturan emas: **desain boleh berubah total, perilaku tidak.** Lihat bagian "Kontrak yang
   tidak boleh rusak" — itu hasil tuning panjang, jangan diutak-atik agent.

## 1. Konteks project (fakta, bukan inspirasi)

- Website portfolio satu halaman milik **Shendi Teuku Maulana Efendi**, AI Engineer.
  Repo `covryzne/covryznehub`: Next.js 15, React 19, Tailwind CSS 4, komponen gaya shadcn/ui,
  framer-motion, lucide-react. Sudah ada dark/light toggle (next-themes, class strategy).
- Section saat ini (konten JANGAN berubah, hanya tampilan):
  Home (hero) → About → Experience (6 entri) → Projects (4) → Certifications (4) → Contact → Footer.
- Aset utama: **robot 3D Spline** sebagai background hero fullscreen yang mengikuti kursor.
  URL scene ada di `src/lib/spline.ts`; integrasi di `src/app/_sections/hero/hero-robot-background.tsx`.
- Ada chatbot "Ask Shendi Assistant" (`src/components/chat-assitant.tsx` + `src/app/api/assistant/route.ts`,
  Gemini) dengan guardrail scope. Redesign hanya boleh mengganti KULITNYA, bukan perilakunya.

## 2. Inspirasi arah desain (bahan mentah untuk skill)

**Konsep: "Dusk × AI Lab"** — bahasa desain template Dusk (senja gelap, kartu kaca,
tipografi display besar, baris bernomor, day/night mode) diterjemahkan ke tema
**laboratorium AI di malam hari** dengan robot sebagai maskot/centerpiece.

- **Mood:** midnight lab — tenang, presisi, sedikit futuristik; BUKAN neon cyberpunk ramai.
- **Palet (draft, biarkan skill memfinalkan):**
  - Background dark: near-black violet-navy `#07050F`–`#0B0817` (langit senja versi lab)
  - Primary: violet `#8B5CF6` (sudah jadi aksen halo robot saat ini)
  - Secondary: electric cyan `#22D3EE` secukupnya untuk detail "AI" (status dot, garis HUD)
  - Highlight langka: warm amber `#F59E0B` (sisa matahari Dusk) — maksimal 1 elemen per section
  - Light mode: "day lab" — putih keunguan lembut `#F6F5FB`, BUKAN abu-abu flat
- **Tipografi (draft):** display tetap Bricolage Grotesque (sudah di repo) atau Space Grotesk;
  label/eyebrow pakai **mono** (JetBrains Mono / Space Mono) bergaya HUD: `SYS.01 // ABOUT`;
  body Inter/Darker Grotesque. Skill yang memutuskan pairing final.
- **Motif visual:** grid blueprint tipis (echo GridPattern hero sekarang), corner bracket
  pada kartu (seperti frame HUD), garis hairline, glass card dengan tepi bercahaya violet,
  noise sangat tipis. Robot muncul lagi sebagai motif kecil: siluet/watermark samar di
  section Contact atau Footer (opsional, jangan norak).
- **Interaksi:** robot mengikuti kursor (sudah ada), skills **marquee** horizontal di bawah
  hero, scroll reveal (framer-motion), kartu project spotlight-glow mengikuti mouse,
  experience baris bernomor yang expand, counter statistik animasi, hover state jelas di
  semua elemen klik. Hormati `prefers-reduced-motion`.
- **Anti-pattern (larangan keras):** gradasi ungu-pink generik "AI" di semua tempat, emoji
  sebagai ikon (wajib Lucide/SVG), teks kontras rendah, animasi berat yang mengorbankan
  performa Spline, mengarang konten baru.

## 3. Kontrak yang TIDAK boleh rusak (dari dev-robot)

1. Hero: canvas Spline full-bleed di BELAKANG konten; layer konten `pointer-events: none`,
   hanya badge + CTA yang `pointer-events: auto`; zoom kamera runtime per breakpoint
   (0.45 / 0.6 / 0.75) dan canvas bergeser turun — posisi robot SUDAH FINAL, jangan diubah.
2. Mobile: canvas `touch-action: pan-y` (scroll vertikal native; tap/drag menggerakkan robot).
3. Rendering Spline pause saat hero di luar layar (IntersectionObserver play/stop).
4. Chatbot: panel dirender via portal ke `document.body` (harus selalu paling atas);
   API route + guardrail TIDAK diubah logikanya.
5. Outline tipis light-mode pada nama + tagline hero (`.text-outline-hero`) tetap ada
   selama teks masih menimpa robot di light mode.
6. Konten (nama, role, pengalaman, project, sertifikasi, kontak) diambil dari
   komponen/data yang sudah ada — agent TIDAK mengarang data baru.
7. Scene URL di `src/lib/spline.ts` tidak diganti.

---

## Prompt 1 — Generate design system (jalankan pertama)

```
Use the ui-ux-pro-max skill to generate and persist a complete design system for this project.

Visual target: docs/dusk-reference.md contains the design tokens extracted from the Dusk
template's live demo (palette pairs, signature day/night hero gradients, Geist typography,
glass pill nav, floating cards, motion). Treat it as the look to match: start from THOSE
tokens and adapt them to the theme below, instead of inventing a new palette.

Product: personal portfolio website of an AI Engineer (single page, Next.js 15 + Tailwind CSS 4).
Sections: Home hero, About, Experience, Projects, Certifications, Contact, Footer, plus an AI chat assistant widget.

Design direction — "Dusk × AI Lab":
- Evolve the Dusk app template's design language (dark dusk sky, glass cards, oversized display
  typography, numbered feature rows, day/night modes) into a midnight AI-lab theme whose
  centerpiece is an interactive 3D robot in the hero.
- Dark-first (near-black violet-navy background), violet primary, electric cyan as a sparse
  "AI/HUD" accent, one warm amber highlight per section at most. Light mode = soft lavender-white "day lab".
- HUD/lab details: mono-spaced eyebrow labels like "SYS.01 // ABOUT", thin blueprint grid,
  corner-bracket cards, hairline borders. Calm and precise, not busy cyberpunk.
- Typography: strong futuristic display font (Bricolage Grotesque or Space Grotesk), mono for
  labels, clean sans for body.

Deliverables: pattern per section, color tokens (CSS variables, dark + light), typography scale,
spacing/radius, key effects and motion rules, anti-patterns, and a pre-delivery checklist.
Persist the result as the design-system MASTER in design-system/ so every later prompt follows it.
Do NOT change any code yet — design system only.
```

## Prompt 2 — Global shell & tokens

```
Apply the persisted design system (design-system/) to the global shell of this Next.js portfolio:
- Map its color tokens into the existing Tailwind v4 CSS variables in src/app/globals.css for
  both dark (default) and light modes. Keep next-themes class strategy working.
- Set the typography (display / body / mono labels) via the existing font setup in src/app/layout.tsx.
- Restyle the sticky Header and Footer to the new system (glass, hairline borders, mono nav labels).
- Do not touch: hero robot integration, chatbot behavior, section content, or src/lib/spline.ts.
- Acceptance: theme toggle flips both modes cleanly, no contrast below WCAG AA for body text,
  layout width/rhythm consistent with the design system.
```

## Prompt 3 — Home hero (robot tetap raja)

```
Redesign the Home hero (src/app/_sections/hero/hero-section.tsx) using the persisted design system.
- The Spline robot background (src/app/_sections/hero/hero-robot-background.tsx) stays EXACTLY as the
  visual centerpiece: keep its component contract (full-bleed canvas behind content, content
  layer pointer-events-none with pointer-events-auto on badge + CTAs, runtime zoom values,
  downward shift, pause off-screen, touch-action pan-y on mobile). Restyle AROUND it, never
  change its interaction logic or the robot's position/size.
- New hero composition on top of the robot: mono eyebrow label, oversized display headline
  (keep the existing typewriter roles), name, tagline, "Available for work" badge, CTA row
  (Get in touch / Download CV / LinkedIn / GitHub), and a stats row (years of experience,
  projects shipped, code reviews done — take numbers from existing site content, do not invent).
- Add a subtle scroll cue at the bottom.
- Acceptance: robot still follows the cursor everywhere in the hero, all buttons clickable,
  text readable over the robot in BOTH modes (keep the .text-outline-hero treatment in light
  mode), hero is fullscreen (min-h-svh), mobile layout clean at 375px.
```

## Prompt 4 — Skills marquee + About bento

```
Using the persisted design system:
1) Add a skills MARQUEE directly below the hero: an infinite horizontal loop of the owner's
   stack (PyTorch, TensorFlow, scikit-learn, Hugging Face, FastAPI, PostgreSQL, Docker,
   vLLM, React, Next.js, TypeScript, Python — take the list from the existing About/skills
   content) with Lucide/simple SVG icons where sensible, pause on hover, mono labels,
   hairline top/bottom borders. Respect prefers-reduced-motion (static row fallback).
2) Redesign About (src/app/_sections/about/about-section.tsx) as a BENTO grid in the AI-lab style:
   intro card, stats cards, "currently" card, and a personal card (music taste: emo/alt-rock).
   Content from the existing section only — restructure layout, do not rewrite facts.
Acceptance: marquee loops seamlessly at all widths, no horizontal page scroll, bento grid
collapses cleanly to one column on mobile.
```

## Prompt 5 — Experience numbered rows

```
Redesign Experience (src/app/_sections/experience/experience-section.tsx) using the persisted design system,
borrowing the Dusk template's NUMBERED feature-row pattern:
- Each role becomes a numbered row (01–06) with mono index, role, company, period, description,
  and skill chips. Sticky section heading on the left for desktop; rows subtly expand/highlight
  on hover and reveal on scroll (framer-motion).
- All six entries and their text come from the existing section data — layout only.
Acceptance: order and content unchanged, keyboard-focusable rows, mobile stacks cleanly.
```

## Prompt 6 — Projects spotlight cards + Certifications

```
Redesign Projects (src/app/_sections/projects/projects-section.tsx) and Certifications
(src/app/_sections/certifications/certifications-section.tsx) using the persisted design system:
- Projects: large cards (2-col desktop, 1-col mobile) with image/media area, title, description,
  tech chips, and links from existing data. Add a pointer-tracking spotlight glow on cards
  (CSS variables --x/--y), subtle and performant.
- Certifications: compact card grid with issuer and year, mono metadata.
- Content strictly from existing components/data.
Acceptance: no layout shift on hover, glow disabled for touch/reduced-motion, images lazy-loaded.
```

## Prompt 7 — Contact + Chatbot skin

```
Using the persisted design system:
1) Redesign Contact (src/app/_sections/contact/contact-section.tsx) as a Dusk-style support panel:
   big display heading, the existing contact form behaviour preserved, direct contact links
   (email, LinkedIn, GitHub) as glass rows with Lucide icons.
2) Restyle ONLY the appearance of the chat assistant (src/components/chat-assitant.tsx) to
   match: dark glass panel, violet accent, mono header label. HARD CONSTRAINTS: the panel must
   stay rendered through the React portal to document.body with its current z-index, and
   src/app/api/assistant/route.ts must not change at all (behavior + guardrails are final).
Acceptance: chat opens above everything at any scroll position, form validation/flows unchanged.
```

## Prompt 8 — QA & polish global

```
Final QA pass for the redesign against the persisted design system:
- Check every section at 375 / 768 / 1024 / 1440 px, dark + light.
- Verify: hero robot interaction (cursor follow, mobile tap/drag, pause off-screen), marquee
  smoothness, no horizontal scroll, focus states visible, body-text contrast >= 4.5:1,
  prefers-reduced-motion respected, images/icons are SVG (no emojis as icons).
- Run typecheck and lint; fix what you broke. Summarize remaining issues instead of hiding them.
```

---

## Catatan buat Shendi (bukan buat agent)

- Prompt sengaja bahasa Inggris: database skill (style/palet/pattern) berbahasa Inggris,
  hasil pencariannya lebih akurat. Brief & kontrak tetap gue tulis Indonesia biar lu gampang review.
- Kalau hasil Prompt 1 (design system) terasa melenceng dari bayangan lu, JANGAN lanjut ke
  Prompt 2 — revisi dulu design system-nya; semua section ngacu ke situ.
- Palet & font di Bagian 2 itu draft gue dari pengalaman dev-robot (violet = halo robot yang
  udah terbukti cocok). Skill boleh memfinalkan beda, asal mood-nya tetap "Dusk × AI Lab".
- Framer MCP tidak dipakai di prompt pack ini: dia mengedit project Framer, bukan repo ini.
  Simpan buat prototyping kalau suatu saat perlu.
