/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
    plugins: [tailwindcss()],
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
