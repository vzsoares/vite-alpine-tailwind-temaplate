import { Layout } from "./layout";

type ErrorPageProps = {
    version: string;
    base: string;
    /** HTTP status code shown large (e.g. "404"). */
    code: string;
    title: string;
    message: string;
};

/** Shared layout for status pages (404, 500). */
export function ErrorPage({
    version,
    base,
    code,
    title,
    message,
}: ErrorPageProps): JSX.Element {
    return (
        <Layout version={version} base={base}>
            <div class="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
                <p
                    safe
                    class="text-7xl font-bold mb-4 bg-gradient-to-r from-brand-1 to-brand-2 text-transparent bg-clip-text"
                >
                    {code}
                </p>
                <h1 safe class="text-3xl font-bold mb-3">
                    {title}
                </h1>
                <p safe class="opacity-80 mb-8 max-w-md">
                    {message}
                </p>
                <a
                    href={base}
                    class="px-6 py-3 bg-gradient-to-r from-brand-1 to-brand-2 hover:opacity-90 text-white font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    Back home
                </a>
            </div>
        </Layout>
    );
}
