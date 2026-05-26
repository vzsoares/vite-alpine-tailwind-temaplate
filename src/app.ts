import Alpine from "alpinejs";

declare global {
    interface Window {
        Alpine: typeof Alpine;
    }
}

// Make Alpine available to the window object
window.Alpine = Alpine;

document.addEventListener("DOMContentLoaded", () => {
    // Start Alpine
    Alpine.start();
    console.log("Alpine started");
});
