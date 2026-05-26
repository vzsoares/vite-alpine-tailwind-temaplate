import { expect, test } from "@playwright/test";

// The prerendered status pages (served by the host for unknown paths / errors).
test("404 page renders with a way back home", async ({ page }) => {
    await page.goto("/404.html");
    await expect(
        page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Back home" })).toBeVisible();
});

test("500 page renders", async ({ page }) => {
    await page.goto("/500.html");
    await expect(
        page.getByRole("heading", { name: "Something went wrong" }),
    ).toBeVisible();
});
