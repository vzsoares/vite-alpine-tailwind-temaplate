import { expect, test } from "@playwright/test";

// One smoke test per route: it renders its content, every asset loads (guards
// the single-template "served at a sub-path" trap), and Alpine boots.
const PAGES = [
    { url: "/", heading: "Vite + Alpine + Tailwind" },
    { url: "/about/", heading: "About this template" },
    { url: "/404.html", heading: "Page not found" },
    { url: "/500.html", heading: "Something went wrong" },
];

for (const { url, heading } of PAGES) {
    test(`${url} renders, loads its assets, and boots Alpine`, async ({
        page,
    }) => {
        const failures: string[] = [];
        page.on("requestfailed", (req) =>
            failures.push(`${req.url()} (${req.failure()?.errorText})`),
        );
        page.on("response", (res) => {
            if (res.status() >= 400)
                failures.push(`${res.status()} ${res.url()}`);
        });

        await page.goto(url);

        await expect(
            page.getByRole("heading", { name: heading }),
        ).toBeVisible();
        // app.ts ran (assigns window.Alpine) — i.e. the module script loaded.
        await expect
            .poll(() => page.evaluate(() => "Alpine" in window))
            .toBe(true);
        expect(failures, `no failed requests on ${url}`).toEqual([]);
    });
}
