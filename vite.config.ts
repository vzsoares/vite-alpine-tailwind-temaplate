/// <reference types="vitest/config" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import {
    defineConfig,
    runnerImport,
    searchForWorkspaceRoot,
    type ViteDevServer,
} from "vite";
import { BASE, ROUTES, SITE, SITE_URL } from "./src/config";

const { version } = JSON.parse(
    readFileSync(resolve(process.cwd(), "package.json"), "utf-8"),
);

/** The URL a route is served at, e.g. "about/index.html" -> "/about/". */
const routeUrl = (out) => `/${out.replace(/index\.html$/, "")}`;

/** Escape a string for use in HTML attribute/text content. */
const esc = (s) =>
    s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

/** The per-route <head> tags stamped into the `<!--head-->` placeholder. */
function headFor(route) {
    const loc = SITE_URL + routeUrl(route.out).slice(1); // SITE_URL ends in "/"
    const ogImage = `${SITE_URL}og.png`; // default social card (public/og.png)
    const tags = [
        `<title>${esc(route.title)}</title>`,
        `<meta name="description" content="${esc(route.description)}" />`,
        `<meta name="keywords" content="${esc(SITE.keywords)}" />`,
        `<meta name="author" content="${esc(SITE.author)}" />`,
        `<link rel="canonical" href="${loc}" />`,
        `<meta property="og:title" content="${esc(route.title)}" />`,
        `<meta property="og:description" content="${esc(route.description)}" />`,
        `<meta property="og:url" content="${loc}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:image" content="${ogImage}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(route.title)}" />`,
        `<meta name="twitter:description" content="${esc(route.description)}" />`,
        `<meta name="twitter:image" content="${ogImage}" />`,
        `<link rel="alternate" type="application/rss+xml" title="${esc(SITE.name)}" href="${SITE_URL}rss.xml" />`,
    ];
    if (route.robots) {
        tags.push(`<meta name="robots" content="${esc(route.robots)}" />`);
    }
    return tags.join("\n        ");
}

/** Find the route a request path maps to (defaults to home). Matches by URL,
 *  not page name, since several routes can share one page component (e.g. the
 *  blog posts all use `post`). "/blog/x/index.html" and "/blog/x/" both match. */
function routeForPath(path) {
    const url = path.replace(/index\.html$/, "");
    return ROUTES.find((r) => routeUrl(r.out) === url) ?? ROUTES[0];
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
    let server: ViteDevServer | undefined;
    let base = "/";

    const stamp = (template, route, body) =>
        template
            .replace("<!--head-->", headFor(route))
            .replace("<!--app-->", body);

    async function renderPage(route) {
        const entry = `/src/pages/${route.page}.tsx`;
        const mod = server
            ? await server.ssrLoadModule(entry)
            : (await runnerImport(entry)).module;
        return mod.Page({ version, base, data: route.data });
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
            return stamp(html, route, await renderPage(route));
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
                        route,
                        await renderPage(route),
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

                // Sitemap + robots from the indexable (non-noindex) routes.
                const locs = ROUTES.filter((r) => !r.robots).map(
                    (r) =>
                        `  <url><loc>${SITE_URL}${routeUrl(r.out).slice(1)}</loc></url>`,
                );
                this.emitFile({
                    type: "asset",
                    fileName: "sitemap.xml",
                    source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs.join("\n")}\n</urlset>\n`,
                });
                this.emitFile({
                    type: "asset",
                    fileName: "robots.txt",
                    source: `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}sitemap.xml\n`,
                });

                // RSS feed from the blog posts (routes carrying post data).
                const items = ROUTES.filter((r) => r.data).map((r) => {
                    const link = SITE_URL + routeUrl(r.out).slice(1);
                    return `  <item>
    <title>${esc(r.data.title)}</title>
    <link>${link}</link>
    <guid>${link}</guid>
    <pubDate>${new Date(r.data.date).toUTCString()}</pubDate>
    <description>${esc(r.data.excerpt)}</description>
  </item>`;
                });
                this.emitFile({
                    type: "asset",
                    fileName: "rss.xml",
                    source: `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n<channel>\n  <title>${esc(SITE.name)}</title>\n  <link>${SITE_URL}</link>\n  <description>${esc(SITE.description)}</description>\n  <atom:link href="${SITE_URL}rss.xml" rel="self" type="application/rss+xml" />\n${items.join("\n")}\n</channel>\n</rss>\n`,
                });
            },
        },
    };
}

export default defineConfig(({ command, isPreview }) => ({
    base: command === "build" || isPreview ? BASE : "/",
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
