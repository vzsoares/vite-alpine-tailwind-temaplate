import { Layout } from "../components/layout";

/** Site search ("/search/"), powered by Pagefind.
 *
 * Pagefind indexes the built site in a post-build step (`pagefind --site dist`),
 * so its assets only exist in the production build — the UI is rendered in prod
 * only (the `prod` flag is passed by the render plugin); dev shows a hint. */
export function Page({
    version,
    base,
    prod,
}: {
    version: string;
    base: string;
    prod?: boolean;
}): JSX.Element {
    // `safe`-prefixed: trusted inline script, injected raw (not escaped).
    // Pagefind UI derives result URLs from `bundlePath`, so the site base is
    // already applied — no manual URL rewriting needed.
    const safeInit = `new PagefindUI({
        element: "#search",
        bundlePath: "${base}pagefind/",
        showSubResults: true,
    });`;

    return (
        <Layout version={version} base={base} active="search">
            <div class="flex-1 py-16 px-8">
                <div class="max-w-2xl mx-auto">
                    <h1 class="text-4xl font-bold mb-6 bg-gradient-to-r from-brand-1 to-brand-2 text-transparent bg-clip-text">
                        Search
                    </h1>
                    {prod ? (
                        <>
                            <link
                                rel="stylesheet"
                                href={`${base}pagefind/pagefind-ui.css`}
                            />
                            <div id="search"></div>
                            <script
                                src={`${base}pagefind/pagefind-ui.js`}
                            ></script>
                            <script>{safeInit}</script>
                        </>
                    ) : (
                        <p class="opacity-80">
                            Search is generated at build time. Try it with a
                            production build:
                            <code class="text-brand-1"> bun run build </code>
                            then
                            <code class="text-brand-1"> bun run preview</code>.
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
