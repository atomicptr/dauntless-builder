import { fetchBuildsData, fetchData, fetchFinderData } from "$lib/data/phalanx";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    return {
        ...(await fetchData()),
        buildsData: await fetchBuildsData(),
        finderData: await fetchFinderData(),
    };
};
