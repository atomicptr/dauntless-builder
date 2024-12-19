import { makeJsonResponse } from "$lib/json";
import finderDataJson from "$lib/static/finder-data.json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse(finderDataJson);
}
