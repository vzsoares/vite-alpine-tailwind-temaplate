import { ErrorPage } from "../components/error-page";

/** 404 route. GitHub Pages serves the built 404.html for unknown paths. */
export function Page({
    version,
    base,
}: {
    version: string;
    base: string;
}): JSX.Element {
    return (
        <ErrorPage
            version={version}
            base={base}
            code="404"
            title="Page not found"
            message="The page you're looking for doesn't exist or may have moved."
        />
    );
}
