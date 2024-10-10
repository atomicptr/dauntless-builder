import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    const buildId = params.buildId;

    // TODO: handle validation / parsing / etc.

    return {
        buildId,
    };
}
