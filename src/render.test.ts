import { describe, expect, it } from "vitest";
import { Demo } from "./components/demo";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Nav } from "./components/nav";
import { SITE } from "./config";
import { posts } from "./content/posts";
import { Page as BlogIndex } from "./pages/blog";

// @kitajs/html components are pure functions that return an HTML string, so we
// can assert on their output directly — no browser needed.
function render(node: string | Promise<string>): string {
    if (typeof node !== "string") {
        throw new Error("expected a synchronous render");
    }
    return node;
}

describe("Nav", () => {
    it("links to the internal routes and the repo", () => {
        const html = render(Nav({ base: "/", active: "blog" }));
        expect(html).toContain('href="/blog/"');
        expect(html).toContain('href="/about/"');
        expect(html).toContain(SITE.repoUrl);
    });

    it("emphasizes the active route", () => {
        expect(render(Nav({ base: "/", active: "blog" }))).toContain(
            "text-brand-1 font-semibold",
        );
    });
});

describe("Footer", () => {
    it("shows the version and author", () => {
        const html = render(Footer({ version: "9.9.9" }));
        expect(html).toContain("v9.9.9");
        expect(html).toContain(SITE.author);
    });
});

describe("Demo", () => {
    it("wires the Alpine counter directives", () => {
        const html = render(Demo());
        expect(html).toContain('x-data="counter(0)"');
        expect(html).toContain("increment()");
        expect(html).toContain('data-testid="counter-value"');
    });
});

describe("Hero", () => {
    it("uses base-prefixed local logos, not third-party hot-links", () => {
        const html = render(Hero({ base: "/sub/" }));
        expect(html).toContain('src="/sub/logos/vite.svg"');
        expect(html).not.toContain("vitejs.dev");
    });
});

describe("Blog index", () => {
    it("links to every post", () => {
        const html = render(BlogIndex({ version: "0.0.0", base: "/" }));
        for (const post of posts) {
            expect(html).toContain(`/blog/${post.slug}/`);
        }
    });
});
