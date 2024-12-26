import armoursJson from "$lib/static/armours.json";
import type { ArmoursData } from "./phalanx-types";
const armoursData = armoursJson as unknown as ArmoursData;
export const phalanxArmoursMeta = armoursData.__meta;
export const phalanxArmours = armoursData.items;
