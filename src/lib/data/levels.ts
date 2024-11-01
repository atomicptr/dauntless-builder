import type { Armour, PerkSet } from "./phalanx-types";
import { armourMaxLevel } from "./static-data";

export const armourStatsForLevel = (armourPiece: Armour, level: number): PerkSet | null => {
    const lvl = Math.min(armourMaxLevel, Math.max(1, level));

    const biggest = armourPiece.stats
        .filter((s) => s.min_level <= lvl)
        .reduce((prev, curr) => (prev.min_level < curr.min_level ? curr : prev), { min_level: -Infinity, perks: {} });

    if (biggest.min_level < 0) {
        return null;
    }

    return biggest.perks;
};

export const mergePerks = (base: PerkSet, other: PerkSet): PerkSet => {
    const newSet: PerkSet = { ...base };

    Object.entries(other).forEach(([perkId, amount]) => {
        if (!(perkId in newSet)) {
            newSet[perkId] = 0;
        }

        newSet[perkId] += amount;
    });

    return newSet;
};
