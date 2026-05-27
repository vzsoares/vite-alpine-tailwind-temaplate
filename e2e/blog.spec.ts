import { expect, test } from "@playwright/test";
import { posts } from "../src/content/posts";

test("blog index links to every prerendered post", async ({ page }) => {
    await page.goto("/blog/");
    await expect(
        page.getByRole("heading", { name: "Blog", level: 1 }),
    ).toBeVisible();
    for (const post of posts) {
        await expect(
            page.getByRole("link", { name: post.title }),
        ).toBeVisible();
    }
});

test("each post is a static page that renders its content", async ({
    page,
}) => {
    for (const post of posts) {
        const failures: string[] = [];
        page.on("response", (res) => {
            if (res.status() >= 400)
                failures.push(`${res.status()} ${res.url()}`);
        });

        await page.goto(`/blog/${post.slug}/`);
        await expect(
            page.getByRole("heading", { name: post.title, level: 1 }),
        ).toBeVisible();
        // Body content from the per-route data payload is present.
        await expect(page.getByText(post.body[0])).toBeVisible();
        // Deep paths still resolve their (base-prefixed) assets.
        expect(failures, `no failed requests on /blog/${post.slug}/`).toEqual(
            [],
        );
    }
});

test("navigates from the blog index into a post", async ({ page }) => {
    await page.goto("/blog/");
    const first = posts[0];
    await page.getByRole("link", { name: first.title }).click();
    await expect(page).toHaveURL(new RegExp(`/blog/${first.slug}/$`));
    await expect(
        page.getByRole("heading", { name: first.title, level: 1 }),
    ).toBeVisible();
});
