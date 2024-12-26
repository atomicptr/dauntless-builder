import { phalanxArmours, phalanxArmoursMeta } from "$lib/data/phalanx-armours";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse({
        __meta: phalanxArmoursMeta,
        items: phalanxArmours,
    });
}
