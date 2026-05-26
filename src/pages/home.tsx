import { Demo } from "../components/demo";
import { Features } from "../components/features";
import { Hero } from "../components/hero";
import { Layout } from "../components/layout";

/** The home route ("/"). Composed into the shared Layout. */
export function Page({
    version,
    base,
}: {
    version: string;
    base: string;
}): JSX.Element {
    return (
        <Layout version={version} base={base} active="home">
            <Hero />
            <Features />
            <Demo />
        </Layout>
    );
}
