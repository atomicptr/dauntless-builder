import {
    armourTypeValues,
    type FinderBasicArmour2LevelPerkMap,
    type FinderBasicArmour3LevelPerkMap,
    type FinderData,
    type Perk,
    type PerkSet,
} from "$lib/data/phalanx-types";
import { getCurrentPerkValues, increaseCurrentPerkValues, reduceCurrentPerkValues } from "./finder-utils";

const maxEmptyCellSlots = 6;

export const findAvailablePerksImplementation = (
    selectedPerks: number[],
    requestedPerks: number[],
    finderData: FinderData,
    allPerks: { [id: string]: Perk },
): number[] => {
    requestedPerks = [...requestedPerks];
    requestedPerks.sort();

    const availablePerks: number[] = [];

    let requestedPerk: number | undefined = requestedPerks.shift();
    while (requestedPerk != undefined) {
        const selectedPerksCopy = [...selectedPerks];
        selectedPerksCopy.push(requestedPerk);
        selectedPerksCopy.sort();

        const currentPerkValues = getCurrentPerkValues(selectedPerksCopy, allPerks);
        let armourType = 0;
        const [foundBuild, emptyCellSlots] = findArmourPiece(
            armourType,
            selectedPerksCopy,
            currentPerkValues,
            finderData,
        );
        if (foundBuild) {
            requestedPerks = buildFound(requestedPerk, availablePerks, emptyCellSlots, requestedPerks, allPerks);
        }

        requestedPerk = requestedPerks.shift();
    }

    return availablePerks;
};

const findArmourPiece = (
    armourType: number,
    selectedPerks: number[],
    currentPerkValues: PerkSet,
    finderData: FinderData,
): [boolean, number] => {
    const isDefined = armourType < armourTypeValues.length;
    let totalPerkThreshold = 0;
    let buildComplete = true;
    for (const requiredPerk of selectedPerks) {
        if (currentPerkValues[requiredPerk] > 0) {
            if (isDefined) {
                buildComplete = false;
            }
            totalPerkThreshold += currentPerkValues[requiredPerk];
        }
    }
    if (buildComplete && isDefined) {
        return [true, maxEmptyCellSlots];
    }
    if (!isDefined) {
        const emptyCellSlots = maxEmptyCellSlots - totalPerkThreshold;
        return [emptyCellSlots >= 0, emptyCellSlots];
    }

    switch (armourTypeValues[armourType]) {
        case "head":
        case "arms":
            return findArmourPiece3Perks(armourType, selectedPerks, currentPerkValues, finderData);
        case "torso":
        case "legs":
            return findArmourPiece2Perks(armourType, selectedPerks, currentPerkValues, finderData);
    }
};

const findArmourPiece2Perks = (
    armourType: number,
    selectedPerks: number[],
    currentPerkValues: PerkSet,
    finderData: FinderData,
): [boolean, number] => {
    const currentData = finderData[armourTypeValues[armourType]] as FinderBasicArmour2LevelPerkMap;
    for (let i = 0; i < selectedPerks.length; i++) {
        if (currentPerkValues[selectedPerks[i]] <= 0 || !(selectedPerks[i] in currentData)) {
            continue;
        }
        for (let j = i + 1; j < selectedPerks.length; j++) {
            if (currentPerkValues[selectedPerks[j]] <= 0 || !(selectedPerks[j] in currentData[selectedPerks[i]])) {
                continue;
            }
            for (const armour of currentData[selectedPerks[i]][selectedPerks[j]]) {
                const perks = armour.perks;
                reduceCurrentPerkValues(perks, currentPerkValues);
                const [found, cellSlots] = findArmourPiece(
                    armourType + 1,
                    selectedPerks,
                    currentPerkValues,
                    finderData,
                );
                if (found) {
                    return [found, cellSlots];
                }
                increaseCurrentPerkValues(perks, currentPerkValues);
            }
        }
    }

    for (let i = 0; i < selectedPerks.length; i++) {
        if (currentPerkValues[selectedPerks[i]] <= 0 || !(selectedPerks[i] in currentData)) {
            continue;
        }

        const armour = currentData[selectedPerks[i]][0][0];
        const perks = armour.perks;
        reduceCurrentPerkValues(perks, currentPerkValues);
        const [found, cellSlots] = findArmourPiece(armourType + 1, selectedPerks, currentPerkValues, finderData);
        if (found) {
            return [found, cellSlots];
        }
        increaseCurrentPerkValues(perks, currentPerkValues);
    }

    const [foundGeneric, cellSlotsGeneric] = findArmourPiece(
        armourType + 1,
        selectedPerks,
        currentPerkValues,
        finderData,
    );
    if (foundGeneric) {
        return [foundGeneric, cellSlotsGeneric];
    }

    return [false, 0];
};

const findArmourPiece3Perks = (
    armourType: number,
    selectedPerks: number[],
    currentPerkValues: PerkSet,
    finderData: FinderData,
): [boolean, number] => {
    const currentData = finderData[armourTypeValues[armourType]] as FinderBasicArmour3LevelPerkMap;
    for (let i = 0; i < selectedPerks.length; i++) {
        if (currentPerkValues[selectedPerks[i]] <= 0 || !(selectedPerks[i] in currentData)) {
            continue;
        }
        for (let j = i + 1; j < selectedPerks.length; j++) {
            if (currentPerkValues[selectedPerks[j]] <= 0 || !(selectedPerks[j] in currentData[selectedPerks[i]])) {
                continue;
            }
            for (let k = j + 1; k < selectedPerks.length; k++) {
                if (
                    currentPerkValues[selectedPerks[k]] <= 0 ||
                    !(selectedPerks[k] in currentData[selectedPerks[i]][selectedPerks[j]])
                ) {
                    continue;
                }
                for (const armour of currentData[selectedPerks[i]][selectedPerks[j]][selectedPerks[k]]) {
                    const perks = armour.perks;
                    reduceCurrentPerkValues(perks, currentPerkValues);
                    const [found, cellSlots] = findArmourPiece(
                        armourType + 1,
                        selectedPerks,
                        currentPerkValues,
                        finderData,
                    );
                    if (found) {
                        return [found, cellSlots];
                    }
                    increaseCurrentPerkValues(perks, currentPerkValues);
                }
            }
        }
    }

    for (let i = 0; i < selectedPerks.length; i++) {
        if (currentPerkValues[selectedPerks[i]] <= 0 || !(selectedPerks[i] in currentData)) {
            continue;
        }
        for (let j = i + 1; j < selectedPerks.length; j++) {
            if (currentPerkValues[selectedPerks[j]] <= 0 || !(selectedPerks[j] in currentData[selectedPerks[i]])) {
                continue;
            }
            for (const armour of currentData[selectedPerks[i]][selectedPerks[j]][0]) {
                const perks = armour.perks;
                reduceCurrentPerkValues(perks, currentPerkValues);
                const [found, cellSlots] = findArmourPiece(
                    armourType + 1,
                    selectedPerks,
                    currentPerkValues,
                    finderData,
                );
                if (found) {
                    return [found, cellSlots];
                }
                increaseCurrentPerkValues(perks, currentPerkValues);
            }
        }
    }

    for (let i = 0; i < selectedPerks.length; i++) {
        if (currentPerkValues[selectedPerks[i]] <= 0 || !(selectedPerks[i] in currentData)) {
            continue;
        }

        const armour = currentData[selectedPerks[i]][0][0][0];
        const perks = armour.perks;
        reduceCurrentPerkValues(perks, currentPerkValues);
        const [found, cellSlots] = findArmourPiece(armourType + 1, selectedPerks, currentPerkValues, finderData);
        if (found) {
            return [found, cellSlots];
        }
        increaseCurrentPerkValues(perks, currentPerkValues);
    }

    const [foundGeneric, cellSlotsGeneric] = findArmourPiece(
        armourType + 1,
        selectedPerks,
        currentPerkValues,
        finderData,
    );
    if (foundGeneric) {
        return [foundGeneric, cellSlotsGeneric];
    }

    return [false, 0];
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
        const currentPerkValues = getCurrentPerkValues(requestedPerks, allPerks);
        for (const key in currentPerkValues) {
            if (currentPerkValues[key] <= emptyCellSlots) {
                const keyInt = Number.parseInt(key);
                availablePerks.push(keyInt);
                requestedPerks = requestedPerks.filter((rec) => rec != keyInt);
            }
        }
    }
    return requestedPerks;
};
