import Persist from "@alpinejs/persist";
import Alpine from "alpinejs";
// htmx is bundled and ready: add `hx-*` attributes to use it (server-driven
// HTML swaps). Dormant until used. See docs/htmx.md for going server-side.
import htmx from "htmx.org";
import { registerComponents } from "./alpine";

declare global {
    interface Window {
        Alpine: typeof Alpine;
        htmx: typeof htmx;
    }
}

// Expose Alpine and htmx on the window object.
window.Alpine = Alpine;
window.htmx = htmx;

document.addEventListener("DOMContentLoaded", () => {
    // The page markup is prerendered from JSX into index.html at build time
    // (see the render-jsx-app plugin in vite.config.js). Register the typed
    // components, then start Alpine to hydrate that static markup.
    Alpine.plugin(Persist);
    registerComponents();
    Alpine.start();
    console.log("Alpine started");
});
