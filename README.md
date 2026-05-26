# Vite + Alpine.js + Tailwind CSS Template

![Template Stack](https://img.shields.io/badge/stack-Vite%20%7C%20Alpine.js%20%7C%20Tailwind%20CSS-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A lightweight starter template combining Vite, Alpine.js, and Tailwind CSS for building modern, interactive web applications.

## Features

- ⚡️ **Vite** - Lightning fast development server with HMR
- 🗻 **Alpine.js** - Minimal JavaScript framework for adding interactivity
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📦 **TypeScript** - Type safety for your JavaScript
- ⚛️ **JSX** - Type-safe HTML templating via [@kitajs/html](https://github.com/kitajs/html), with XSS scanning
- 🍞 **Bun** - Fast package manager and script runner
- 🧹 **Biome** - One-pass linter and formatter
- 🧪 **Vitest** - Fast unit testing
- 🎭 **Playwright** - End-to-end browser testing

## Quick Start

```bash
# Clone the repository
git clone https://github.com/vzsoares/vite-alpine-tailwind-temaplate.git my-project

# Navigate to the directory
cd my-project

# Install dependencies
bun install

# Start development server
bun run dev
```

## Build for Production

```bash
bun run build
```

## Preview Production Build

```bash
bun run preview
```

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `bun run dev`       | Start the Vite dev server with HMR           |
| `bun run build`     | Build for production into `dist/`            |
| `bun run preview`   | Preview the production build locally         |
| `bun run check`     | Lint **and** format the codebase (Biome)     |
| `bun run lint`      | Lint without writing changes (Biome)         |
| `bun run format`    | Format files in place (Biome)                |
| `bun run typecheck` | Type-check with `tsc --noEmit`               |
| `bun run xss-scan`  | Scan JSX for XSS (`@kitajs/ts-html-plugin`)  |
| `bun run test`      | Run unit tests once (Vitest)                 |
| `bun run test:watch`| Run unit tests in watch mode (Vitest)        |
| `bun run test:e2e`  | Run end-to-end browser tests (Playwright)    |

## Project Structure

```
/
├── public/         # Static assets copied as-is (favicon.ico, og.png)
├── src/            # Source files
│   ├── config.ts   # Central site config: identity, links, routes (shared
│   │               # by the build and the components)
│   ├── app.ts      # Alpine bootstrap (registers data, starts Alpine)
│   ├── alpine.ts   # Typed Alpine.data() components (e.g. counter)
│   ├── jsx.d.ts    # Opts into @kitajs/html's Alpine.js + x-on:/x-bind: types
│   ├── styles.css  # Tailwind + dark mode + x-cloak + @view-transition
│   ├── components/ # Reusable JSX components (build-time HTML)
│   │   ├── layout.tsx # Shared chrome (nav + footer) wrapping each route
│   │   ├── error-page.tsx # Shared status-page layout (404 / 500)
│   │   └── nav.tsx · hero.tsx · features.tsx · demo.tsx · footer.tsx
│   ├── pages/      # One JSX component per route (the ROUTES table in
│   │   │           # config.ts maps each to an output file)
│   │   ├── home.tsx  # "/"  → index.html
│   │   ├── about.tsx # "/about/" → about/index.html
│   │   └── 404.tsx · 500.tsx # status pages → 404.html / 500.html
│   └── lib/        # Framework-agnostic helpers
│       ├── utils.ts
│       └── utils.test.ts # Example Vitest unit test
├── e2e/            # Playwright end-to-end tests
│   ├── pages.spec.ts    # Every route renders, loads assets, boots Alpine
│   ├── version.spec.ts  # Footer shows the app version
│   ├── counter.spec.ts  # Typed Alpine counter component
│   ├── routing.spec.ts  # Navigation between the home and about pages
│   └── dark-mode.spec.ts # Theme toggle drives dark: utilities
├── index.html      # The single shell template; every route is stamped from it
├── vite.config.ts  # Vite config (Tailwind, JSX prerender plugin, Vitest)
├── playwright.config.ts # Playwright e2e configuration
├── biome.json      # Biome linter & formatter config
├── tsconfig.json   # TypeScript configuration (incl. JSX + ts-html-plugin)
└── tsconfig.scan.json # Emit-free config for the xss-scan CLI
```

> The footer shows the current `package.json` version, passed into the JSX app
> as a prop by the prerender plugin (verified by the Playwright test).

> First-time setup for e2e tests: run `bunx playwright install chromium` to
> download the browser.

> Tailwind CSS v4 is wired in through the official `@tailwindcss/vite` plugin
> (no PostCSS or autoprefixer needed). Styles live in `src/styles.css` via a
> single `@import "tailwindcss";`.

## JSX

The entire UI is authored as JSX components under `src/components/` and `src/pages/`, powered by
[@kitajs/html](https://github.com/kitajs/html) (full type coverage for every
HTML element/attribute). It's wired via the automatic JSX transform
(`jsxImportSource: "@kitajs/html"`) in `tsconfig.json` and `vite.config.ts`.

### Build-time prerendering

@kitajs/html renders JSX to **HTML strings**, so the app is rendered to static
HTML **at build time** rather than in the browser. The `render-jsx-app` plugin
in `vite.config.ts` renders each route's page component and injects it into the
`<!--app-->` placeholder of its HTML shell; Alpine then hydrates the static
markup at runtime.

- **Dev** loads the JSX through the server's SSR pipeline (`ssrLoadModule`).
- **Build** runs it through Vite's `runnerImport` (Node can't import `.tsx`).

The payoff: the browser receives complete HTML (great for SEO / no flash), and
**@kitajs/html is never shipped to the client** — it only runs during the build.

```tsx
// src/components/demo.tsx — a component returning an HTML string
function Counter(): JSX.Element {
    return (
        <div x-data="counter(0)" class="text-center">
            <p x-text="count">0</p>
            <button type="button" x-on:click="increment()">+</button>
        </div>
    );
}
```

Notes:

- **Directives:** `x-data`, `x-text`, `x-show`, ... are typed by
  `@kitajs/html/alpine`. The namespaced `x-on:click` / `x-bind:class` are made
  typed props by an augmentation in `src/jsx.d.ts`. The `@click` / `:class`
  shorthands stay unsupported (`@` / leading `:` aren't valid JSX prop names);
  the body-level `:class` for dark mode lives in `index.html`, not JSX.
- **XSS:** interpolated variables in children need kitajs's `safe` attribute
  (e.g. `<span safe>{value}</span>`). `bun run xss-scan` enforces this in CI
  (via `tsconfig.scan.json`, whose `noEmit` lets the CLI's validation pass).

## Routing

Routing is **static and generated from one template** — every route is stamped
from a single `index.html` shell at build time, so each ends up its own static
HTML file (no client-side router ships to the browser).

- A `ROUTES` table in `src/config.ts` maps each route to a page component and
  output file. At build the `render-jsx-app` plugin reuses the asset-injected
  `index.html` as a template and emits one file per route (`generateBundle`); in
  dev a middleware serves the non-home routes through the same transform.
- **Add a route** with just two edits: create `src/pages/<name>.tsx` (exporting
  `Page`) and add a `ROUTES` entry — no hand-written HTML shell needed.
- Navigation is plain `<a href>`; the `Layout`/`Nav` receive the configured
  `base` so links work under the GitHub Pages subpath.
- Cross-page navigation is smoothed by the native **View Transitions API**
  (`@view-transition { navigation: auto; }` in `styles.css`) — a progressive
  enhancement, ignored by browsers that don't support it.

`src/pages/about.tsx` is a worked example whose Alpine accordion hydrates
after navigation (covered by `e2e/routing.spec.ts`).

## SEO & metadata

Each route carries its own `<head>`. The `ROUTES` table (`src/config.ts`) holds
a `title` + `description` per route; the plugin stamps in `<title>`,
`description`, canonical, Open Graph, and Twitter Card tags via the `<!--head-->`
placeholder. Status pages set `robots: "noindex"`.

- **Social card:** `public/og.png` (1200×630, project gradient) is the default
  `og:image` / `twitter:image` for every route.
- **`sitemap.xml` + `robots.txt`** are generated at build from the indexable
  routes (noindex routes are excluded from the sitemap).
- **`SITE_URL`** in `src/config.ts` is the absolute origin used for canonical /
  OG / sitemap URLs — update it (and `base`) when you deploy to your own
  domain/repo. (On GitHub *project* pages, `robots.txt` lives under the subpath
  and isn't read at the domain root; submit the sitemap manually if needed.)

Accessibility: a skip-to-content link and a `<main>` landmark wrap each page, and
a global `:focus-visible` ring (`styles.css`) keeps keyboard focus visible.

## License

[MIT License](LICENSE)

---

Created by [vzsoares](https://github.com/vzsoares)
