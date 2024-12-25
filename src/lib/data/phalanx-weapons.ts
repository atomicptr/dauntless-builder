import weaponsJson from "$lib/static/weapons.json";
import type { WeaponsData } from "./phalanx-types";
export const phalanxWeapons = weaponsJson as unknown as WeaponsData;
