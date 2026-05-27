# htmx

htmx is **installed and ready** in this template:

- `htmx.org` is a dependency, imported in `src/app.ts` (loaded on every page,
  dormant until you add `hx-*` attributes).
- `hx-*` attributes are **typed** in JSX via `@kitajs/html/htmx`
  (referenced in `src/jsx.d.ts`), like the Alpine directives.

So you can write htmx today:

```tsx
<button hx-get={`${base}fragments/hello.html`} hx-target="#out" hx-swap="innerHTML">
  Load
</button>
<div id="out"></div>
```

On the **static** build, htmx can only fetch static files (e.g. a prebuilt HTML
fragment). Its real power — returning HTML fragments per request — needs a
**server**. This template is static by default, so the rest of this guide is the
path to a backend when you want one. Nothing below is required to ship statically.

## Static vs. server

`@kitajs/html` renders JSX to HTML **strings**, which is exactly what an HTTP
handler returns — so the components here move to a server unchanged. The only
real shift: today the `render-jsx-app` plugin renders them at **build time**;
a backend renders them **per request**.

## What you keep, swap, add

| Keep ✅ | Swap 🔁 | Add ➕ |
| --- | --- | --- |
| All JSX in `src/components/` + `src/pages/` (return HTML strings) | the build-time `render-jsx-app` plugin → **server route handlers** | a server framework (Hono / Elysia / Fastify, on Bun) |
| **htmx** (already wired), Tailwind, Biome, the `safe`/`xss-scan` discipline | static `dist/` + GitHub Pages → a **running server** host | **fragment** endpoints (return partial HTML) |
| Alpine for local UI state (dark toggle, dropdowns) | Pagefind static search → a DB/server query | — |

The components already render server-side in dev (the plugin uses
`ssrLoadModule`), so they're proven to work as request-time HTML.

## Going server-side — steps

1. **Add a server.** e.g. Bun + Hono:
   ```bash
   bun add hono
   ```
   ```tsx
   // src/server.tsx
   import { Hono } from "hono";
   import { Page as Home } from "./pages/home";

   const app = new Hono();
   app.get("/", (c) => c.html(Home({ version: "dev", base: "/" })));
   export default app; // `bun run src/server.tsx`
   ```
   Serve the built CSS/JS as static files and link them from `Layout`/the shell.

2. **Write fragment endpoints.** htmx swaps in HTML returned by the server, so a
   component can be both a full page and a fragment:
   ```tsx
   app.get("/todos", (c) => c.html(<TodoList items={db.all()} />));
   app.post("/todos", (c) => c.html(<TodoItem item={db.add(c)} />));
   ```
   ```tsx
   <button hx-post="/todos" hx-target="#list" hx-swap="beforeend">Add</button>
   <ul id="list">{items.map((i) => <TodoItem item={i} />)}</ul>
   ```

3. **Drop the static-only pieces:** the `render-jsx-app` prerender plugin and the
   `ROUTES`-driven static output, `pagefind` (use a server search), and the
   GitHub Pages workflow (deploy the server instead). Keep Vite (or the Tailwind
   CLI) only to build the CSS + client bundle.

## Notes

- **htmx + Alpine coexist** — htmx for server round-trips (forms, lists,
  navigation), Alpine for purely-local interactivity.
- **`safe` becomes essential**, not cosmetic: real user data flows through the
  server, so keep `xss-scan` in CI and `safe` on interpolated values.
- **Keep components fragment-friendly:** `Layout` wraps full pages; inner
  components (lists, cards) should render standalone so they can be returned as
  htmx fragments.
- `@kitajs/html` has first-party server integrations
  (`@kitajs/fastify-html-plugin`, Elysia's `@elysiajs/html`) and `Suspense` for
  streaming async components.
- Not using htmx? Remove the `import "htmx.org"` from `src/app.ts` (and the
  dependency) to drop it from the bundle.
