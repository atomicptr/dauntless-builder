import { type Build } from "$lib/build/Build";
import { page } from "$app/stores";
import { get } from "svelte/store";
import type {
    FinderBasicArmour,
    FinderBasicArmour2LevelPerkMap,
    FinderBasicArmour3LevelPerkMap,
    FinderData,
    Perk,
} from "$lib/data/phalanx-types";
import { findAvailablePerksImplementation } from "./perk-checker";
import { findBuildsImplementation } from "./build-finder";

export interface WhitelistedItems {
    items: number[];
    inverted: boolean;
}

const filterWhitelistedItems = (finderData: FinderData, whitelist?: WhitelistedItems): FinderData => {
    if (whitelist === undefined || whitelist.items.length === 0) {
        return finderData;
    }

    const filterFunc = (item: FinderBasicArmour) =>
        whitelist.inverted ? whitelist.items.indexOf(item.id) === -1 : whitelist.items.indexOf(item.id) > -1;

    const filterCloneLevel3 = (map: FinderBasicArmour3LevelPerkMap): FinderBasicArmour3LevelPerkMap => {
        const newMap: FinderBasicArmour3LevelPerkMap = {};

        for (const level1Key in map) {
            if (!(level1Key in newMap)) {
                newMap[level1Key] = {};
            }

            for (const level2Key in map[level1Key]) {
                if (!(level2Key in newMap[level1Key])) {
                    newMap[level1Key][level2Key] = {};
                }

                for (const level3Key in map[level1Key][level2Key]) {
                    newMap[level1Key][level2Key][level3Key] = map[level1Key][level2Key][level3Key].filter(filterFunc);
                }
            }
        }

        return newMap;
    };

    const filterCloneLevel2 = (map: FinderBasicArmour2LevelPerkMap): FinderBasicArmour2LevelPerkMap => {
        const newMap: FinderBasicArmour2LevelPerkMap = {};

        for (const level1Key in map) {
            if (!(level1Key in newMap)) {
                newMap[level1Key] = {};
            }

            for (const level2Key in map[level1Key]) {
                newMap[level1Key][level2Key] = map[level1Key][level2Key].filter(filterFunc);
            }
        }

        return newMap;
    };

    return {
        head: filterCloneLevel3(finderData.head),
        torso: filterCloneLevel2(finderData.torso),
        arms: filterCloneLevel3(finderData.arms),
        legs: filterCloneLevel2(finderData.legs),
    };
};

export const findBuilds = (selectedPerks: number[], whitelist?: WhitelistedItems): Build[] => {
    const finderData: FinderData = get(page).data.finderData;
    const allPerks: { [id: string]: Perk } = get(page).data.perks;

    return findBuildsImplementation(selectedPerks, 50, filterWhitelistedItems(finderData, whitelist), allPerks);
};

export const findAvailablePerks = (
    selectedPerks: number[],
    requestedPerks: number[],
    whitelist?: WhitelistedItems,
): number[] => {
    const finderData: FinderData = get(page).data.finderData;
    const allPerks: { [id: string]: Perk } = get(page).data.perks;

    return findAvailablePerksImplementation(
        selectedPerks,
        requestedPerks,
        filterWhitelistedItems(finderData, whitelist),
        allPerks,
    );
};
