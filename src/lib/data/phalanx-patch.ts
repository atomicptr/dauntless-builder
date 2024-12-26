import patchJson from "$lib/static/patch.json";
import type { PatchData } from "./phalanx-types";
const patchData = patchJson as unknown as PatchData;
export const phalanxPatchMeta = patchData.__meta;
export const phalanxPatch = patchData.item;
