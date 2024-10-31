import type { Armour } from "./phalanx-types";
import { armourMaxLevel } from "./static-data";

export const armourStatsForLevel = (armourPiece: Armour, level: number): { [perkId: string]: number } | null => {
    const lvl = Math.min(armourMaxLevel, Math.max(1, level));

    const biggest = armourPiece.stats
        .filter((s) => s.min_level <= lvl)
        .reduce((prev, curr) => (prev.min_level < curr.min_level ? curr : prev), { min_level: -Infinity, perks: {} });

    console.log(biggest);

    if (biggest.min_level < 0) {
        return null;
    }

    return biggest.perks;
};
