# AGENTS.md

Guidance for AI coding agents working in this repo. Humans: see `README.md`.

## What this is

A **static site generator** built on Vite + Alpine.js + Tailwind. The entire UI
is authored in **JSX** (`@kitajs/html`), prerendered to **static HTML at build
time**, and hydrated by Alpine in the browser. No UI framework ships to the
client. See `DESIGN.md` for the visual system.

## Always verify before delivering

Run the full suite and fix anything red **before** presenting a change:

```bash
bun run check       # Biome lint + format (writes)
bun run typecheck   # tsc --noEmit
bun run xss-scan    # @kitajs/ts-html-plugin (JSX XSS)
bun run test        # Vitest unit tests
bun run build       # Vite build + Pagefind index
bun run test:e2e    # Playwright (first time: bunx playwright install chromium)
```

For UI changes, also **look at the result** (build + `bun run preview`, or a
Playwright screenshot) — several bugs here were only visible visually.

## How the repo works

- **Routes are data.** `ROUTES` in `src/config.ts` maps each route to a page
  component (`src/pages/<page>.tsx`, exports `Page`) and an output file. The
  `render-jsx-app` plugin (`vite.config.ts`) stamps each page into the single
  `index.html` template. **Add a route = add `src/pages/<name>.tsx` + a `ROUTES`
  entry.** No hand-written HTML shell.
- **Build-time dynamic routes:** derive `ROUTES` from data (see the blog —
  `src/content/posts.ts` → one static page per post, passed via `data`).
- **`src/config.ts` is the single source of truth** for site identity, links,
  routes — imported by both the build and the components. Don't scatter these.
- **Components** live in `src/components/` (reusable) and `src/pages/` (routes);
  Alpine `data()` registrations in `src/alpine.ts`; helpers in `src/lib/`.

## Tools

Bun (pm + runner) · Biome (lint/format) · Vitest (unit) · Playwright (e2e) ·
`@kitajs/ts-html-plugin` (XSS scan) · release-it (releases). Vite 8 is
Rolldown/**oxc**-based.

**htmx** is installed, loaded (`src/app.ts`) and typed (`@kitajs/html/htmx` in
`src/jsx.d.ts`) but dormant — the site is static. To go server-side / use htmx
for real, see `docs/htmx.md`.

## Gotchas (learned the hard way)

- **kitajs renders strings.** Interpolating a variable in children needs the
  `safe` attribute (`<span safe>{v}</span>`); for trusted raw HTML (e.g. rendered
  Markdown) use a **`safe`-prefixed variable** (`const safeBody = …`). XSS scan
  enforces this.
- **Alpine directives in JSX:** use longhand `x-on:click` / `x-bind:class` (typed
  via the augmentation in `src/jsx.d.ts`). `@click` / `:class` are invalid JSX
  prop names; the body-level dark-mode `:class` lives in `index.html`, not JSX.
- **Vite 8 = oxc, not esbuild.** JSX config is `oxc.jsx` + `jsxImportSource:
  "@kitajs/html"` (tsconfig). `esbuild:` options are ignored.
- **`vite build` runs under Node** (even via `bun run`) — it can't `import()` a
  `.tsx`. The plugin uses `runnerImport` (build) / `ssrLoadModule` (dev).
- **`base`** lives in `vite.config.ts`, applied for build + `isPreview` only (dev
  stays `/`). `index.html` must use **absolute** `/src/...` asset paths (the one
  template is served at sub-paths like `/about/`).
- **Search is prod-only.** `bun run build` runs `pagefind --site dist`; the index
  doesn't exist in dev, so `search.tsx` renders the UI only when `prod` (a flag
  the plugin passes); dev shows a hint.
- **OG images need a bundled font.** Per-post cards are rendered with
  `@resvg/resvg-js`; system fonts are unreliable (CI falls back to monospace), so
  fonts are bundled in `assets/fonts/`.
- **`xss-scan` needs `tsconfig.scan.json`** (`noEmit`) — the CLI chokes on the
  base config's `outDir`/`declaration`.
- **`vite.config.ts` isn't type-checked** by `tsc` (outside `include: ["src"]`),
  but Biome **does** lint it (type the `let server` etc.).
- Build-only deps (kitajs, marked, shiki, resvg, pagefind) must stay out of the
  client bundle — they only run during the build.

## Conventions

- Avoid `as` / `any` — narrow with type guards (e.g. the `renderSync`/`render`
  helpers).
- Match existing style; Biome formats (4-space indent, double quotes).
- Commit directly to `main` (no feature branch). Release with
  `GITHUB_TOKEN="$(gh auth token)" bunx release-it <minor|patch> --ci`.
- Keep `README.md` and `DESIGN.md` in sync when behavior/visuals change.
