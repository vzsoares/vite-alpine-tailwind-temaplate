import { expect, test } from "@playwright/test";

test("navigates between the home and about pages", async ({ page }) => {
    await page.goto("/");
    await expect(
        page.getByRole("heading", { name: "Vite + Alpine + Tailwind" }),
    ).toBeVisible();

    // Navigate to the about route.
    await page.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about\/$/);
    await expect(
        page.getByRole("heading", { name: "About this template" }),
    ).toBeVisible();

    // Alpine hydrates the prerendered about page too.
    const answer = page.getByTestId("faq-answer");
    await expect(answer).toBeHidden();
    await page.getByTestId("faq-toggle").click();
    await expect(answer).toBeVisible();

    // ...and back home.
    await page.getByRole("link", { name: "Home", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(
        page.getByRole("heading", { name: "Vite + Alpine + Tailwind" }),
    ).toBeVisible();
});
