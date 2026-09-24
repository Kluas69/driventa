# BRAIN.md — Driventa Web

> **Complete project knowledge base. Read this before making any changes.**

---

## 1. Project Overview

**Driventa** is a premium truck dispatch service website targeting US owner-operators and small fleets. It's a single-page marketing site with a clean, modern, trust-building aesthetic.

| Property | Value |
|----------|-------|
| **Framework** | Next.js 16.3.3 (App Router, Turbopack) |
| **React** | 19.2.8 |
| **Styling** | Tailwind CSS v4 (CSS-first config, `@theme` blocks) |
| **Language** | TypeScript 5 (strict mode) |
| **Font Stack** | Plus Jakarta Sans (display) · Inter (body) · JetBrains Mono (data/code) |
| **Package Manager** | npm |
| **Linting** | ESLint 9 with `eslint-config-next` (core-web-vitals + typescript) |

**Core Value Prop:** "Keep Your Trucks Moving. We'll Handle the Dispatch."

---

## 2. Architecture

### File Structure

```
driventa-web/
├── app/
│   ├── layout.tsx          # Root layout: <html>, fonts, Header, Footer
│   ├── page.tsx            # Homepage: Hero → TrustStrip → Services → Equipment
│   └── globals.css         # Design tokens + base + utilities (Tailwind v4)
├── components/
│   ├── layout/
│   │   ├── header.tsx      # Sticky header with mega-menus, mobile drawer
│   │   ├── footer.tsx      # 5-column footer with socials
│   │   └── mobile-cta-bar.tsx  # Sticky bottom CTA for mobile
│   ├── sections/
│   │   ├── hero.tsx        # Hero with dispatch panel illustration
│   │   ├── services.tsx    # 8-service grid
│   │   ├── equipment.tsx   # 7 equipment cards with truck illustrations
│   │   └── trust-strip.tsx # 5-item trust bar
│   ├── ui/
│   │   ├── button.tsx      # Polymorphic button (as link or button)
│   │   ├── container.tsx   # Centered content wrapper
│   │   ├── icon.tsx        # 50+ inline SVG icons (24×24, 1.5px stroke)
│   │   ├── logo.tsx        # Brand mark + wordmark
│   │   ├── reveal.tsx      # Scroll-reveal animation wrapper
│   │   ├── section.tsx     # Full-width section with tone variants
│   │   └── section-heading.tsx  # Eyebrow + heading + description
│   └── illustrations/
│       ├── dispatch-panel.tsx    # Dark dispatch dashboard mockup
│       ├── truck-illustration.tsx # 7 truck type SVGs
│       └── route-map.tsx         # Animated route SVG
├── lib/
│   ├── content.ts          # ALL site content (copy, data, config)
│   ├── site.ts             # Brand, contact, CTA config
│   ├── types.ts            # TypeScript interfaces + IconName union
│   ├── utils.ts            # cn() classnames helper
│   ├── jsonld.ts           # JSON-LD structured data (SEO)
│   └── hooks/
│       ├── use-scrolled.ts # Scroll position tracker
│       ├── use-in-view.ts  # IntersectionObserver hook
│       └── use-count-up.ts # Animated counter
├── public/                 # Static assets (favicon, SVGs)
├── next.config.ts          # Next.js config (empty/default)
├── tsconfig.json           # TypeScript config
├── postcss.config.mjs      # PostCSS with @tailwindcss/postcss
└── eslint.config.mjs       # ESLint config
```

### Architecture Pattern: **Content-Presentation Separation (MVVM-ish)**

- **Model:** `lib/content.ts` + `lib/site.ts` — all data and copy
- **Types:** `lib/types.ts` — shared contracts
- **View:** `components/` — presentational components read from content
- **ViewModel:** Custom hooks in `lib/hooks/` — bridge data to UI

**Rule:** Components NEVER hardcode copy or data. Always import from `lib/content.ts` or `lib/site.ts`.

---

## 3. Design System

### Color Palette

```css
/* Brand: Navy (dark surfaces) */
--color-navy-deep: #060c19;    /* Deepest background */
--color-navy: #0a1327;         /* Dark sections */
--color-navy-700: #0f1c38;     /* Cards on dark */
--color-navy-600: #16294b;     /* Elevated dark */
--color-navy-500: #1f3a63;     /* Borders on dark */

/* Accent: Electric Blue */
--color-accent: #2563eb;       /* Primary CTA */
--color-accent-strong: #1d4ed8; /* Hover state */
--color-accent-soft: #7ea6ff;  /* Light accent text */
--color-accent-glow: #3b82f6;  /* Glows, pulses */
--color-sky: #38bdf8;          /* Secondary accent */

/* Neutrals (light surfaces) */
--color-ink: #0a0f1a;          /* Primary text */
--color-paper: #ffffff;        /* Page background */
--color-mist: #f6f8fb;         /* Alt section bg */
--color-mist-200: #eef2f7;     /* Card alt bg */
--color-line: #e5e9f0;         /* Borders */
--color-line-strong: #d5dbe6;  /* Strong borders */
--color-muted: #55627a;        /* Secondary text */

/* Feedback */
--color-positive: #22c55e;     /* Success states */
--color-amber: #f5a524;        /* Warning (sparse) */
```

### Typography

| Role | Font | CSS Variable |
|------|------|-------------|
| Body | Inter | `--font-sans` |
| Display headings | Plus Jakarta Sans | `--font-display` |
| Mono / code / kickers | JetBrains Mono | `--font-mono` |

### Spacing & Layout

- **Container:** `container-page` — max-width 1280px, responsive gutters (20/32/40px)
- **Section rhythm:** `py-20 md:py-28` (80/112px vertical padding)
- **Border radius:** `lg: 0.75rem`, `xl: 1rem`, `2xl: 1.375rem`, `3xl: 1.75rem`

### Elevation (Shadow Scale)

```css
--shadow-soft:    0 1px 2px rgba(10,19,39,0.04), 0 8px 24px -12px rgba(10,19,39,0.14);
--shadow-card:    0 1px 3px rgba(10,19,39,0.05), 0 18px 40px -22px rgba(10,19,39,0.28);
--shadow-lift:    0 2px 6px rgba(10,19,39,0.06), 0 30px 60px -28px rgba(10,19,39,0.36);
--shadow-accent:  0 16px 40px -16px rgba(37,99,235,0.5);
```

### Motion

```css
--ease-out-soft: cubic-bezier(0.22, 0.61, 0.36, 1);
--ease-out-back: cubic-bezier(0.34, 1.4, 0.64, 1);
```

**Scroll reveal:** `.reveal` class with `--reveal-delay` for staggering. Only activates under `.js` class (progressive enhancement).

---

## 4. Components Reference

### UI Components (`components/ui/`)

| Component | Props | Notes |
|-----------|-------|-------|
| `Button` | `variant`, `size`, `href`, `trailingIcon`, `leadingIcon`, `fullWidth` | Polymorphic: renders `<a>` if `href` given, `<button>` otherwise |
| `Container` | `children`, `className` | Wraps content in `container-page` |
| `Icon` | `name: IconName`, `size`, all SVG props | 50+ inline SVGs, no icon fonts |
| `Logo` | `variant`, `withWordmark`, `markSize` | SVG brand mark + optional wordmark |
| `Reveal` | `as`, `delay`, `className` | Scroll-reveal wrapper, uses `useInView` |
| `Section` | `id`, `tone`, `bare`, `className` | Full-width section with Container |
| `SectionHeading` | `eyebrow`, `title`, `description`, `align`, `tone` | Standard section header pattern |

### Button Variants

| Variant | Use Case |
|---------|----------|
| `primary` | Main CTA (blue bg, white text) |
| `secondary` | Alt CTA (white bg, navy text, border) |
| `outline` | Tertiary actions |
| `onDark` | CTAs on dark backgrounds |
| `onDarkOutline` | Secondary CTAs on dark backgrounds |
| `ghost` | Inline text links |

### Button Sizes

| Size | Height | Padding | Text |
|------|--------|---------|------|
| `sm` | 40px | 16px | 14px |
| `md` | 48px | 20px | 15.2px |
| `lg` | 56px | 28px | 16px |

### Section Tones

| Tone | Background | Text |
|------|-----------|------|
| `paper` | White (#fff) | Dark |
| `mist` | #f6f8fb | Dark |
| `navy` | #0a1327 | White |
| `navy-deep` | #060c19 | White |

### Layout Components

| Component | File | Notes |
|-----------|------|-------|
| `Header` | `layout/header.tsx` | Fixed, shrink on scroll, mega-menus, mobile drawer |
| `Footer` | `layout/footer.tsx` | 5-column grid, social links, contact info |
| `MobileCtaBar` | `layout/mobile-cta-bar.tsx` | Sticky bottom bar, hides near #contact |

### Section Components

| Section | File | Content Source |
|---------|------|---------------|
| `Hero` | `sections/hero.tsx` | `hero` from content.ts |
| `TrustStrip` | `sections/trust-strip.tsx` | `trustItems` from content.ts |
| `Services` | `sections/services.tsx` | `services` from content.ts |
| `Equipment` | `sections/equipment.tsx` | `equipment` from content.ts |

### Illustration Components

| Component | Description |
|-----------|-------------|
| `DispatchPanel` | Dark dashboard mockup with route map, metrics, status |
| `TruckIllustration` | 7 truck types (dry-van, reefer, flatbed, step-deck, box-truck, hotshot, power-only) |
| `RouteMap` | Animated dashed route SVG |

---

## 5. Content Structure (`lib/content.ts`)

All site copy lives here. Every section imports from this file.

| Export | Type | Used By |
|--------|------|---------|
| `nav` | `NavItem[]` | Header (with mega-menus) |
| `hero` | Object | Hero section |
| `trustItems` | `TrustItem[]` | TrustStrip |
| `services` | `Service[]` | Services section |
| `equipment` | `Equipment[]` | Equipment section |
| `benefits` | `Benefit[]` | (Not yet rendered) |
| `steps` | `Step[]` | (Not yet rendered — "How It Works") |
| `stats` | `Stat[]` | (Not yet rendered) |
| `operations` | Object | DispatchPanel illustration |
| `testimonials` | `Testimonial[]` | (Not yet rendered) |
| `pricing` | Object | (Not yet rendered) |
| `about` | Object | (Not yet rendered) |
| `faqs` | `FaqItem[]` | (Not yet rendered + JSON-LD) |
| `finalCta` | Object | (Not yet rendered) |
| `contact` | Object | (Not yet rendered) |
| `contactSelects` | `SelectField[]` | (Not yet rendered) |
| `footerColumns` | `FooterColumn[]` | Footer |

### Sections Not Yet Built

These have content defined but no section component:
- `benefits` — Why choose us (8 items)
- `steps` — How it works (5 steps)
- `stats` — Metrics with count-up
- `testimonials` — Customer reviews
- `pricing` — Pricing card
- `about` — About section
- `faqs` — FAQ accordion
- `finalCta` — Final CTA banner
- `contact` — Application form

---

## 6. Site Config (`lib/site.ts`)

```typescript
site = {
  name: "Driventa",
  legalName: "Driventa Dispatch Services",
  tagline: "Your trucks keep moving. We handle the dispatch.",
  description: "...", // SEO meta description
  url: "https://www.driventa.com",
  phone: { display: "(703) 594-6995", href: "tel:+17035946995" },
  email: "dispatch@driventa.com",
  supportHours: "24/7 dispatch support",
  areaServed: "United States",
  socials: [...],
  cta: {
    primary: { label: "Get Started", href: "#contact" },
    secondary: { label: "See How It Works", href: "#how-it-works" },
    call: { label: "Call Us", href: "tel:+17035946995" },
    apply: { label: "Start My Application", href: "#contact" },
  },
}
```

**⚠️ PLACEHOLDERS:** Phone, email, social links, and production domain need replacement before launch.

---

## 7. Icons

**50+ custom inline SVG icons** in `components/ui/icon.tsx`.

| Category | Icons |
|----------|-------|
| Services | search, handshake, headset, clipboard-check, route, document, clock, activity |
| Vehicle | truck, steering-wheel, snowflake, box, deck, flatbed, power |
| UI | menu, close, chevron-down, arrow-right, arrow-up-right, check, spinner |
| Social | linkedin, facebook, instagram, x-social |
| Other | phone, mail, map-pin, star, quote, dollar, target, layers, bolt, eye, lifebuoy, shield-check |

**Rules:**
- All icons are 24×24 viewBox, 1.5px stroke, `currentColor`
- No icon fonts, no emoji as icons
- Always add `aria-hidden="true"` (decorative by default)
- For new icons: add `IconName` to `lib/types.ts`, add SVG path to `icon.tsx`

---

## 8. Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useScrolled(threshold)` | `use-scrolled.ts` | Returns `true` when page scrolled past threshold |
| `useInView(options)` | `use-in-view.ts` | Returns `{ ref, inView }` for IntersectionObserver |
| `useCountUp(target, active, duration)` | `use-count-up.ts` | Animated number counter (respects reduced-motion) |

---

## 9. SEO & Structured Data

`lib/jsonld.ts` generates JSON-LD for:
- **Organization** — company info, contact, socials
- **WebSite** — site metadata
- **Service** — dispatch service with offer catalog
- **FAQPage** — eligible for rich results

**Note:** Not currently rendered in layout. Needs `<script type="application/ld+json">` added.

---

## 10. CSS Utilities & Animations

| Class | Purpose |
|-------|---------|
| `container-page` | Centered content (max 1280px, responsive gutters) |
| `kicker` | Uppercase mono label (eyebrow text) |
| `tnum` | Tabular figures for metrics |
| `bg-grid-dark` | Blueprint grid for dark sections |
| `bg-grid-light` | Subtle grid for light sections |
| `glow-accent` | Radial blue spotlight |
| `mask-fade-b` | Fade-to-transparent bottom mask |

| Animation | Class | Speed |
|-----------|-------|-------|
| Float (slow) | `float-slow` | 6s ease-in-out infinite |
| Float (slower) | `float-slower` | 8.5s ease-in-out infinite |
| Pulse dot | `pulse-dot` | 2.2s ease-out infinite |
| Route flow | `route-flow` | 24s linear infinite |
| Marquee | `marquee-track` | 34s linear infinite |

**All animations respect `prefers-reduced-motion: reduce`** — they either snap to final state or use 0.01ms duration.

---

## 11. Key Conventions

### Code Style
- **No comments** unless explicitly requested
- **Functional components only** (no class components)
- **`"use client"` directive** on all client components
- **Path aliases:** `@/` maps to project root (e.g., `@/lib/content`)
- **TypeScript strict mode** — all props typed, no `any`

### Component Patterns
- Components import from `@/lib/content` for data
- Components import from `@/lib/utils` for `cn()`
- Components use `cn()` for conditional classnames
- Components accept `className` prop for composition
- Icons always use `<Icon name="..." />` component

### Adding New Sections
1. Define content data in `lib/content.ts`
2. Add types in `lib/types.ts` if needed
3. Create section component in `components/sections/`
4. Import and add to `app/page.tsx`

### Adding New Icons
1. Add name to `IconName` union in `lib/types.ts`
2. Add SVG path to `paths` record in `components/ui/icon.tsx`

---

## 12. Placeholder Warnings

**These are clearly marked in the code — do NOT treat as real data:**

| Data | Location | Status |
|------|----------|--------|
| Phone number | `lib/site.ts` | `+17035946995` |
| Email | `lib/site.ts` | `dispatch@driventa.com` |
| Social links | `lib/site.ts` | Placeholder URLs |
| Production URL | `lib/site.ts` | `https://www.driventa.com` |
| Stats | `lib/content.ts` | 500+ loads, 100+ carriers, etc. (illustrative) |
| Testimonials | `lib/content.ts` | "Placeholder review" text |
| Pricing | `lib/content.ts` | "Custom" with placeholder note |

---

## 13. Accessibility

- **Keyboard focus:** 3px solid accent blue, 2px offset, 4px radius
- **Reduced motion:** All animations disabled, scroll-behavior auto
- **Screen readers:** Icons hidden with `aria-hidden="true"`, semantic HTML
- **Mobile menu:** Escape key closes, body scroll locked when open
- **Section IDs:** All sections have `id` for skip navigation (`#services`, `#equipment`, etc.)

---

## 14. Performance Notes

- **No external images** — all illustrations are inline SVG
- **No icon fonts** — custom SVGs bundled
- **Progressive enhancement** — `.reveal` animations only active with JS
- **Turbopack** dev server for fast HMR
- **Font loading:** Google Fonts via `next/font/google` (auto-optimized)
- **CSS-first Tailwind** — no `tailwind.config.js` needed

---

## 15. Development Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---

## 16. Common Tasks

### Add a new section
```typescript
// 1. Add content to lib/content.ts
export const myNewSection = { ... };

// 2. Create component in components/sections/my-section.tsx
import { myNewSection } from "@/lib/content";

export function MySection() {
  return <Section id="my-section" tone="paper">...</Section>;
}

// 3. Add to app/page.tsx
import { MySection } from "@/components/sections/my-section";
// Then add <MySection /> in the JSX
```

### Add a new icon
```typescript
// 1. Add to IconName in lib/types.ts
export type IconName = "existing-icon" | "new-icon";

// 2. Add SVG path in components/ui/icon.tsx
const paths: Record<IconName, ReactNode> = {
  // existing...
  "new-icon": <path d="..." />,
};
```

### Add a new page
```typescript
// Create app/my-page/page.tsx
export default function MyPage() {
  return <Section id="my-page">...</Section>;
}
// It's automatically available at /my-page
```

---

*Last updated: 2026-08-26*
