import { PHALANX_BASE_URL, PHALANX_API_KEY } from "$env/static/private";
import type { Data, FinderData } from "./phalanx-types";

const fetchApi = async <T>(endpoint: string): Promise<T> => {
    const res = await fetch(PHALANX_BASE_URL + endpoint, {
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

export const fetchFinderData = async () => fetchApi<FinderData>("/api/finder-data");
