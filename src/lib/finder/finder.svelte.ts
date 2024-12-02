import { type Build } from "$lib/build/Build";
import { page } from "$app/stores";
import { get } from "svelte/store";
import type {
    ArmourType,
    FinderBasicArmour,
    FinderBasicArmour2LevelPerkMap,
    FinderBasicArmour3LevelPerkMap,
    FinderData,
    Perk,
} from "$lib/data/phalanx-types";
import { findAvailablePerksImplementation } from "./perk-checker";
import { findBuildsImplementation } from "./build-finder";
import { match } from "ts-pattern";

export interface WhitelistedItems {
    heads: number[];
    torsos: number[];
    arms: number[];
    legs: number[];
}

const filterWhitelistedItems = (finderData: FinderData, whitelist?: WhitelistedItems): FinderData => {
    if (whitelist === undefined) {
        return finderData;
    }

    const filterFunc = (armourType: ArmourType, item: FinderBasicArmour): boolean =>
        match(armourType)
            .with("head", () => whitelist.heads.indexOf(item.id) > -1)
            .with("torso", () => whitelist.torsos.indexOf(item.id) > -1)
            .with("arms", () => whitelist.arms.indexOf(item.id) > -1)
            .with("legs", () => whitelist.legs.indexOf(item.id) > -1)
            .run();

    const filterCloneLevel3 = (
        armourType: ArmourType,
        map: FinderBasicArmour3LevelPerkMap,
    ): FinderBasicArmour3LevelPerkMap => {
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
                    newMap[level1Key][level2Key][level3Key] = map[level1Key][level2Key][level3Key].filter((item) =>
                        filterFunc(armourType, item),
                    );
                }
            }
        }

        return newMap;
    };

    const filterCloneLevel2 = (
        armourType: ArmourType,
        map: FinderBasicArmour2LevelPerkMap,
    ): FinderBasicArmour2LevelPerkMap => {
        const newMap: FinderBasicArmour2LevelPerkMap = {};

        for (const level1Key in map) {
            if (!(level1Key in newMap)) {
                newMap[level1Key] = {};
            }

            for (const level2Key in map[level1Key]) {
                newMap[level1Key][level2Key] = map[level1Key][level2Key].filter((item) => filterFunc(armourType, item));
            }
        }

        return newMap;
    };

    return {
        head: whitelist.heads.length === 0 ? finderData.head : filterCloneLevel3("head", finderData.head),
        torso: whitelist.torsos.length === 0 ? finderData.torso : filterCloneLevel2("torso", finderData.torso),
        arms: whitelist.arms.length === 0 ? finderData.arms : filterCloneLevel3("arms", finderData.arms),
        legs: whitelist.legs.length === 0 ? finderData.legs : filterCloneLevel2("legs", finderData.legs),
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
