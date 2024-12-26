import { phalanxLanternCores, phalanxLanternCoresMeta } from "$lib/data/phalanx-lantern-cores";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse({
        __meta: phalanxLanternCoresMeta,
        items: phalanxLanternCores,
    });
}
