import { deserialize, empty, serialize } from "$lib/build/Build";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    const buildId = params.buildId;

    const build = deserialize(buildId);

    if (build.isErr()) {
        // something went wrong, redirect
        // TODO: redirect to a special  error page?
        const newBuild = empty();
        const newBuildId = serialize(newBuild).unwrapOr("new"); // this should never fail...
        return redirect(302, `/b/${newBuildId}`);
    }

    return {
        build: build.unwrapOr(empty()),
    };
};
