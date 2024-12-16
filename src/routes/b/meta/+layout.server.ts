import { fetchBuildsData } from "$lib/data/phalanx";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    return {
        buildsData: await fetchBuildsData(),
    };
};
