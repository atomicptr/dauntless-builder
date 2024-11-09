import {
    armourTypeValues,
    type FinderBasicArmour2LevelPerkMap,
    type FinderBasicArmour3LevelPerkMap,
    type FinderData,
    type Perk,
    type PerkSet,
} from "$lib/data/phalanx-types";

const maxEmptyCellSlots = 6;

export const findAvailablePerksImplementation = (
    selectedPerks: number[],
    requestedPerks: number[],
    finderData: FinderData,
    allPerks: { [id: string]: Perk },
): number[] => {
    requestedPerks = [...requestedPerks];
    requestedPerks.sort();

    let availablePerks: number[] = [];

    let requestedPerk: number | undefined = requestedPerks.shift();
    while (requestedPerk != undefined) {
        const requiredPerks = [...selectedPerks];
        requiredPerks.push(requestedPerk);
        requiredPerks.sort();

        const [foundBuild, emptyCellSlots] = findAvailablePerksInternal(requiredPerks, finderData, allPerks);
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
    let currentPerkValues = getCurrentPerkValues(requiredPerks, allPerks);

    let armourType = 0;
    return findArmourPiece(armourType, requiredPerks, currentPerkValues, finderData);
};

const findArmourPiece = (
    armourType: number,
    requiredPerks: number[],
    currentPerkValues: { [id: number]: number },
    finderData: FinderData,
): [boolean, number] => {
    const isDefined = armourType < armourTypeValues.length;
    let totalPerkThreshold = 0;
    let buildComplete = true;
    for (const requiredPerk of requiredPerks) {
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
            return findArmourPiece3Perks(armourType, requiredPerks, currentPerkValues, finderData);
        case "torso":
        case "legs":
            return findArmourPiece2Perks(armourType, requiredPerks, currentPerkValues, finderData);
    }
};

const findArmourPiece2Perks = (
    armourType: number,
    requiredPerks: number[],
    currentPerkValues: { [id: number]: number },
    finderData: FinderData,
): [boolean, number] => {
    let currentData = finderData[armourTypeValues[armourType]] as FinderBasicArmour2LevelPerkMap;
    for (let i = 0; i < requiredPerks.length; i++) {
        if (currentPerkValues[requiredPerks[i]] <= 0 || !(requiredPerks[i] in currentData)) {
            continue;
        }
        for (let j = i + 1; j < requiredPerks.length; j++) {
            if (currentPerkValues[requiredPerks[j]] <= 0 || !(requiredPerks[j] in currentData[requiredPerks[i]])) {
                continue;
            }
            for (const armour of currentData[requiredPerks[i]][requiredPerks[j]]) {
                const perks = armour.perks;
                reduceCurrentPerkValues(perks, currentPerkValues);
                const [found, cellSlots] = findArmourPiece(
                    armourType + 1,
                    requiredPerks,
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

    for (let i = 0; i < requiredPerks.length; i++) {
        if (currentPerkValues[requiredPerks[i]] <= 0 || !(requiredPerks[i] in currentData)) {
            continue;
        }

        const armour = currentData[requiredPerks[i]][0][0];
        const perks = armour.perks;
        reduceCurrentPerkValues(perks, currentPerkValues);
        const [found, cellSlots] = findArmourPiece(armourType + 1, requiredPerks, currentPerkValues, finderData);
        if (found) {
            return [found, cellSlots];
        }
        increaseCurrentPerkValues(perks, currentPerkValues);
    }

    const [foundGeneric, cellSlotsGeneric] = findArmourPiece(
        armourType + 1,
        requiredPerks,
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
    requiredPerks: number[],
    currentPerkValues: { [id: number]: number },
    finderData: FinderData,
): [boolean, number] => {
    let currentData = finderData[armourTypeValues[armourType]] as FinderBasicArmour3LevelPerkMap;
    for (let i = 0; i < requiredPerks.length; i++) {
        if (currentPerkValues[requiredPerks[i]] <= 0 || !(requiredPerks[i] in currentData)) {
            continue;
        }
        for (let j = i + 1; j < requiredPerks.length; j++) {
            if (currentPerkValues[requiredPerks[j]] <= 0 || !(requiredPerks[j] in currentData[requiredPerks[i]])) {
                continue;
            }
            for (let k = j + 1; k < requiredPerks.length; k++) {
                if (
                    currentPerkValues[requiredPerks[k]] <= 0 ||
                    !(requiredPerks[k] in currentData[requiredPerks[i]][requiredPerks[j]])
                ) {
                    continue;
                }
                for (const armour of currentData[requiredPerks[i]][requiredPerks[j]][requiredPerks[k]]) {
                    const perks = armour.perks;
                    reduceCurrentPerkValues(perks, currentPerkValues);
                    const [found, cellSlots] = findArmourPiece(
                        armourType + 1,
                        requiredPerks,
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

    for (let i = 0; i < requiredPerks.length; i++) {
        if (currentPerkValues[requiredPerks[i]] <= 0 || !(requiredPerks[i] in currentData)) {
            continue;
        }
        for (let j = i + 1; j < requiredPerks.length; j++) {
            if (currentPerkValues[requiredPerks[j]] <= 0 || !(requiredPerks[j] in currentData[requiredPerks[i]])) {
                continue;
            }
            for (const armour of currentData[requiredPerks[i]][requiredPerks[j]][0]) {
                const perks = armour.perks;
                reduceCurrentPerkValues(perks, currentPerkValues);
                const [found, cellSlots] = findArmourPiece(
                    armourType + 1,
                    requiredPerks,
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

    for (let i = 0; i < requiredPerks.length; i++) {
        if (currentPerkValues[requiredPerks[i]] <= 0 || !(requiredPerks[i] in currentData)) {
            continue;
        }

        const armour = currentData[requiredPerks[i]][0][0][0];
        const perks = armour.perks;
        reduceCurrentPerkValues(perks, currentPerkValues);
        const [found, cellSlots] = findArmourPiece(armourType + 1, requiredPerks, currentPerkValues, finderData);
        if (found) {
            return [found, cellSlots];
        }
        increaseCurrentPerkValues(perks, currentPerkValues);
    }

    const [foundGeneric, cellSlotsGeneric] = findArmourPiece(
        armourType + 1,
        requiredPerks,
        currentPerkValues,
        finderData,
    );
    if (foundGeneric) {
        return [foundGeneric, cellSlotsGeneric];
    }

    return [false, 0];
};

const getCurrentPerkValues = (perkList: number[], allPerks: { [id: string]: Perk }): PerkSet => {
    let currentPerkValues: { [id: number]: number } = [];

    for (let perk of perkList) {
        currentPerkValues[perk] = allPerks[perk].threshold;
    }

    return currentPerkValues;
};

const reduceCurrentPerkValues = (perks: PerkSet, currentPerkValues: PerkSet) => {
    for (const key in perks) {
        if (key in currentPerkValues) {
            currentPerkValues[key] -= perks[key];
        }
    }
};

const increaseCurrentPerkValues = (perks: PerkSet, currentPerkValues: PerkSet) => {
    for (const key in perks) {
        if (key in currentPerkValues) {
            currentPerkValues[key] += perks[key];
        }
    }
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
        let currentPerkValues = getCurrentPerkValues(requestedPerks, allPerks);
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
