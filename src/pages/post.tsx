import { Layout } from "../components/layout";
import { type Post, posts } from "../content/posts";
import { renderMarkdown } from "../lib/markdown";

/** A single blog post ("/blog/<slug>/"). The `data` payload is supplied per
 *  route by the render plugin (from `ROUTES` in src/config.ts). */
export function Page({
    version,
    base,
    data,
}: {
    version: string;
    base: string;
    data: Post;
}): JSX.Element {
    // Render the Markdown body (with Shiki highlighting) to HTML. The `safe`
    // prefix tells @kitajs/html's XSS scanner this is trusted (our own content),
    // so it is injected as raw HTML rather than escaped.
    const safeBody = renderMarkdown(data.body);

    const index = posts.findIndex((post) => post.slug === data.slug);
    const prev = posts[index - 1];
    const next = posts[index + 1];

    return (
        <Layout version={version} base={base} active="blog">
            <article class="flex-1 py-16 px-8">
                <div class="max-w-2xl mx-auto">
                    <a
                        href={`${base}blog/`}
                        class="text-sm text-brand-1 hover:underline"
                    >
                        ← Back to blog
                    </a>
                    <h1
                        safe
                        class="text-4xl font-bold mt-4 mb-2 bg-gradient-to-r from-brand-1 to-brand-2 text-transparent bg-clip-text"
                    >
                        {data.title}
                    </h1>
                    <p safe class="text-sm opacity-60 mb-8">
                        {data.date}
                    </p>
                    <div class="prose dark:prose-invert max-w-none">
                        {safeBody}
                    </div>

                    <nav class="mt-12 flex justify-between gap-4 border-t border-gray-200 dark:border-gray-800 pt-6 text-sm">
                        {prev ? (
                            <a
                                safe
                                href={`${base}blog/${prev.slug}/`}
                                class="text-brand-1 hover:underline"
                            >
                                ← {prev.title}
                            </a>
                        ) : (
                            <span></span>
                        )}
                        {next ? (
                            <a
                                safe
                                href={`${base}blog/${next.slug}/`}
                                class="text-brand-1 hover:underline text-right"
                            >
                                {next.title} →
                            </a>
                        ) : (
                            <span></span>
                        )}
                    </nav>
                </div>
            </article>
        </Layout>
    );
}
