import Alpine from "alpinejs";
import { registerComponents } from "./components";

declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

// Make Alpine available to the window object
window.Alpine = Alpine;

document.addEventListener("DOMContentLoaded", () => {
    // The page markup is prerendered from JSX into index.html at build time
    // (see the render-jsx-app plugin in vite.config.js). Register the typed
    // components, then start Alpine to hydrate that static markup.
    registerComponents();
    Alpine.start();
    console.log("Alpine started");
});
