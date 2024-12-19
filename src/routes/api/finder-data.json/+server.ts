import { phalanxFinderData } from "$lib/data/phalanx-finder-data";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse(phalanxFinderData);
}
