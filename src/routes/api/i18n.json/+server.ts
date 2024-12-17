import { fetchI18nData } from "$lib/data/phalanx";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    const data = await fetchI18nData();
    return makeJsonResponse(data);
}
