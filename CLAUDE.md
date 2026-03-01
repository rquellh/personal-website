# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio website themed as a Windows 95 desktop experience, built with Astro, React, and the react95 component library.

## Commands

- **Dev server**: `npm run dev` (runs on localhost:4321)
- **Build**: `npm run build` (outputs static files to `/dist/`)
- **Preview build**: `npm run preview`

No linting or testing frameworks are configured.

## Architecture

**Astro + React hybrid**: Astro handles the single page (`src/pages/index.astro`) and layout, but the entire UI is a client-side React app loaded via `client:only="react"`.

**Window management**: `WindowManager.tsx` provides a React Context that tracks all window state (open/close, minimize/maximize, position, size, z-index stacking). Individual windows are rendered by `Window.tsx` using `react-rnd` for drag/resize behavior.

**Adding new windows**: Create a component in `src/components/windows/`, define its `DesktopIconConfig` in `types.ts`, register it in `Desktop.tsx` (icon config + render logic), and add cases in `WindowManager.tsx` and `TaskBar.tsx`.

**Styling**: All styles use styled-components with the react95 theme provider (original theme). Global font is MS Sans Serif loaded via CDN in `Layout.astro`. Follow the Windows 95 aesthetic: `#c0c0c0`/`#808080`/`#dfdfdf` color palette, 3D inset/outset borders, `image-rendering: pixelated` for icons.

## Deployment

GitHub Actions deploys to GitHub Pages on push to `main`. The site base path is `/personal-website` (configured in `astro.config.mjs`).
