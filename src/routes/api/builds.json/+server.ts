import buildsJson from "$lib/static/builds.json";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse(buildsJson);
}
