import finderDataJson from "$lib/static/finder-data.json";
import type { FinderData } from "./phalanx-types";
export const phalanxFinderData = finderDataJson as unknown as FinderData;
