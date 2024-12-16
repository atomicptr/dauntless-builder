import { fetchData, fetchI18nData } from "$lib/data/phalanx";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    return {
        ...(await fetchData()),
        i18nData: await fetchI18nData(),
    };
};
