import Alpine from "alpinejs";

/** Reactive state for the `counter` demo component. */
export interface CounterState {
    count: number;
    increment(): void;
    decrement(): void;
    reset(): void;
}

/**
 * Registers the typed Alpine.js components used in index.html.
 * Must run before `Alpine.start()`.
 */
export function registerComponents(): void {
    Alpine.data(
        "counter",
        (start: number = 0): CounterState => ({
            count: start,
            increment(this: CounterState) {
                this.count++;
            },
            decrement(this: CounterState) {
                this.count--;
            },
            reset(this: CounterState) {
                this.count = start;
            },
        }),
    );
}
