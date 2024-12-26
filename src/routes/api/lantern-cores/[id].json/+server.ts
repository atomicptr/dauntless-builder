import { phalanxLanternCores, phalanxLanternCoresMeta } from "$lib/data/phalanx-lantern-cores";
import { makeJsonResponse } from "$lib/json";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () => {
    return Object.keys(phalanxLanternCores).map((id) => ({ id }));
};

export const GET: RequestHandler = ({ params }) => {
    if (!(params.id in phalanxLanternCores)) {
        error(404);
    }

    return makeJsonResponse({
        __meta: phalanxLanternCoresMeta,
        ...phalanxLanternCores[params.id],
    });
};
