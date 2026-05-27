import { SITE } from "../config";

/** Top navigation: brand (links home), internal route links, dark-mode toggle. */
export function Nav({
    base,
    active,
}: {
    base: string;
    active?: "home" | "about" | "blog" | "search";
}): JSX.Element {
    const routes = [
        { href: base, label: "Home", key: "home" },
        { href: `${base}blog/`, label: "Blog", key: "blog" },
        { href: `${base}about/`, label: "About", key: "about" },
        { href: `${base}search/`, label: "Search", key: "search" },
    ];

    return (
        <nav class="py-6 px-8 flex justify-between items-center">
            <a href={base} class="flex items-center">
                <span class="text-2xl font-bold bg-gradient-to-r from-brand-1 to-brand-2 text-transparent bg-clip-text">
                    VAT
                </span>
                <span class="text-lg ml-2 opacity-80">Template</span>
            </a>

            <div class="hidden md:flex items-center space-x-8">
                {routes.map((route) => (
                    <a
                        safe
                        href={route.href}
                        class={
                            route.key === active
                                ? "text-brand-1 font-semibold"
                                : "hover:text-brand-1 transition-colors"
                        }
                    >
                        {route.label}
                    </a>
                ))}
                <a
                    href={SITE.repoUrl}
                    target="_blank"
                    rel="noopener"
                    class="hover:text-gray-500 transition-colors"
                >
                    GitHub
                </a>
            </div>

            <button
                type="button"
                x-on:click="darkMode = !darkMode"
                class="btn btn-ghost btn-circle"
                aria-label="Toggle dark mode"
            >
                <svg
                    x-show="!darkMode"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <svg
                    x-show="darkMode"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </nav>
    );
}
