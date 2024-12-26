import { phalanxLanternCores } from "$lib/data/phalanx-lantern-cores";
import { phalanxPatch, phalanxPatchMeta } from "$lib/data/phalanx-patch";
import { phalanxPerks } from "$lib/data/phalanx-perks";
import { phalanxWeapons } from "$lib/data/phalanx-weapons";
import { makeJsonResponse } from "$lib/json";

export const prerender = true;

export async function GET() {
    return makeJsonResponse({
        __meta: phalanxPatchMeta,
        patch: phalanxPatch,
        weapons: phalanxWeapons,
        armours: phalanxWeapons,
        perks: phalanxPerks,
        lanternCores: phalanxLanternCores,
    });
}
