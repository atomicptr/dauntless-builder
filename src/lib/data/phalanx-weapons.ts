import weaponsJson from "$lib/static/weapons.json";
import type { WeaponsData } from "./phalanx-types";
const weaponsData = weaponsJson as unknown as WeaponsData;
export const phalanxWeaponsMeta = weaponsData.__meta;
export const phalanxWeapons = weaponsData.items;
