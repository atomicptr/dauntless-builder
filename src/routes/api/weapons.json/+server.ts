import { phalanxWeapons, phalanxWeaponsMeta } from "$lib/data/phalanx-weapons";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse({
        __meta: phalanxWeaponsMeta, 
        items: phalanxWeapons
    });
}
