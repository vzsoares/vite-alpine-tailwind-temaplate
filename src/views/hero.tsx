const LOGOS = [
    {
        src: "https://vitejs.dev/logo.svg",
        alt: "Vite logo",
        class: "h-16 w-16 animate-pulse",
        style: "animation-duration: 3s",
    },
    {
        src: "https://alpinejs.dev/alpine_long.svg",
        alt: "Alpine.js logo",
        class: "h-10 dark:invert",
        style: "",
    },
    {
        src: "https://tailwindcss.com/favicons/apple-touch-icon.png",
        alt: "Tailwind CSS logo",
        class: "h-14 w-14",
        style: "",
    },
];

const GRID_BG =
    "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMTI4LCAxMjgsIDEyOCwgMC4xKSI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTQwIDQwVjBoNDB2NDBINDBeiS8+PC9nPjwvZz48L3N2Zz4=')] opacity-10";

/** Hero section: logo trio, headline, blurb, and call-to-action buttons. */
export function Hero(): JSX.Element {
    return (
        <div class="flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden">
            <div class="absolute inset-0 overflow-hidden z-0">
                <div class="absolute -inset-[10%] opacity-50 dark:opacity-30 bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-teal-900/30 blur-3xl"></div>
                <div class={GRID_BG}></div>
            </div>

            <div class="relative z-10 text-center max-w-3xl mx-auto">
                <div class="flex items-center justify-center space-x-8 mb-8">
                    <img
                        src={LOGOS[0].src}
                        alt={LOGOS[0].alt}
                        class={LOGOS[0].class}
                        style={LOGOS[0].style}
                    />
                    <div class="text-4xl font-light">+</div>
                    <img
                        src={LOGOS[1].src}
                        alt={LOGOS[1].alt}
                        class={LOGOS[1].class}
                    />
                    <div class="text-4xl font-light">+</div>
                    <img
                        src={LOGOS[2].src}
                        alt={LOGOS[2].alt}
                        class={LOGOS[2].class}
                    />
                </div>

                <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-transparent bg-clip-text">
                    Vite + Alpine + Tailwind
                </h1>

                <p class="text-xl opacity-80 mb-8 max-w-2xl mx-auto">
                    A lightweight and powerful starter template for building
                    modern, interactive web applications with speed and
                    simplicity.
                </p>

                <div class="flex flex-wrap justify-center gap-4">
                    <a
                        href="https://github.com/vzsoares/vite-alpine-tailwind-temaplate"
                        target="_blank"
                        class="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
                        rel="noopener"
                    >
                        Get Started
                    </a>
                    <a
                        href="https://github.com/vzsoares/vite-alpine-tailwind-temaplate"
                        target="_blank"
                        class="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 rounded-md font-medium transition-colors duration-200"
                        rel="noopener"
                    >
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}
