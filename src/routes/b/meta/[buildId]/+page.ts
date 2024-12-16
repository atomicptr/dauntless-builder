import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
    const { metaBuilds } = await parent();

    const build = metaBuilds.filter((b) => b.id.toString() === params.buildId)[0];

    if (!build) {
        error(404);
    }

    return { build };
};
