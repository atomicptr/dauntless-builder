import { fetchBuildsData } from "$lib/data/phalanx";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    const data = await fetchBuildsData();
    return makeJsonResponse(data);
}
