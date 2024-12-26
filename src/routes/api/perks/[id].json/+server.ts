import { phalanxPerks, phalanxPerksMeta } from "$lib/data/phalanx-perks";
import { makeJsonResponse } from "$lib/json";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () => {
    return Object.keys(phalanxPerks).map((id) => ({ id }));
};

export const GET: RequestHandler = ({ params }) => {
    if (!(params.id in phalanxPerks)) {
        error(404);
    }

    return makeJsonResponse({
        __meta: phalanxPerksMeta,
        ...phalanxPerks[params.id],
    });
};
