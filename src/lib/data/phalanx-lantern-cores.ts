import lanternCoresJson from "$lib/static/lantern-cores.json";
import type { LanternCoresData } from "./phalanx-types";
const lanternCoresData = lanternCoresJson as unknown as LanternCoresData;
export const phalanxLanternCoresMeta = lanternCoresData.__meta;
export const phalanxLanternCores = lanternCoresData.items;
