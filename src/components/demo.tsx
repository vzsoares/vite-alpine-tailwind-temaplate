/**
 * The interactive counter card. It is plain prerendered HTML with Alpine
 * directives; the reactivity comes from the typed `counter()` component
 * registered in `components.ts`, which `Alpine.start()` wires up on load.
 */
function Counter(): JSX.Element {
    return (
        <div
            x-data="counter(0)"
            data-testid="demo-card"
            class="max-w-sm mx-auto p-6 rounded-xl bg-white/10 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-center"
        >
            <p
                data-testid="counter-value"
                x-text="count"
                class="text-5xl font-bold mb-6 bg-gradient-to-r from-brand-1 to-brand-2 text-transparent bg-clip-text"
            >
                0
            </p>
            <div class="flex justify-center gap-3">
                <button
                    type="button"
                    data-testid="counter-decrement"
                    x-on:click="decrement()"
                    aria-label="Decrement"
                    class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 font-medium transition-colors"
                >
                    −
                </button>
                <button
                    type="button"
                    data-testid="counter-reset"
                    x-on:click="reset()"
                    class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 font-medium transition-colors"
                >
                    Reset
                </button>
                <button
                    type="button"
                    data-testid="counter-increment"
                    x-on:click="increment()"
                    aria-label="Increment"
                    class="px-4 py-2 rounded-md bg-gradient-to-r from-brand-1 to-brand-2 hover:opacity-90 text-white font-medium transition-all"
                >
                    +
                </button>
            </div>
        </div>
    );
}

/** Interactive demo section wrapping the counter. */
export function Demo(): JSX.Element {
    return (
        <div class="py-16 px-8">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold text-center mb-4">
                    Interactive Demo
                </h2>
                <p class="text-center opacity-80 mb-12 max-w-2xl mx-auto">
                    A typed Alpine component registered with
                    <code class="font-mono text-brand-1"> counter() </code>
                    in
                    <code class="font-mono text-brand-1"> alpine.ts</code>,
                    authored entirely in JSX.
                </p>
                <Counter />
            </div>
        </div>
    );
}
