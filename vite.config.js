/// <reference types="vitest/config" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, runnerImport, searchForWorkspaceRoot } from "vite";

const { version } = JSON.parse(
    readFileSync(resolve(process.cwd(), "package.json"), "utf-8"),
);

// Deployed under this subpath on GitHub Pages. Used for production builds and
// `vite preview` (which serves the build), but not dev — keeping dev at "/"
// makes local URLs and the e2e `goto("/")` simple.
const PAGES_BASE = "/vite-alpine-tailwind-temaplate/";

// The routes of the site. Each is generated from the single index.html template
// by stamping in the matching component from src/pages. `out` is the emitted
// file (and, with index.html stripped, the URL); GitHub Pages serves 404.html
// for unknown paths.
const ROUTES = [
    { out: "index.html", page: "home", title: "Vite Alpine Tailwind Template" },
    {
        out: "about/index.html",
        page: "about",
        title: "About · Vite Alpine Tailwind Template",
    },
    { out: "404.html", page: "404", title: "404 · Page not found" },
    { out: "500.html", page: "500", title: "500 · Something went wrong" },
];

/** The URL a route is served at, e.g. "about/index.html" -> "/about/". */
const routeUrl = (out) => `/${out.replace(/index\.html$/, "")}`;

/** Page name for a request path: "/" | "/index.html" -> "home";
 *  "/about/" -> "about"; "/404.html" -> "404". */
function pageNameFor(path) {
    const name = path
        .replace(/^\//, "")
        .replace(/\.html$/, "")
        .replace(/index$/, "")
        .replace(/\/$/, "");
    return name === "" ? "home" : name;
}

/** Find the route a request path maps to (defaults to home). */
function routeForPath(path) {
    const name = pageNameFor(path);
    return ROUTES.find((r) => r.page === name) ?? ROUTES[0];
}

/**
 * Single-template multi-page rendering. The whole site is built from one
 * index.html shell: each route's JSX page (src/pages/<name>.tsx) is rendered to
 * an HTML string and stamped into the `<!--app-->` placeholder (with its own
 * <title>). At build the template — already carrying Vite's hashed asset tags —
 * is reused for every route in generateBundle; in dev a middleware serves the
 * non-home routes through the same transform. Alpine hydrates the result.
 */
function renderJsxApp() {
    let server;
    let base = "/";

    const stamp = (template, rendered, title) =>
        template
            .replace("<!--app-->", rendered)
            .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

    async function renderPage(page) {
        const entry = `/src/pages/${page}.tsx`;
        const mod = server
            ? await server.ssrLoadModule(entry)
            : (await runnerImport(entry)).module;
        return mod.Page({ version, base });
    }

    return {
        name: "render-jsx-app",
        configResolved(config) {
            base = config.base;
        },
        configureServer(devServer) {
            server = devServer;
            // Serve the non-home routes (which have no physical .html file) by
            // running the index.html template through the same transform.
            server.middlewares.use(async (req, res, next) => {
                const url = (req.url ?? "/").split("?")[0];
                const route = ROUTES.find(
                    (r) => r.page !== "home" && routeUrl(r.out) === url,
                );
                if (!route) return next();
                try {
                    const template = readFileSync(
                        resolve(process.cwd(), "index.html"),
                        "utf-8",
                    );
                    const html = await server.transformIndexHtml(
                        url,
                        template,
                        req.originalUrl,
                    );
                    res.setHeader("Content-Type", "text/html");
                    res.end(html);
                } catch (err) {
                    next(err);
                }
            });
        },
        // Dev only: stamp the page matching the requested URL into the template.
        // In build this is a no-op (server is undefined) — generateBundle stamps
        // every route from the asset-injected template instead.
        async transformIndexHtml(html, ctx) {
            if (!server) return;
            const route = routeForPath(ctx.path);
            return stamp(html, await renderPage(route.page), route.title);
        },
        // Build: after Vite emits index.html (with its hashed asset tags), use
        // it as the template — stamp each route, overwrite index.html, emit the
        // rest. `order: "post"` ensures this runs after vite:build-html.
        generateBundle: {
            order: "post",
            async handler(_options, bundle) {
                const indexKey = Object.keys(bundle).find(
                    (key) =>
                        key.endsWith("index.html") &&
                        bundle[key].type === "asset",
                );
                const template = bundle[indexKey].source.toString();
                for (const route of ROUTES) {
                    const html = stamp(
                        template,
                        await renderPage(route.page),
                        route.title,
                    );
                    if (route.out === "index.html") {
                        bundle[indexKey].source = html;
                    } else {
                        this.emitFile({
                            type: "asset",
                            fileName: route.out,
                            source: html,
                        });
                    }
                }
            },
        },
    };
}

export default defineConfig(({ command, isPreview }) => ({
    base: command === "build" || isPreview ? PAGES_BASE : "/",
    // No SPA fallback: unknown paths 404 so the route middleware can serve them.
    appType: "mpa",
    plugins: [tailwindcss(), renderJsxApp()],
    // Vite 8 transforms with oxc: compile JSX with the automatic runtime from
    // @kitajs/html, which renders JSX to HTML strings.
    oxc: {
        jsx: {
            runtime: "automatic",
            importSource: "@kitajs/html",
        },
    },
    server: {
        fs: {
            allow: [searchForWorkspaceRoot(process.cwd())],
            strict: false, // Disable strict file serving restrictions
        },
    },
    test: {
        environment: "node",
        include: ["src/**/*.test.ts"],
    },
}));
