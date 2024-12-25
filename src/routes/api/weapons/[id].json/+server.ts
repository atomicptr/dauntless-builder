import { phalanxWeapons, phalanxWeaponsMeta } from "$lib/data/phalanx-weapons";
import { makeJsonResponse } from "$lib/json";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () => {
    return Object.keys(phalanxWeapons).map((id) => ({ id }));
};

export const GET: RequestHandler = ({ params }) => {
    if (!(params.id in phalanxWeapons)) {
        error(404);
    }

    return makeJsonResponse({
        __meta: phalanxWeaponsMeta,
        ...phalanxWeapons[params.id],
    });
};
