# CLAUDE.md — WebProgramming Repository Guide

This file provides context for AI assistants working in this repository.

## Repository Overview

This is a **student web development learning repository** containing a finished event marketing website (MAX event) for an AIM Commons university facility, plus iterative assignment/practice projects. All code is vanilla HTML5/CSS3/JavaScript — no build tools, frameworks, or package managers.

## Directory Structure

```
WebProgramming/
├── final/          # Production-ready event website (MAX)
├── wip/            # Work-in-progress / active development version
├── No2/ … No12/    # Numbered course assignments (iterative learning)
├── No2_pre/ …      # Pre-release variants of some assignments
└── CLAUDE.md       # This file
```

### Key directories

| Path | Purpose |
|------|---------|
| `final/` | Deployable version — treat as stable |
| `wip/` | Development sandbox — can be modified freely |
| `No*/` | Historical assignments — generally read-only reference |

## Final Project Structure (`final/`)

```
final/
├── index.html          # Single-page application entry point (370 lines)
├── main.css            # Global layout & desktop styles
├── sub.css             # Mobile breakpoints (max-width: 800px) & overlays
├── main.js             # Core JS: fonts, hamburger menu, overlays, Swiper
├── images/             # SVG logos, JPG/PNG photos, favicons
├── favicons/           # Multi-format favicon set + manifest.json
└── dist/
    ├── css/swiper.css  # Swiper.js v6.6.2 styles (bundled locally)
    └── js/swiper.js    # Swiper.js v6.6.2 library (bundled locally)
```

### Page sections (in order in `index.html`)

1. **Header** — desktop nav bar + mobile hamburger (checkbox toggle)
2. **Top visual** — hero image with key visual
3. **Session** — Keynote & Workshop cards with overlay modals
4. **Booth** — Swiper.js image carousel with autoplay
5. **About AIM Commons** — facility description
6. **Footer**

## External Dependencies

No npm/yarn. All dependencies are either CDN-loaded or bundled in `dist/`.

| Library | Version | How loaded |
|---------|---------|-----------|
| Swiper.js | 6.6.2 | Bundled at `dist/js/swiper.js` |
| Adobe Typekit | kitId `bgh3yko` | Dynamic script from `https://use.typekit.net/` |
| Google Material Symbols | latest | CDN link in `<head>` |
| jQuery | unknown | WIP/test files only — **not used in `final/`** |

**Font families**: `"din-2014"`, `"ryo-gothic-plusn"`, sans-serif (Typekit)

## JavaScript Conventions (`main.js`)

- Vanilla JS only (no jQuery in `final/`)
- Typekit loaded via dynamic `<script>` injection with `try { Typekit.load({...}) } catch(e) {}`
- Hamburger menu: `uncheckCheckbox()` sets checkbox `checked = false`
- Overlay system: `openOverlay(id)` / `closeOverlay(id)` target elements by ID
- Event bubbling stopped on overlay content containers with `event.stopPropagation()`
- Swiper initialized after DOM ready with `autoplay: { delay: 5000 }`

## CSS Conventions

- **Mobile-first breakpoint**: `@media screen and (max-width: 800px)` in `sub.css`
- Desktop styles in `main.css`, mobile overrides in `sub.css`
- CSS custom properties (variables) not used — values are hardcoded
- Japanese comments mark sections: e.g., `/* ヘッダー */`, `/* メインコンテンツ */`
- Flexbox and CSS Grid used for layout
- Smooth scrolling enabled via `html { scroll-behavior: smooth; }`

## HTML Conventions

- Single `index.html` per project (no multi-page routing)
- Navigation anchors use `#section-id` for in-page scrolling
- Modal overlays use hidden checkbox + label trick for pure-CSS toggle (alongside JS)
- Image paths are relative (e.g., `images/max_logo.svg`)
- Language: primarily Japanese (`lang="ja"`)

## Development Workflow

There is **no build step**. Edit files directly and open in a browser.

```
# Typical workflow
1. Make changes in wip/ (safe sandbox)
2. Test by opening wip/index.html in a browser
3. Copy changes to final/ when stable
```

There are no linters, formatters, or pre-commit hooks configured.

## Testing

No automated test framework. Manual testing only:

- `wip/test.html` / `wip/test.js` — informal jQuery tab tests
- `wip/modal.html` — modal component isolation testing
- Verify changes in a browser at multiple viewport widths (especially ≤800px)

## Git Configuration

- Remote: internal proxy at `http://local_proxy@127.0.0.1:42477/git/meshiden-dot-jp/WebProgramming`
- Default branch: `master`
- No `.gitignore` — all files are tracked
- Commit with clear English messages describing what changed

## Image Assets

Located in `final/images/` and `wip/images/`:

- Logos: SVG format (`max_logo.svg`, `aim_logo.svg`)
- Photos: JPG/PNG, some very large (2–5 MB each) — do not compress without permission
- Area map: `area_map.svg` (45.9 KB)
- Favicons: multiple sizes in `final/favicons/`

## Things to Avoid

- Do not introduce npm, webpack, or any build toolchain unless explicitly requested
- Do not add jQuery to `final/` — it uses vanilla JS only
- Do not modify files in `No*/` directories unless specifically asked
- Do not delete image files — they may be referenced indirectly
- Do not upgrade Swiper.js without testing the carousel — the API changed significantly between v6 and v7+
- Avoid adding CSS custom properties for values that are only used once

## Common Tasks

**Adding a new section to the event page**
1. Add HTML in `final/index.html` between existing sections
2. Add nav anchor in the `<header>` nav list
3. Style desktop layout in `main.css`
4. Add mobile overrides in `sub.css` under the existing `@media` block

**Adding a new overlay/modal**
1. Add overlay `<div id="overlay-NAME">` in HTML
2. Add open trigger (button/link calling `openOverlay('overlay-NAME')`)
3. Add close button calling `closeOverlay('overlay-NAME')`
4. Style similarly to existing `.overlay` rules in `sub.css`

**Modifying the Swiper carousel**
- Config is in `main.js` — the `new Swiper(...)` call
- CSS is in `dist/css/swiper.css` (do not edit — it's a library file)
- Custom carousel styles go in `main.css` or `sub.css`
