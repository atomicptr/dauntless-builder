import { phalanxI18nData } from "$lib/data/phalanx-i18n";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse(phalanxI18nData);
}
