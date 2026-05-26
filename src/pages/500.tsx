import { ErrorPage } from "../components/error-page";

/** 500 route. Static hosts don't serve this automatically, but CDNs/servers
 *  can be pointed at the built 500.html as a custom error document. */
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
            code="500"
            title="Something went wrong"
            message="An unexpected error occurred on our end. Please try again later."
        />
    );
}
