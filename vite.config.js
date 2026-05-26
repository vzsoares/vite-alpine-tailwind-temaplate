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

/** Map an HTML request path to its page component name in src/pages.
 *  "/" or "/index.html" -> "home"; "/about/index.html" -> "about";
 *  "/404.html" -> "404"; "/500.html" -> "500". */
function pageNameFor(path) {
    const name = path
        .replace(/^\//, "")
        .replace(/\.html$/, "")
        .replace(/index$/, "")
        .replace(/\/$/, "");
    return name === "" ? "home" : name;
}

/**
 * Build step: prerender each route's JSX page (src/pages/<name>.tsx) to
 * an HTML string and inject it into the `<!--app-->` placeholder of its
 * index.html. In dev the module is loaded through Vite's SSR pipeline; in build
 * (no server, and Node can't import .tsx) it goes through `runnerImport`.
 * Alpine hydrates the result.
 */
function renderJsxApp() {
    let server;
    let base = "/";
    return {
        name: "render-jsx-app",
        configResolved(config) {
            base = config.base;
        },
        configureServer(devServer) {
            server = devServer;
        },
        async transformIndexHtml(html, ctx) {
            const entry = `/src/pages/${pageNameFor(ctx.path)}.tsx`;
            const mod = server
                ? await server.ssrLoadModule(entry)
                : (await runnerImport(entry)).module;
            const rendered = await mod.Page({ version, base });
            return html.replace("<!--app-->", rendered);
        },
    };
}

export default defineConfig(({ command, isPreview }) => ({
    base: command === "build" || isPreview ? PAGES_BASE : "/",
    plugins: [tailwindcss(), renderJsxApp()],
    // Vite 8 transforms with oxc: compile JSX with the automatic runtime from
    // @kitajs/html, which renders JSX to HTML strings.
    oxc: {
        jsx: {
            runtime: "automatic",
            importSource: "@kitajs/html",
        },
    },
    build: {
        // One static HTML file per route (each prerendered by renderJsxApp).
        // GitHub Pages serves 404.html for unknown paths.
        rollupOptions: {
            input: {
                home: resolve(process.cwd(), "index.html"),
                about: resolve(process.cwd(), "about/index.html"),
                notFound: resolve(process.cwd(), "404.html"),
                serverError: resolve(process.cwd(), "500.html"),
            },
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
