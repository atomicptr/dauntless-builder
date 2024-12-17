import { deserialize, empty, serialize } from "$lib/build/Build";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { validate } from "$lib/build/validate";
import { createETag } from "$lib/json";

export const load: PageLoad = async ({ parent, params, setHeaders }) => {
    const buildId = params.buildId;

    const build = deserialize(buildId);

    if (build.isErr()) {
        console.error("Could not deserialize build: ", build.error);
        // something went wrong, redirect
        // TODO: redirect to a special  error page?
        const newBuild = empty();
        const newBuildId = serialize(newBuild).unwrapOr("new"); // this should never fail...
        return redirect(302, `/b/${newBuildId}`);
    }

    const data = await parent();

    setHeaders({
        ETag: createETag(buildId + data.__meta?.buildTime.toString()),
        "Cache-Control": "max-age=3600, must-revalidate",
    });

    return {
        build: validate(build.unwrapOr(empty()), data),
    };
};
