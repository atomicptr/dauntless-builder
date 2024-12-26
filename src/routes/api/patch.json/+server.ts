import { phalanxPatch, phalanxPatchMeta } from "$lib/data/phalanx-patch";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse({
        __meta: phalanxPatchMeta,
        ...phalanxPatch,
    });
}
