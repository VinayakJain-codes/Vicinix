# Vicinix Website — Full Build Plan
**Brand:** Vicinix | **Builder:** Vinayak Jain  
**Aesthetic:** Cinematic Dark + Neon Green & Orange pops  
**Stack:** Next.js 14, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Three.js/WebGL, CSS + Intersection Observer  
**Goal:** Attract freelance clients — every pixel sells

---

## Design Language

### Color System
```
--bg-primary:     #080808       /* near-black canvas */
--bg-surface:     #0f0f0f       /* card/section surfaces */
--bg-elevated:    #141414       /* hover / elevated states */
--accent-orange:  #f97316       /* Vicinix brand — CTAs, highlights */
--accent-green:   #22c55e       /* neon pulse — DNA, online indicators */
--text-primary:   #f5f5f5
--text-muted:     #6b7280
--border-subtle:  rgba(255,255,255,0.06)
--glow-orange:    0 0 40px rgba(249,115,22,0.25)
--glow-green:     0 0 40px rgba(34,197,94,0.20)
```

### Typography
- **Display / Hero:** `Bebas Neue` or `Monument Extended` — tall, cinematic, commanding
- **Subheadings:** `Syne` — geometric, modern agency feel
- **Body:** `DM Sans` — clean, readable, premium
- **Mono / Code labels:** `JetBrains Mono` — for tech tags, stack labels

### Motion Philosophy
- **Scroll = camera.** Every section is a scene. GSAP ScrollTrigger drives the narrative.
- **DNA animation** lives in the Hero — Three.js double-helix, orange + green strands.
- **Videography-style transitions** — horizontal wipes, letterbox bars, film grain overlay.
- **Intersection Observer** for lightweight reveal animations on cards and text.
- **No bounce. No spring.** Everything eases with `power3.out` or `expo.inOut`.

---

## Site Architecture

```
/
├── <Navbar />              — sticky blur nav
├── <Hero />                — DNA + scroll storytelling
├── <Services />            — 6-service cinematic grid
├── <Portfolio />           — 4-project showcase
├── <Contact />             — email CTA + ambient scene
└── <Footer />              — minimal
```

---

## Section-by-Section Breakdown

---

### 1. Navbar

**Layout:** Full-width sticky, `backdrop-blur-xl`, 64px height  
**Left:** `VICINIX` wordmark in Bebas Neue, orange accent on the dot or slash  
**Right:** `Services` `Work` `Contact` in Syne — no underlines, just opacity hover  
**CTA pill:** `→ Let's Build` — orange border, transparent fill, fills on hover  

**Animation:**
- Enters with a 0.6s slide-down + fade on page load
- On scroll down: shrinks to 48px, wordmark scales to 0.85, nav items fade to 60% opacity
- On scroll up: restores fully — GSAP ScrollTrigger `toggleActions`

---

### 2. Hero

**The most important scene. Full viewport.**

#### Layout
```
[  DNA Canvas — right 50% of viewport, full height, z-index 0  ]
[  Left 50%: Text stack, vertically centered                    ]
```

#### DNA Animation (Three.js)
- Double helix, ~40 base pairs visible
- Left strand: `#f97316` (orange) — particles + connecting rods
- Right strand: `#22c55e` (neon green)
- Slow continuous rotation on Y axis (0.003 rad/frame)
- On scroll: helix stretches vertically, strands separate, particles scatter — reveals next section
- Mouse parallax: subtle helix tilt follows cursor (±5deg)
- Ambient glow bloom behind helix via `THREE.PointLight`

#### Text Content
```
Line 1 (label):   [ • Available for projects ]   — green dot pulses
Line 2 (H1):      YOUR IDEA,
Line 3 (H1):      SHIPPED.
Line 4 (body):    We design and engineer digital products that
                  don't just work — they convert.
Line 5 (CTA):     [ → Start a Project ]   [ View Work ↓ ]
```

**Scroll Storytelling — Hero to Services:**
- GSAP ScrollTrigger pin: Hero is pinned for 150vh of scroll
- 0–50% scroll: DNA helix scales up, text fades out letter by letter
- 50–100% scroll: helix explodes into particle field, each particle flies to become a service icon
- Unpin → Services section snaps into view with letterbox black bars (cinematic cut)

---

### 3. Services

**6 services. Cinematic grid. Scroll-driven.**

#### Services List
1. Web Development
2. UI/UX Design
3. Full-Stack Products
4. Landing Pages
5. SaaS Dashboards
6. E-commerce

#### Layout
- 2-column grid on desktop, 1-column mobile
- Each card: `border-[--border-subtle]` dark glass card
- Card left edge: 3px vertical bar — alternates orange / green per card
- Icon: custom SVG line icon, 32px, accent colored
- Title in Syne, body in DM Sans
- Bottom-right: `→` arrow that slides in on hover

#### Scroll Animation
- Cards enter staggered from bottom (GSAP `stagger: 0.12s`, `y: 60 → 0`)
- On hover: card background shifts to `#141414`, border bar glows (`box-shadow`)
- Section heading: **"WHAT WE BUILD"** — letters split and wipe in from left, one by one

#### Section Transition
- Before Services ends: a horizontal orange line sweeps full width (1.5s) — acts as a visual "cut" to Portfolio

---

### 4. Portfolio / Work

**4 projects. Full storytelling treatment.**

#### Projects (in order)
1. **Marketnera** — Hyperlocal commerce platform
2. **Vicinix Portfolio** — Personal dev portfolio
3. **Presence Guard** — Python OpenCV AI monitoring tool
4. **Outfevibe** — AI fashion SaaS (founding engineer)

#### Layout: Alternating full-bleed rows
Each project = full viewport width row, ~80vh tall
```
Project 1:  [ Visual/mockup left 55% ]  [ Text right 45% ]
Project 2:  [ Text left 45% ]           [ Visual/mockup right 55% ]
... alternating
```

#### Per-Project Text Block
```
Number:     01
Tag:        [ SaaS ] [ Next.js ] [ Supabase ]   — pill badges
Title:      MARKETNERA
Sub:        Hyperlocal commerce for Tier 2/3 India
Body:       2–3 lines. What it does. What was built.
Link:       → View Project  (external or disabled with "NDA")
```

#### Visual Treatment
- Project mockup in a dark device frame (custom CSS browser chrome or phone frame)
- Background: very subtle radial gradient in project's accent color at 5% opacity
- On scroll-enter: device frame slides in from the edge, text fades up

#### Scroll Animation (GSAP ScrollTrigger per row)
- Each row is pinned for 80vh
- Mockup: `x: 100px → 0`, `opacity: 0 → 1`, ease `expo.out`
- Number counter: animates from `00` to `01`, `02` etc. as section enters
- Tags: stagger pop-in with scale `0.8 → 1` + fade

#### Section Heading
**"WORK"** — enormous background text (opacity 4%) behind the rows, creates depth

---

### 5. Contact / CTA

**The closing scene. Ambient and intentional.**

#### Layout: Full viewport, centered
```
Top label:       Ready to build something real?
H2:              LET'S MAKE IT
H2 (accent):     HAPPEN.
Body:            Drop an email. I'll respond within 24 hours.
CTA:             [ vinayakjain@vicinix.co.in → ]
Sub-CTA:         Or find me on LinkedIn  ↗
```

#### Visual: Ambient particle field
- CSS `@keyframes` particle system — 60–80 small dots
- Colors: mix of orange and green, random opacity/size
- Slow drift upward, looping — cinematic fog effect
- No Three.js needed here — pure CSS performance

#### Animation
- Section enters with a slow zoom-out from black (scale `1.08 → 1`, 1.2s)
- H2 lines split-reveal with a horizontal mask wipe (CSS `clip-path` animation)
- Email CTA: orange underline draws itself left-to-right on hover (CSS `scaleX`)
- After hover: subtle orange glow pulse on the entire CTA

---

### 6. Footer

**Minimal. Intentional.**

```
Left:    VICINIX © 2025
Center:  Made by Vinayak Jain · Meerut, India
Right:   [ LinkedIn ] [ GitHub ] [ Email ]
```

- 1px top border, `--border-subtle`
- Text all in `--text-muted`, icons in white on hover
- No extra padding bloat — tight, editorial

---

## Global Animation Details

### Film Grain Overlay
- Full-viewport `<canvas>` or SVG `feTurbulence` filter, fixed, z-index top, pointer-events none
- Opacity: 3–5% — barely visible but adds cinematic texture
- Animates subtly (noise seed shifts every 3 frames)

### Custom Cursor
- Default: 8px white dot
- On hover (links/CTAs): expands to 40px ring + dot, orange tint
- On text hover: morphs to vertical line (text cursor aesthetic)
- GSAP `ticker` drives cursor position (no CSS transition lag)

### Page Load Sequence
```
0.0s   Black screen
0.2s   VICINIX wordmark fades in (center screen)
0.8s   Wordmark slides to nav position
1.0s   Hero text begins stagger-in
1.2s   DNA canvas fades in with helix growing from center
1.6s   Nav items slide in from right
```

### Scroll Progress Indicator
- 2px orange line at very top of viewport
- Grows from 0% → 100% width as user scrolls to bottom
- CSS only — `scaleX` driven by scroll event listener

---

## Tech Stack & File Structure

```
vicinix.co.in/
├── app/
│   ├── layout.tsx          — fonts, cursor, grain overlay, scroll indicator
│   ├── page.tsx            — section assembly
│   └── globals.css         — CSS variables, grain keyframes, cursor styles
├── components/
│   ├── Navbar.tsx
│   ├── Hero/
│   │   ├── HeroText.tsx
│   │   └── DNACanvas.tsx   — Three.js helix
│   ├── Services/
│   │   ├── ServicesGrid.tsx
│   │   └── ServiceCard.tsx
│   ├── Portfolio/
│   │   ├── PortfolioSection.tsx
│   │   └── ProjectRow.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── GrainOverlay.tsx
│       ├── CustomCursor.tsx
│       └── ScrollProgress.tsx
├── lib/
│   ├── gsap.ts             — GSAP + ScrollTrigger registration
│   └── projects.ts         — project data array
└── public/
    └── fonts/              — Bebas Neue, Syne, DM Sans, JetBrains Mono
```

---

## Build Phases

| Phase | Scope | Est. Time |
|---|---|---|
| 1 | Setup: Next.js, Tailwind, fonts, CSS vars, grain, cursor | 1 day |
| 2 | Navbar + Hero text layout | 0.5 day |
| 3 | DNA Three.js canvas | 1 day |
| 4 | Hero GSAP scroll pin + particle scatter | 1 day |
| 5 | Services section + card animations | 0.5 day |
| 6 | Portfolio rows + per-project scroll animation | 1.5 days |
| 7 | Contact section + particle field | 0.5 day |
| 8 | Footer + scroll progress + polish pass | 0.5 day |
| 9 | Performance audit (Lighthouse), mobile QA | 1 day |
| **Total** | | **~7 working days** |

---

## Performance Guardrails

- Three.js DNA canvas: `requestAnimationFrame` throttled to 45fps on mobile, canvas hidden on `prefers-reduced-motion`
- GSAP: kill all ScrollTriggers on component unmount
- Fonts: `next/font` with `display: swap`
- Images: `next/image` with WebP, lazy load
- Film grain: CSS-only on mobile (no canvas grain)
- Target: Lighthouse Performance ≥ 90 on desktop, ≥ 75 on mobile

---

## Key Design Decisions Summary

| Decision | Choice | Reason |
|---|---|---|
| Hero anchor | DNA helix | Signals "living system", tech depth, memorable |
| Color pairing | Orange + Green on black | Vicinix brand + neon energy, no other agency does this combo |
| Scroll behavior | Cinematic pin + scene cuts | Treats visitor like a viewer, not a scroller |
| Portfolio layout | Alternating full-bleed rows | Premium agency feel, projects feel massive |
| Contact CTA | Email only, no form | Direct, no friction, personal — fits solo freelance positioning |
| Font choice | Bebas Neue + Syne + DM Sans | Cinematic (Bebas) + modern agency (Syne) + readable (DM Sans) |
