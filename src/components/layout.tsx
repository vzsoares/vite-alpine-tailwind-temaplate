import type { PropsWithChildren } from "@kitajs/html";
import { Footer } from "./footer";
import { Nav } from "./nav";

type LayoutProps = PropsWithChildren<{
    /** App version, shown in the footer (passed in from the build). */
    version: string;
    /** Base URL the site is served under; used to build internal links. */
    base: string;
    /** Which nav link to highlight; omit on pages with no matching link. */
    active?: "home" | "about" | "blog";
}>;

/** Shared page chrome (nav + footer) wrapping each route's content. */
export function Layout({
    version,
    base,
    active,
    children,
}: LayoutProps): JSX.Element {
    return (
        <div class="min-h-screen flex flex-col">
            <a
                href="#main"
                class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-purple-600 focus:px-4 focus:py-2 focus:text-white"
            >
                Skip to content
            </a>
            <Nav base={base} active={active} />
            <main id="main" class="flex flex-1 flex-col">
                {children}
            </main>
            <Footer version={version} />
        </div>
    );
}
