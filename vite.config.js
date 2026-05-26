/// <reference types="vitest/config" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";

const { version } = JSON.parse(
    readFileSync(resolve(process.cwd(), "package.json"), "utf-8"),
);

/** Replaces the `__APP_VERSION__` token in index.html with the package version. */
function injectAppVersion() {
    return {
        name: "inject-app-version",
        transformIndexHtml(html) {
            return html.replaceAll("__APP_VERSION__", version);
        },
    };
}

export default defineConfig({
    plugins: [tailwindcss(), injectAppVersion()],
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
});
