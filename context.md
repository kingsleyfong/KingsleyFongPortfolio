# Portfolio Website — Project Context

> Persistent reference document so any AI assistant can pick up exactly where work left off.

## Owner

**Kingsley Fong** — personal portfolio site.

## Tech Stack

| Layer          | Choice                                           |
| -------------- | ------------------------------------------------ |
| Framework      | **Next.js 16.1.6** (App Router, `src/` directory) |
| Language       | TypeScript 5                                     |
| UI             | React 19.2.3                                     |
| Styling        | Tailwind CSS v4 + PostCSS (`@tailwindcss/postcss`) |
| 3D             | **Spline** (`@splinetool/react-spline` ^4.1.0 + `@splinetool/runtime` ^1.12.58) |
| Animation      | Framer Motion ^12.34.2                           |
| Icons          | Lucide React ^0.575.0                            |
| CMS            | Sanity (`next-sanity` ^12.1.0) — not yet connected; **mock data** fallback active |
| Helpers        | `clsx` + `tailwind-merge` (`cn()` utility)       |
| Fonts          | Inter (sans) + Playfair Display (serif) via `next/font/google` |

## Repo / Directory Layout

```
c:\Users\Kingsley\Documents\PortfolioWebsite\
└── portfolio/                      ← Next.js root
    ├── public/                     ← static assets (default SVGs only)
    ├── src/
    │   ├── app/
    │   │   ├── globals.css         ← Tailwind v4 theme, spatial colors, Spline watermark CSS hides, keyframes
    │   │   ├── layout.tsx          ← RootLayout (Inter + Playfair, dark html, <body> classes)
    │   │   └── page.tsx            ← Main single-page app (Home)
    │   ├── components/
    │   │   ├── ProjectGrid.tsx     ← Fetches projects from Sanity (or mock), renders cards
    │   │   └── ui/
    │   │       ├── GlassCard.tsx   ← Glassmorphism card wrapper (glass-panel class)
    │   │       └── SplineScene.tsx ← Reusable Spline wrapper (loading spinner, interactive toggle)
    │   ├── lib/
    │   │   └── utils.ts            ← cn() helper
    │   └── sanity/
    │       ├── types.ts            ← Project interface
    │       ├── lib/client.ts       ← Sanity client w/ mock fallback
    │       └── data/mock.ts        ← 3 placeholder projects (Spatial Dashboard, Neon Ecommerce, AI Architect)
    ├── next.config.ts              ← image remotePatterns: cdn.sanity.io, images.unsplash.com
    ├── package.json
    └── tsconfig.json
```

## Architecture & Key Design Decisions

### Phase 2 Immersive Layout Features
- **Vertical Experience Timeline**: Replaced static skills cards with a dynamic vertical timeline. Active/latest roles feature a pulsating ambient halo indicator.
- **Full-Bleed Projects Tape**: The `ProjectTicker` infinite loops horizontally and bleeds seamlessly off the right side of the screen. Directly below it is a synchronous horizontal timeline displaying proper formatted dates (Month Year). Clicking a project auto-paginates and smooth-scrolls to the `100dvh` interactive layout.
- **Dynamic Projects Pagination**: To prevent DOM bloat, projects are lazy-rendered (initially 3). The Sidebar dynamically observes and creates navigation dots for newly spawned projects on the fly using a dynamically calculated mapping.
- **Fullscreen Interactive Projects**: `InteractiveProjectCard` acts as a `100dvh` fullscreen section. Left side: massive media window that auto-cycles `What`, `How`, `Results` every 5 seconds. Right side: stacked textual hierarchy (Challenge, Approach, Impact) with date, categories, and a 3-column Specifications spec array.

### Dual Spline 3D Scenes (page.tsx)

| Layer    | z-index | What                                                                 |
| -------- | ------- | -------------------------------------------------------------------- |
| Background | z-0   | **Portfolio Scene** — full interactive Spline (`iLum5mWoeK9lapML`)   |
| Middle     | z-3   | **Robot Character** — ambient Spline (`t3k7oPsl0Z1W5ywo`), non-interactive, `mix-blend-multiply`, `opacity-50`, `translate-y-[15%]` |
| UI         | z-10  | Content overlays (Projects grid, About/Contact cards)                |
| Sidebar    | z-50  | Invisible sidebar overlay — clickable areas for navigation           |
| Header     | z-100 | "Kingsley Fong" centered name + "Kingsley // Portfolio" logo pill    |

### Navigation

- Single-page SPA with `useState<Section>('home')` managing `home | projects | about | contact` views.
- **Invisible sidebar** (left 2%, top 100px, five stacked click zones) maps to sections.
- Home/logo pill resets to `home`. `X` buttons close overlays.

### Spline Watermark Hiding

CSS in `globals.css` hides all known Spline badge selectors (`a[href^="https://spline.design"]`, `#n-spline-badge`, `canvas+a`, etc.) via `display:none !important`.

### Glassmorphism Design System

- `glass-panel` class in `globals.css` — semi-transparent bg, 20px blur, subtle border + shadow.
- `GlassCard` component wraps it with hover scale + opacity effects.
- Spatial color tokens: `--color-spatial-glass`, `--color-spatial-glass-hover`, `--color-spatial-border`.

### CMS Strategy

- Sanity client created only if `NEXT_PUBLIC_SANITY_PROJECT_ID` env var exists.
- Otherwise gracefully falls back to `mockProjects` (3 dummy projects with Unsplash images).
- `Project` type: `_id, title, slug, description (Portable Text), mainImage { asset.url, alt }, tags[], links { demo?, github? }`.

## Spline Scene URLs

| Scene        | URL                                                                  |
| ------------ | -------------------------------------------------------------------- |
| Portfolio BG | `https://prod.spline.design/iLum5mWoeK9lapML/scene.splinecode`      |
| Robot Char   | `https://prod.spline.design/t3k7oPsl0Z1W5ywo/scene.splinecode`      |

## Commands

| Action       | Command        | Notes                  |
| ------------ | -------------- | ---------------------- |
| Dev server   | `npm run dev`  | From `portfolio/` dir  |
| Build        | `npm run build`|                        |
| Start        | `npm run start`|                        |
| Lint         | `npm run lint` |                        |

## Git State

- Single branch: **master**
- Only 1 commit: `5e7b161 Initial commit from Create Next App`
- Uncommitted changes: modified `next.config.ts`, `package.json`, `globals.css`, `layout.tsx`, `page.tsx`; untracked `src/components/`, `src/lib/`, `src/sanity/`
