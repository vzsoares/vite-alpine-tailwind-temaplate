import { LINKS, SITE } from "../config";

/** Page footer; the version string is passed in from the build (package.json). */
export function Footer({ version }: { version: string }): JSX.Element {
    return (
        <footer class="py-8 px-8 border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div class="mb-4 md:mb-0">
                    <span class="opacity-70">Created by </span>
                    <a
                        safe
                        href={SITE.authorUrl}
                        target="_blank"
                        class="link link-hover font-medium"
                        rel="noopener"
                    >
                        {SITE.author}
                    </a>
                </div>
                <div class="flex items-center space-x-4">
                    {LINKS.map((link) => (
                        <a
                            safe
                            href={link.href}
                            target="_blank"
                            class="link link-hover opacity-70 hover:opacity-100"
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
