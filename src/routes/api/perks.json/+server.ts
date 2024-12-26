import { phalanxPerks, phalanxPerksMeta } from "$lib/data/phalanx-perks";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse({
        __meta: phalanxPerksMeta,
        items: phalanxPerks,
    });
}
