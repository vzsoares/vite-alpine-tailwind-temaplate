const LINKS = [
    { href: "https://vitejs.dev", label: "Vite" },
    { href: "https://alpinejs.dev", label: "Alpine.js" },
    { href: "https://tailwindcss.com", label: "Tailwind" },
    {
        href: "https://github.com/vzsoares/vite-alpine-tailwind-temaplate",
        label: "GitHub",
    },
];

/** Page footer; the version string is passed in from the build (package.json). */
export function Footer({ version }: { version: string }): JSX.Element {
    return (
        <footer class="py-8 px-8 border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div class="mb-4 md:mb-0">
                    <span class="opacity-70">Created by </span>
                    <a
                        href="https://github.com/vzsoares"
                        target="_blank"
                        class="font-medium hover:text-purple-500"
                        rel="noopener"
                    >
                        vzsoares
                    </a>
                </div>
                <div class="flex items-center space-x-4">
                    {LINKS.map((link) => (
                        <a
                            safe
                            href={link.href}
                            target="_blank"
                            class="opacity-70 hover:opacity-100 transition-opacity"
                            rel="noopener"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
            <div class="max-w-6xl mx-auto mt-6 text-center text-sm opacity-60">
                <span safe data-testid="app-version">
                    v{version}
                </span>
            </div>
        </footer>
    );
}
