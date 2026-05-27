/**
 * Central site configuration, shared by the build (`vite.config.ts`) and the UI
 * components. Keep this free of browser/Node-only APIs so both can import it.
 */
import { type Post, posts } from "./content/posts";

/** Path the site is served under (its GitHub Pages project subpath). */
export const BASE = "/vite-alpine-tailwind-temaplate/";

/** Absolute origin for canonical / Open Graph / sitemap URLs. Update on deploy. */
export const SITE_URL = `https://vzsoares.github.io${BASE}`;

/** Site identity, used across `<head>` metadata and the UI. */
export const SITE = {
    name: "Vite Alpine Tailwind Template",
    headline: "Vite + Alpine + Tailwind",
    description:
        "A lightweight starter combining Vite, Alpine.js and Tailwind CSS for fast, interactive web apps.",
    keywords: "vite, alpine.js, tailwind css, template, starter",
    author: "vzsoares",
    authorUrl: "https://github.com/vzsoares",
    repoUrl: "https://github.com/vzsoares/vite-alpine-tailwind-temaplate",
};

/** External links shown in the nav and footer. */
export const LINKS = [
    { href: "https://vitejs.dev", label: "Vite" },
    { href: "https://alpinejs.dev", label: "Alpine.js" },
    { href: "https://tailwindcss.com", label: "Tailwind" },
    { href: SITE.repoUrl, label: "GitHub" },
];

/** A site route: its page component (`src/pages/<page>.tsx`), output file, and
 *  `<head>` metadata. */
export interface RouteMeta {
    /** Emitted HTML file (and, with `index.html` stripped, the URL). */
    out: string;
    /** Page component name in `src/pages`. */
    page: string;
    title: string;
    description: string;
    /** e.g. "noindex" to keep status pages out of search + the sitemap. */
    robots?: string;
    /** Per-route payload passed to the page component (e.g. a blog post). */
    data?: Post;
}

export const ROUTES: RouteMeta[] = [
    {
        out: "index.html",
        page: "home",
        title: SITE.name,
        description: SITE.description,
    },
    {
        out: "about/index.html",
        page: "about",
        title: `About · ${SITE.name}`,
        description:
            "About the Vite + Alpine.js + Tailwind CSS starter template and the stack it is built on.",
    },
    {
        out: "blog/index.html",
        page: "blog",
        title: `Blog · ${SITE.name}`,
        description:
            "Lorem ipsum posts demonstrating build-time dynamic routes — one static page per post.",
    },
    // Build-time dynamic routes: one prerendered page per post.
    ...posts.map((post) => ({
        out: `blog/${post.slug}/index.html`,
        page: "post",
        title: `${post.title} · ${SITE.name}`,
        description: post.excerpt,
        data: post,
    })),
    {
        out: "search/index.html",
        page: "search",
        title: `Search · ${SITE.name}`,
        description: "Search the site.",
    },
    {
        out: "404.html",
        page: "404",
        title: "404 · Page not found",
        description: "The page you were looking for could not be found.",
        robots: "noindex",
    },
    {
        out: "500.html",
        page: "500",
        title: "500 · Something went wrong",
        description: "An unexpected error occurred.",
        robots: "noindex",
    },
];
