# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FitFinder is a Korean-language PWA (Progressive Web App) that converts waist measurements between half-waist cm, full-waist cm, and inches, then recommends a pants size (XS-XXL). Built with React + Vite, deployed as a standalone PWA with service worker auto-update.

## Build & Run Commands

```bash
npm install              # Install dependencies
npm run dev              # Start Vite dev server with HMR
npm run build            # Production build to dist/
npm run preview          # Preview production build locally
npm run lint             # Run ESLint (flat config, JS/JSX only)
```

## Architecture

Single-component app — all logic lives in `src/App.jsx`:

- **`App`** component: two synced number inputs (half-waist cm and full-waist cm), converts to inches, maps to size via `getPantsSize()`, shows fit comment and warnings.
- **`SizeChart`** component: static reference table rendered as cards (XS through XXL).
- **Conversion logic**: `halfCm * 2 = fullCm`, `fullCm / 2.54 = inch`, rounded inch maps to size bracket.

No routing, no state management library, no backend — pure `useState` with derived values.

## Key Configuration

- **PWA**: `vite-plugin-pwa` with `autoUpdate` registration, manifest defines "FitFinder" as standalone app with theme color `#000000`.
- **Google Analytics**: Optional, loaded dynamically in `src/main.jsx` when `VITE_GA_ID` env var is set.
- **Font**: Pretendard loaded via CDN in `index.html`.
- **Dark mode**: Toggled via state, applied as `.wrapper.dark` / `.wrapper.light` CSS classes in `App.css`.

## ESLint Rules

- `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).
- `react-refresh/only-export-components` is warn-level with `allowConstantExport: true`.

## Known Issue

`src/App.css` line 146 has a stray `*/` closing comment without a matching opener.
