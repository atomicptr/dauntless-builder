import { fetchFinderData } from "$lib/data/phalanx";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        finderData: await fetchFinderData(),
    };
};
