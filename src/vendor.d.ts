// Ambient type declarations for packages that ship without TypeScript types.

declare module "@alpinejs/persist" {
    const Persist: (Alpine: typeof import("alpinejs")) => void;
    export default Persist;
}
