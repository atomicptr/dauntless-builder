import type { Build } from "$lib/build/Build";
import {
    armourTypeValues,
    type Armour,
    type FinderBasicArmour2LevelPerkMap,
    type FinderBasicArmour3LevelPerkMap,
    type FinderData,
    type Perk,
} from "$lib/data/phalanx-types";
import { getCurrentPerkValues, increaseCurrentPerkValues, reduceCurrentPerkValues } from "./finder-utils";

const maxEmptyCellSlots = 6;

export const findBuildsImplementation = (
    selectedPerks: number[],
    finderData: FinderData,
    allArmours: { [id: string]: Armour },
    allPerks: { [id: string]: Perk },
): Build[] => {
    let requiredPerks = [...selectedPerks];
    requiredPerks.sort();

        // const [foundBuild, emptyCellSlots] = findAvailablePerksInternal(requiredPerks, finderData, allPerks);
        // if (foundBuild) {
        //     requestedPerks = buildFound(requestedPerk, availablePerks, emptyCellSlots, requestedPerks, allPerks);
        // }

    return [];
};