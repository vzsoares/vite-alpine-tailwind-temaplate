import { defineConfig, devices } from "@playwright/test";

// E2E against the PRODUCTION build served by `vite preview` (under the GitHub
// Pages base path). This catches build/base regressions the dev e2e can't see —
// base-prefixed assets, the Pagefind index (prod-only), generated OG images,
// and the feeds. Separate port (5274) from the dev e2e (5273).
const PORT = 5274;
const BASE = "/vite-alpine-tailwind-x/";
const baseURL = `http://localhost:${PORT}${BASE}`;

export default defineConfig({
    testDir: "./e2e-preview",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
    use: { baseURL, trace: "on-first-retry" },
    projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
    webServer: {
        // Build (incl. the Pagefind index) then preview the static output.
        command: `bun run build && bun run preview --port ${PORT} --strictPort`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
    },
});
