import { makeJsonResponse } from "$lib/json";
import i18nJson from "$lib/static/i18n.json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse(i18nJson);
}
