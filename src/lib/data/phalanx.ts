import { PHALANX_BASE_URL, PHALANX_API_KEY } from "$env/static/private";
import type { I18nData, BuildsData, Data, FinderData } from "./phalanx-types";

const fetchApi = async <T>(endpoint: string): Promise<T> => {
    const endpointExt = PHALANX_API_KEY === "static" || PHALANX_API_KEY === undefined ? ".json" : "";

    const res = await fetch(PHALANX_BASE_URL + endpoint + endpointExt, {
        headers: {
            "X-Phalanx-Api-Key": PHALANX_API_KEY,
        },
    });

    if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
    }

    return await res.json();
};

export const fetchData = async () => fetchApi<Data>("/api/data");

export const fetchBuildsData = async () => fetchApi<BuildsData>("/api/builds");

export const fetchFinderData = async () => fetchApi<FinderData>("/api/finder-data");

export const fetchI18nData = async () => fetchApi<I18nData>("/api/i18n");
