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
├── public/         # Static assets copied as-is
├── src/            # Source files
│   ├── app.ts      # Alpine bootstrap (registers components, starts Alpine)
│   ├── components.ts # Typed Alpine.data() components (e.g. counter)
│   ├── jsx.d.ts    # Opts into @kitajs/html's Alpine.js + x-on:/x-bind: types
│   ├── views/      # The whole UI, authored as JSX components
│   │   ├── app.tsx # Root: composes the sections (rendered at build time)
│   │   ├── nav.tsx · hero.tsx · features.tsx · demo.tsx · footer.tsx
│   ├── utils.ts    # Helper utilities
│   ├── utils.test.ts # Example Vitest unit test
│   └── styles.css  # Tailwind entry + dark mode variant + x-cloak rule
├── e2e/            # Playwright end-to-end tests
│   ├── version.spec.ts  # Footer shows the app version
│   ├── counter.spec.ts  # Typed Alpine counter component
│   └── dark-mode.spec.ts # Theme toggle drives dark: utilities
├── index.html      # Minimal shell; the JSX app is prerendered into it
├── vite.config.js  # Vite config (Tailwind, JSX prerender plugin, Vitest)
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

The entire UI is authored as JSX components under `src/views/`, powered by
[@kitajs/html](https://github.com/kitajs/html) (full type coverage for every
HTML element/attribute). It's wired via the automatic JSX transform
(`jsxImportSource: "@kitajs/html"`) in `tsconfig.json` and `vite.config.js`.

### Build-time prerendering

@kitajs/html renders JSX to **HTML strings**, so the app is rendered to static
HTML **at build time** rather than in the browser. The `render-jsx-app` plugin
in `vite.config.js` renders `<App/>` and injects it into the `<!--app-->`
placeholder in `index.html`; Alpine then hydrates the static markup at runtime.

- **Dev** loads the JSX through the server's SSR pipeline (`ssrLoadModule`).
- **Build** runs it through Vite's `runnerImport` (Node can't import `.tsx`).

The payoff: the browser receives complete HTML (great for SEO / no flash), and
**@kitajs/html is never shipped to the client** — it only runs during the build.

```tsx
// src/views/demo.tsx — a component returning an HTML string
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

## License

[MIT License](LICENSE)

---

Created by [vzsoares](https://github.com/vzsoares)
