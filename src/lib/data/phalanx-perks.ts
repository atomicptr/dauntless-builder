import perkJson from "$lib/static/perks.json";
import type { PerksData } from "./phalanx-types";
const perkData = perkJson as unknown as PerksData;
export const phalanxPerksMeta = perkData.__meta;
export const phalanxPerks = perkData.items;
