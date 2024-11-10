import { deserialize, empty, type Build } from "$lib/build/Build";
import { page } from "$app/stores";
import { get } from "svelte/store";

export const findBuilds = (requestedPerks: number[]): Build[] => {
    console.log("FINDER DATA", get(page).data.finderData);
    return [
        deserialize("fGAzK-C_Y-bWbWJJ8c2t76aNCMXeoTN5c40-0Tq83ncwEHFXABzmbwH7249").unwrapOr(empty()),
        deserialize("zm1M@GCkABNYNYJahWAb_KJ8xjcwB@48iMqyiTkdODi1j8L6v2eGWsWF").unwrapOr(empty()),
    ];
};
