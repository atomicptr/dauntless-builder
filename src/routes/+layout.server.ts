import { fetchBuildsData, fetchData, fetchFinderData, fetchI18nData } from "$lib/data/phalanx";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    return {
        ...(await fetchData()),
        buildsData: await fetchBuildsData(),
        finderData: await fetchFinderData(),
        i18nData: await fetchI18nData(),
    };
};
