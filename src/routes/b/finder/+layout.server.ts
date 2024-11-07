import { fetchFinderData } from "$lib/data/phalanx";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    return {
        finderData: await fetchFinderData(),
    };
};
