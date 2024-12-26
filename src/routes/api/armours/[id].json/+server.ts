import { phalanxArmours, phalanxArmoursMeta } from "$lib/data/phalanx-armours";
import { makeJsonResponse } from "$lib/json";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () => {
    return Object.keys(phalanxArmours).map((id) => ({ id }));
};

export const GET: RequestHandler = ({ params }) => {
    if (!(params.id in phalanxArmours)) {
        error(404);
    }

    return makeJsonResponse({
        __meta: phalanxArmoursMeta,
        ...phalanxArmours[params.id],
    });
};
