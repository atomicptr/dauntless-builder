import type { Perk, PerkSet } from "$lib/data/phalanx-types";

export const getCurrentPerkValues = (perkList: number[], allPerks: { [id: string]: Perk }): PerkSet => {
    const currentPerkValues: { [id: number]: number } = [];

    for (const perk of perkList) {
        currentPerkValues[perk] = allPerks[perk].threshold;
    }

    return currentPerkValues;
};

export const reduceCurrentPerkValues = (perks: PerkSet, currentPerkValues: PerkSet) => {
    for (const key in perks) {
        if (key in currentPerkValues) {
            currentPerkValues[key] -= perks[key];
        }
    }
};

export const increaseCurrentPerkValues = (perks: PerkSet, currentPerkValues: PerkSet) => {
    for (const key in perks) {
        if (key in currentPerkValues) {
            currentPerkValues[key] += perks[key];
        }
    }
};
