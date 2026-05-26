/// <reference types="vitest/config" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, runnerImport, searchForWorkspaceRoot } from "vite";

const { version } = JSON.parse(
    readFileSync(resolve(process.cwd(), "package.json"), "utf-8"),
);

const APP_ENTRY = "/src/views/app.tsx";

// Deployed under this subpath on GitHub Pages. Used for production builds and
// `vite preview` (which serves the build), but not dev — keeping dev at "/"
// makes local URLs and the e2e `goto("/")` simple.
const PAGES_BASE = "/vite-alpine-tailwind-temaplate/";

/**
 * Build step: prerender the JSX app (src/views/app.tsx) to an HTML string and
 * inject it into the `<!--app-->` placeholder in index.html. In dev the module
 * is loaded through Vite's SSR pipeline (so it transforms with the same JSX
 * config); in build it's imported directly. Alpine hydrates the result.
 */
function renderJsxApp() {
    let server;
    return {
        name: "render-jsx-app",
        configureServer(devServer) {
            server = devServer;
        },
        async transformIndexHtml(html) {
            // Dev: reuse the running server's SSR loader (HMR-aware).
            // Build: there's no server and Node can't import .tsx directly, so
            // run the module through Vite's transform pipeline via runnerImport.
            const mod = server
                ? await server.ssrLoadModule(APP_ENTRY)
                : (await runnerImport(APP_ENTRY)).module;
            const rendered = await mod.App({ version });
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
