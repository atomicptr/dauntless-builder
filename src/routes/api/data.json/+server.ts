import dataJson from "$lib/static/data.json";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse(dataJson);
}
