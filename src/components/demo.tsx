/**
 * The interactive counter card. It is plain prerendered HTML with Alpine
 * directives; the reactivity comes from the typed `counter()` component
 * registered in `components.ts`, which `Alpine.start()` wires up on load.
 */
function Counter(): JSX.Element {
    // Built with daisyUI components (card / btn) to show the library in use;
    // the data-testids and Alpine directives keep behaviour and tests intact.
    return (
        <div
            x-data="counter(0)"
            data-testid="demo-card"
            class="card max-w-sm mx-auto bg-base-100 border border-base-300 shadow-sm"
        >
            <div class="card-body items-center text-center">
                <p
                    data-testid="counter-value"
                    x-text="count"
                    class="text-5xl font-bold bg-gradient-to-r from-brand-1 to-brand-2 text-transparent bg-clip-text"
                >
                    0
                </p>
                <div class="card-actions justify-center mt-4">
                    <button
                        type="button"
                        data-testid="counter-decrement"
                        x-on:click="decrement()"
                        aria-label="Decrement"
                        class="btn btn-outline"
                    >
                        −
                    </button>
                    <button
                        type="button"
                        data-testid="counter-reset"
                        x-on:click="reset()"
                        class="btn btn-ghost"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        data-testid="counter-increment"
                        x-on:click="increment()"
                        aria-label="Increment"
                        class="btn btn-primary"
                    >
                        +
                    </button>
                </div>
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
