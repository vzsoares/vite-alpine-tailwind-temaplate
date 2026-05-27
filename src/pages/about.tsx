import { Layout } from "../components/layout";

const STACK = [
    "Vite for the dev server and optimized builds",
    "Alpine.js for sprinkles of client-side interactivity",
    "Tailwind CSS v4 for styling",
    "@kitajs/html for type-safe JSX, prerendered at build time",
];

/** The about route ("/about/"). Demonstrates a second prerendered page whose
 *  Alpine directives hydrate after client-side navigation. */
export function Page({
    version,
    base,
}: {
    version: string;
    base: string;
}): JSX.Element {
    return (
        <Layout version={version} base={base} active="about">
            <div class="flex-1 py-16 px-8">
                <div class="max-w-2xl mx-auto">
                    <h1 class="text-4xl font-bold mb-6 bg-gradient-to-r from-brand-1 to-brand-2 text-transparent bg-clip-text">
                        About this template
                    </h1>
                    <p class="opacity-80 mb-6">
                        A batteries-included starter that authors its whole UI
                        in JSX and renders it to static HTML at build time, then
                        lets Alpine.js hydrate the markup. This page is a second
                        prerendered route — navigation uses plain links plus the
                        native View Transitions API.
                    </p>

                    <h2 class="text-2xl font-semibold mb-4">The stack</h2>
                    <ul class="list-disc list-inside space-y-2 opacity-80 mb-10">
                        {STACK.map((item) => (
                            <li safe>{item}</li>
                        ))}
                    </ul>

                    <h2 class="text-2xl font-semibold mb-4">FAQ</h2>
                    <div
                        x-data="{ open: false }"
                        class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                        <button
                            type="button"
                            data-testid="faq-toggle"
                            x-on:click="open = !open"
                            class="w-full text-left px-5 py-4 font-medium flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            Does Alpine still work after navigating here?
                            <span x-text="open ? '−' : '+'">+</span>
                        </button>
                        <p
                            x-show="open"
                            x-cloak=""
                            data-testid="faq-answer"
                            class="px-5 pb-4 opacity-80"
                        >
                            Yes — each route ships complete static HTML, and
                            Alpine hydrates it on load, so directives like this
                            accordion are fully interactive on every page.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
