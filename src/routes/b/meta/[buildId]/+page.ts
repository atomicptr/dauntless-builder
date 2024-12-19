import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { phalanxBuilds } from "$lib/data/phalanx-builds";

export const load: PageLoad = async ({ params }) => {
    const build = phalanxBuilds.meta.filter((b) => b.id.toString() === params.buildId)[0];

    if (!build) {
        error(404);
    }

    return { build };
};
