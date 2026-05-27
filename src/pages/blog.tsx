import { Layout } from "../components/layout";
import { posts } from "../content/posts";

/** Blog index ("/blog/"): links to every post. */
export function Page({
    version,
    base,
}: {
    version: string;
    base: string;
}): JSX.Element {
    return (
        <Layout version={version} base={base} active="blog">
            <div class="flex-1 py-16 px-8">
                <div class="max-w-2xl mx-auto">
                    <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                        Blog
                    </h1>
                    <p class="opacity-80 mb-10">
                        Lorem ipsum posts — each one is prerendered to its own
                        static page at build time.
                    </p>
                    <ul class="space-y-8">
                        {posts.map((post) => (
                            <li>
                                <a
                                    href={`${base}blog/${post.slug}/`}
                                    class="group block"
                                >
                                    <h2
                                        safe
                                        class="text-2xl font-semibold group-hover:text-purple-500 transition-colors"
                                    >
                                        {post.title}
                                    </h2>
                                    <p safe class="text-sm opacity-60 mt-1">
                                        {post.date}
                                    </p>
                                    <p safe class="opacity-80 mt-2">
                                        {post.excerpt}
                                    </p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
