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
    // Register typed components before starting Alpine
    registerComponents();
    Alpine.start();
    console.log("Alpine started");
});
