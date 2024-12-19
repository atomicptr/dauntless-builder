import { makeJsonResponse } from "$lib/json";
import { phalanxData } from "$lib/data/phalanx-data";

export const prerender = true;

export async function GET() {
    return makeJsonResponse(phalanxData);
}
