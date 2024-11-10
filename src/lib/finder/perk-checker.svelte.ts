import { page } from "$app/stores";
import { get } from "svelte/store";
import type { ArmourType, FinderData, Perk } from "$lib/data/phalanx-types";

export const findAvailablePerks = (selectedPerks: number[], requestedPerks: number[]): number[] => {
    const finderData: FinderData = get(page).data.finderData;
    const allPerks: { [id: string]: Perk } = get(page).data.perks;

    requestedPerks = [...requestedPerks];
    requestedPerks.sort();

    let availablePerks: number[] = [1, 2, 3, 5];

    let requestedPerk: number | undefined = requestedPerks.shift();
    while (requestedPerk != undefined) {
        let requiredPerks = [...selectedPerks];
        requiredPerks.push(requestedPerk);
        requiredPerks.sort();

        let [foundBuild, emptyCellSlots]: [boolean, number] = findAvailablePerksInternal(
            requiredPerks,
            finderData,
            allPerks,
        );
        if (foundBuild) {
            requestedPerks = buildFound(requestedPerk, availablePerks, emptyCellSlots, requestedPerks, allPerks);
        }

        requestedPerk = requestedPerks.shift();
    }

    return availablePerks;
};

const findAvailablePerksInternal = (
    requiredPerks: number[],
    finderData: FinderData,
    allPerks: { [id: string]: Perk },
): [boolean, number] => {
    let currentPerkValues: Map<number, number> = getCurrentPerkValues(requiredPerks, allPerks);

    //let armourType: ArmourType =
    //return findArmourPiece(armourType, requiredPerks, currentPerkValues, finderData);
    return [false, 0];
};

const findArmourPiece = (
    armourType: ArmourType,
    requiredPerks: number[],
    currentPerkValues: Map<number, number>,
    finderData: FinderData,
): [boolean, number] => {
    return [false, 0];
};

const getCurrentPerkValues = (perkList: number[], allPerks: { [id: string]: Perk }): Map<number, number> => {
    let currentPerkValues: Map<number, number> = new Map();

    for (let perk of perkList) {
        currentPerkValues.set(perk, allPerks[perk].threshold);
    }

    return currentPerkValues;
};

const buildFound = (
    requestedPerk: number,
    availablePerks: number[],
    emptyCellSlots: number,
    requestedPerks: number[],
    allPerks: { [id: string]: Perk },
): number[] => {
    availablePerks.push(requestedPerk);
    if (emptyCellSlots > 0) {
        let currentPerkValues: Map<number, number> = getCurrentPerkValues(requestedPerks, allPerks);
        for (let [key, value] of currentPerkValues) {
            if (value <= emptyCellSlots) {
                availablePerks.push(key);
                requestedPerks = requestedPerks.filter((rec) => rec != key);
            }
        }
    }
    return requestedPerks;
};
