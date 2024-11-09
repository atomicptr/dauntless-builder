import { fetchFinderData } from "$lib/data/phalanx";

export const prerender = true;

export async function GET() {
    const data = await fetchFinderData();
    return new Response(JSON.stringify(data, null, "    "), {
        headers: {
            "Cache-Control": "max-age=0, s-maxage=3600",
            "Content-Type": "application/json",
        },
    });
}
