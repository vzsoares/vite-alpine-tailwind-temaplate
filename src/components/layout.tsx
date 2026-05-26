import type { PropsWithChildren } from "@kitajs/html";
import { Footer } from "./footer";
import { Nav } from "./nav";

type LayoutProps = PropsWithChildren<{
    /** App version, shown in the footer (passed in from the build). */
    version: string;
    /** Base URL the site is served under; used to build internal links. */
    base: string;
    /** Which nav link to highlight; omit on pages with no matching link. */
    active?: "home" | "about";
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
            <Nav base={base} active={active} />
            {children}
            <Footer version={version} />
        </div>
    );
}
