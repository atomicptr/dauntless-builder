import { phalanxBuilds } from "$lib/data/phalanx-builds";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse(phalanxBuilds);
}
