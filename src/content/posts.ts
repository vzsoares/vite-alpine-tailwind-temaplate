/**
 * Blog content. Each entry becomes its own statically prerendered page at
 * `/blog/<slug>/` (see the `ROUTES` derivation in `src/config.ts`) — the
 * build-time "dynamic route" pattern: params known at build, one file per item.
 *
 * `body` is Markdown, rendered to HTML at build time (see `src/lib/markdown.ts`
 * — `marked` + Shiki highlighting) and styled with `@tailwindcss/typography`.
 */
export interface Post {
    slug: string;
    title: string;
    /** ISO date (YYYY-MM-DD). */
    date: string;
    excerpt: string;
    /** Markdown body. */
    body: string;
}

export const posts: Post[] = [
    {
        slug: "lorem-ipsum-dolor",
        title: "Lorem Ipsum Dolor",
        date: "2024-01-15",
        excerpt:
            "An introduction to the timeless placeholder text and why it still shows up everywhere.",
        body: `Lorem ipsum dolor sit amet, **consectetur adipiscing elit**. Sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.

## Why placeholders endure

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. A few reasons it sticks around:

- It is _content-neutral_, so it never distracts from layout.
- Everyone recognizes it instantly.
- It fills space at a realistic density.

\`\`\`ts
function lorem(words: number): string {
  return Array.from({ length: words }, () => "lorem").join(" ");
}
\`\`\`

> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
> deserunt mollit anim id est laborum.`,
    },
    {
        slug: "sed-do-eiusmod",
        title: "Sed Do Eiusmod",
        date: "2024-02-02",
        excerpt:
            "Notes on tempor incididunt and the quiet art of filling space gracefully.",
        body: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem
accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

## Three rules

1. Keep paragraphs short.
2. Vary the sentence length.
3. Never let the filler outshine the real thing.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
    },
    {
        slug: "ut-enim-ad-minim",
        title: "Ut Enim Ad Minim",
        date: "2024-03-10",
        excerpt:
            "A closing piece on veniam, quis nostrud, and shipping the placeholder.",
        body: `At vero eos et accusamus et iusto odio dignissimos ducimus qui
blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas
molestias excepturi sint occaecati cupiditate non provident.

## Shipping it

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
maxime placeat facere possimus, omnis voluptas assumenda est.`,
    },
];
