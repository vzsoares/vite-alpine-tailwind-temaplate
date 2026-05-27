/**
 * Blog content. Each entry becomes its own statically prerendered page at
 * `/blog/<slug>/` (see the `ROUTES` derivation in `src/config.ts`) — the
 * build-time "dynamic route" pattern: params known at build, one file per item.
 */
export interface Post {
    slug: string;
    title: string;
    /** ISO date (YYYY-MM-DD). */
    date: string;
    excerpt: string;
    /** Body paragraphs. */
    body: string[];
}

export const posts: Post[] = [
    {
        slug: "lorem-ipsum-dolor",
        title: "Lorem Ipsum Dolor",
        date: "2024-01-15",
        excerpt:
            "An introduction to the timeless placeholder text and why it still shows up everywhere.",
        body: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ],
    },
    {
        slug: "sed-do-eiusmod",
        title: "Sed Do Eiusmod",
        date: "2024-02-02",
        excerpt:
            "Notes on tempor incididunt and the quiet art of filling space gracefully.",
        body: [
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est.",
        ],
    },
    {
        slug: "ut-enim-ad-minim",
        title: "Ut Enim Ad Minim",
        date: "2024-03-10",
        excerpt:
            "A closing piece on veniam, quis nostrud, and shipping the placeholder.",
        body: [
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
            "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
        ],
    },
];
