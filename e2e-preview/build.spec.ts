import { expect, test } from "@playwright/test";

// baseURL already includes the Pages sub-path, so navigate with RELATIVE paths
// (a leading "/" would escape to the origin root).

test("home loads with all base-prefixed assets and boots Alpine", async ({
    page,
}) => {
    const failures: string[] = [];
    page.on("requestfailed", (r) =>
        failures.push(`${r.url()} (${r.failure()?.errorText})`),
    );
    page.on("response", (r) => {
        if (r.status() >= 400) failures.push(`${r.status()} ${r.url()}`);
    });

    await page.goto("./");
    await expect(
        page.getByRole("heading", { name: "Vite + Alpine + Tailwind" }),
    ).toBeVisible();
    await expect.poll(() => page.evaluate(() => "Alpine" in window)).toBe(true);
    expect(failures, "no failed requests on the built home page").toEqual([]);
});

test("a blog post loads (deep-path assets resolve)", async ({ page }) => {
    const failures: string[] = [];
    page.on("response", (r) => {
        if (r.status() >= 400) failures.push(`${r.status()} ${r.url()}`);
    });

    await page.goto("blog/lorem-ipsum-dolor/");
    await expect(
        page.getByRole("heading", { level: 1, name: "Lorem Ipsum Dolor" }),
    ).toBeVisible();
    expect(failures, "no failed requests on a built post").toEqual([]);
});

test("Pagefind search works in the build (and links stay single-based)", async ({
    page,
}) => {
    await page.goto("search/");
    await page.locator(".pagefind-ui__search-input").first().fill("placeholder");
    const firstResult = page.locator(".pagefind-ui__result-link").first();
    await expect(firstResult).toBeVisible();

    const href = await firstResult.getAttribute("href");
    expect(href?.startsWith("/vite-alpine-tailwind-temaplate/")).toBe(true);
    // guards the double-base regression
    expect(href).not.toContain(
        "vite-alpine-tailwind-temaplate/vite-alpine-tailwind-temaplate",
    );
});

test("generated OG image + feeds are served", async ({ request }) => {
    const png = await request.get("blog/lorem-ipsum-dolor/og.png");
    expect(png.status()).toBe(200);
    expect(png.headers()["content-type"]).toContain("image/png");

    for (const path of ["sitemap.xml", "rss.xml", "robots.txt"]) {
        expect((await request.get(path)).status(), path).toBe(200);
    }
});
