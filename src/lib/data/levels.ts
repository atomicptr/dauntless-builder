import { translatableString } from "$lib/utils/translatable-string";
import type { Armour, Perk, PerkSet } from "./phalanx-types";
import { armourMaxLevel } from "./static-data";

export const armourStatsForLevel = (armourPiece: Armour, level: number): PerkSet | null => {
    const lvl = Math.min(armourMaxLevel, Math.max(1, level));

    const biggest = armourPiece.stats
        .filter((s) => s.min_level <= lvl)
        .reduce((prev, curr) => (prev.min_level < curr.min_level ? curr : prev), {
            min_level: Number.NEGATIVE_INFINITY,
            perks: {},
        });

    if (biggest.min_level < 0) {
        return null;
    }

    return biggest.perks;
};

export const getCellPerks = (cells: number[]): PerkSet => {
    const newSet: PerkSet = {};

    cells.forEach((id) => {
        if (id === 0) {
            return;
        }

        if (!(id in newSet)) {
            newSet[id] = 0;
        }

        newSet[id] += 1;
    });

    return newSet;
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

export const mergePerksArray = (sets: PerkSet[]): PerkSet => sets.reduce((prev, curr) => mergePerks(prev, curr), {});

export const sortPerkSetByName = (perks: { [id: string]: Perk }, perkSet: PerkSet): PerkSet =>
    Object.fromEntries(
        Object.entries(perkSet)
            .filter(([id, _amount]) => id in perks)
            .sort(([aId, _aAmount], [bId, _bAmount]) =>
                translatableString(perks[aId].name).localeCompare(translatableString(perks[bId].name)),
            ),
    );
