import { marked } from "marked";
import { Layout } from "../components/layout";
import type { Post } from "../content/posts";

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
    // Render the Markdown body to HTML. The `safe` prefix tells @kitajs/html's
    // XSS scanner this is trusted (it comes from our own content), so it is
    // injected as raw HTML rather than escaped.
    const safeBody = marked.parse(data.body);

    return (
        <Layout version={version} base={base} active="blog">
            <article class="flex-1 py-16 px-8">
                <div class="max-w-2xl mx-auto">
                    <a
                        href={`${base}blog/`}
                        class="text-sm text-purple-500 hover:underline"
                    >
                        ← Back to blog
                    </a>
                    <h1
                        safe
                        class="text-4xl font-bold mt-4 mb-2 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text"
                    >
                        {data.title}
                    </h1>
                    <p safe class="text-sm opacity-60 mb-8">
                        {data.date}
                    </p>
                    <div class="prose dark:prose-invert max-w-none">
                        {safeBody}
                    </div>
                </div>
            </article>
        </Layout>
    );
}
