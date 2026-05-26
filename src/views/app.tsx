import { Demo } from "./demo";
import { Features } from "./features";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { Nav } from "./nav";

/**
 * The whole page, composed from JSX section components. Rendered to an HTML
 * string at build time (see the `render-jsx-app` plugin in `vite.config.js`)
 * and injected into `index.html`; Alpine then hydrates the static markup.
 */
export function App({ version }: { version: string }): JSX.Element {
    return (
        <div class="min-h-screen flex flex-col">
            <Nav />
            <Hero />
            <Features />
            <Demo />
            <Footer version={version} />
        </div>
    );
}
