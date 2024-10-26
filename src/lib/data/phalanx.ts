import { PHALANX_BASE_URL, PHALANX_API_KEY } from "$env/static/private";
import type { Data } from "./phalanx-types";

export const fetchData = async (): Promise<Data> => {
    const res = await fetch(PHALANX_BASE_URL + "/api/data", {
        headers: {
            "X-Phalanx-Api-Key": PHALANX_API_KEY,
        },
    });

    if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
    }

    return await res.json();
};
