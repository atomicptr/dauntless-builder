import { fetchBuildsData } from "$lib/data/phalanx";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    const buildsData = await fetchBuildsData();

    return { metaBuilds: buildsData.meta ?? [] };
};
