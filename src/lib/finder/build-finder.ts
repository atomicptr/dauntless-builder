import { empty, type Build } from "$lib/build/Build";
import {
    armourTypeValues,
    type Armour,
    type FinderBasicArmour2LevelPerkMap,
    type FinderBasicArmour3LevelPerkMap,
    type FinderData,
    type Perk,
    type PerkSet,
} from "$lib/data/phalanx-types";
import { armourMaxLevel } from "$lib/data/static-data";
import { getCurrentPerkValues, increaseCurrentPerkValues, reduceCurrentPerkValues } from "./finder-utils";

const maxEmptyCellSlots = 6;

interface TempBuild {
    armourPieces: {
        [armourType: string]: number;
    };
    perks: string[];
}

export const findBuildsImplementation = (
    selectedPerks: number[],
    maxBuilds: number,
    finderData: FinderData,
    allPerks: { [id: string]: Perk },
): Build[] => {
    selectedPerks = selectedPerks.toSorted();

    const currentPerkValues = getCurrentPerkValues(selectedPerks, allPerks);
    const tempBuilds: TempBuild[] = [];

    const tempBuild: TempBuild = {
        armourPieces: {},
        perks: [],
    };

    let armourType = 0;
    findArmourPiece(armourType, selectedPerks, maxBuilds, currentPerkValues, tempBuild, tempBuilds, finderData);

    const builds: Build[] = [];
    for (const tempBuild of tempBuilds) {
        builds.push(createBuild(tempBuild));
    }

    return builds;
};

const createBuild = (tempBuild: TempBuild): Build => {
    const build = empty();

    build.head.id = tempBuild.armourPieces["head"];
    build.head.level = armourMaxLevel;
    if (tempBuild.perks.length > 0) {
        build.head.cells[0] = Number.parseInt(tempBuild.perks.shift() as string);
    }

    build.torso.id = tempBuild.armourPieces["torso"];
    build.torso.level = armourMaxLevel;
    if (tempBuild.perks.length > 0) {
        build.torso.cells[0] = Number.parseInt(tempBuild.perks.shift() as string);
        if (tempBuild.perks.length > 0) {
            build.torso.cells[1] = Number.parseInt(tempBuild.perks.shift() as string);
        }
    }

    build.arms.id = tempBuild.armourPieces["arms"];
    build.arms.level = armourMaxLevel;
    if (tempBuild.perks.length > 0) {
        build.arms.cells[0] = Number.parseInt(tempBuild.perks.shift() as string);
    }

    build.legs.id = tempBuild.armourPieces["legs"];
    build.legs.level = armourMaxLevel;
    if (tempBuild.perks.length > 0) {
        build.legs.cells[0] = Number.parseInt(tempBuild.perks.shift() as string);
        if (tempBuild.perks.length > 0) {
            build.legs.cells[1] = Number.parseInt(tempBuild.perks.shift() as string);
        }
    }

    return build;
};

const findArmourPiece = (
    armourType: number,
    selectedPerks: number[],
    maxBuilds: number,
    currentPerkValues: PerkSet,
    tempBuild: TempBuild,
    tempBuilds: TempBuild[],
    finderData: FinderData,
): void => {
    if (tempBuilds.length >= maxBuilds) {
        return;
    }
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
        tempBuild.armourPieces[armourTypeValues[armourType]] = 0;
        findArmourPiece(armourType + 1, selectedPerks, maxBuilds, currentPerkValues, tempBuild, tempBuilds, finderData);
        return;
    }
    if (!isDefined) {
        const emptyCellSlots = maxEmptyCellSlots - totalPerkThreshold;
        const validBuild = emptyCellSlots >= 0;
        if (validBuild) {
            addBuild(tempBuild, tempBuilds, currentPerkValues, maxBuilds, finderData);
        }
        return;
    }

    switch (armourTypeValues[armourType]) {
        case "head":
        case "arms":
            findArmourPiece3Perks(
                armourType,
                selectedPerks,
                maxBuilds,
                currentPerkValues,
                tempBuild,
                tempBuilds,
                finderData,
            );
            return;
        case "torso":
        case "legs":
            findArmourPiece2Perks(
                armourType,
                selectedPerks,
                maxBuilds,
                currentPerkValues,
                tempBuild,
                tempBuilds,
                finderData,
            );
            return;
    }
};

const findArmourPiece2Perks = (
    armourType: number,
    selectedPerks: number[],
    maxBuilds: number,
    currentPerkValues: PerkSet,
    tempBuild: TempBuild,
    tempBuilds: TempBuild[],
    finderData: FinderData,
): void => {
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
                tempBuild.armourPieces[armourTypeValues[armourType]] = armour.id;
                findArmourPiece(
                    armourType + 1,
                    selectedPerks,
                    maxBuilds,
                    currentPerkValues,
                    tempBuild,
                    tempBuilds,
                    finderData,
                );
                increaseCurrentPerkValues(perks, currentPerkValues);
            }
        }
    }

    for (let i = 0; i < selectedPerks.length; i++) {
        if (currentPerkValues[selectedPerks[i]] <= 0 || !(selectedPerks[i] in currentData)) {
            continue;
        }

        for (const armour of currentData[selectedPerks[i]][0]) {
            const perks = armour.perks;
            reduceCurrentPerkValues(perks, currentPerkValues);
            tempBuild.armourPieces[armourTypeValues[armourType]] = armour.id;
            findArmourPiece(
                armourType + 1,
                selectedPerks,
                maxBuilds,
                currentPerkValues,
                tempBuild,
                tempBuilds,
                finderData,
            );
            increaseCurrentPerkValues(perks, currentPerkValues);
        }
    }

    tempBuild.armourPieces[armourTypeValues[armourType]] = 0;
    findArmourPiece(armourType + 1, selectedPerks, maxBuilds, currentPerkValues, tempBuild, tempBuilds, finderData);
};

const findArmourPiece3Perks = (
    armourType: number,
    selectedPerks: number[],
    maxBuilds: number,
    currentPerkValues: PerkSet,
    tempBuild: TempBuild,
    tempBuilds: TempBuild[],
    finderData: FinderData,
): void => {
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
                    tempBuild.armourPieces[armourTypeValues[armourType]] = armour.id;
                    findArmourPiece(
                        armourType + 1,
                        selectedPerks,
                        maxBuilds,
                        currentPerkValues,
                        tempBuild,
                        tempBuilds,
                        finderData,
                    );
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
                tempBuild.armourPieces[armourTypeValues[armourType]] = armour.id;
                findArmourPiece(
                    armourType + 1,
                    selectedPerks,
                    maxBuilds,
                    currentPerkValues,
                    tempBuild,
                    tempBuilds,
                    finderData,
                );
                increaseCurrentPerkValues(perks, currentPerkValues);
            }
        }
    }

    for (let i = 0; i < selectedPerks.length; i++) {
        if (currentPerkValues[selectedPerks[i]] <= 0 || !(selectedPerks[i] in currentData)) {
            continue;
        }

        for (const armour of currentData[selectedPerks[i]][0][0]) {
            const perks = armour.perks;
            reduceCurrentPerkValues(perks, currentPerkValues);
            tempBuild.armourPieces[armourTypeValues[armourType]] = armour.id;
            findArmourPiece(
                armourType + 1,
                selectedPerks,
                maxBuilds,
                currentPerkValues,
                tempBuild,
                tempBuilds,
                finderData,
            );
            increaseCurrentPerkValues(perks, currentPerkValues);
        }
    }

    tempBuild.armourPieces[armourTypeValues[armourType]] = 0;
    findArmourPiece(armourType + 1, selectedPerks, maxBuilds, currentPerkValues, tempBuild, tempBuilds, finderData);
};

const addBuild = (
    tempBuild: TempBuild,
    tempBuilds: TempBuild[],
    currentPerkValues: PerkSet,
    maxBuilds: number,
    finderData: FinderData,
): void => {
    let heads: number[] = [];
    if (tempBuild.armourPieces["head"] === 0) {
        heads = finderData["head"][0][0][0].map((a) => a.id);
    } else {
        heads.push(tempBuild.armourPieces["head"]);
    }
    let torsos: number[] = [];
    if (tempBuild.armourPieces["torso"] === 0) {
        torsos = finderData["torso"][0][0].map((a) => a.id);
    } else {
        torsos.push(tempBuild.armourPieces["torso"]);
    }
    let arms: number[] = [];
    if (tempBuild.armourPieces["arms"] === 0) {
        arms = finderData["arms"][0][0][0].map((a) => a.id);
    } else {
        arms.push(tempBuild.armourPieces["arms"]);
    }
    let legs: number[] = [];
    if (tempBuild.armourPieces["legs"] === 0) {
        legs = finderData["legs"][0][0].map((a) => a.id);
    } else {
        legs.push(tempBuild.armourPieces["legs"]);
    }

    const perks: string[] = [];
    for (const key in currentPerkValues) {
        for (let i = 0; i < currentPerkValues[key]; i++) {
            perks.push(key);
        }
    }

    for (const head of heads) {
        for (const torso of torsos) {
            for (const arm of arms) {
                for (const leg of legs) {
                    if (tempBuilds.length >= maxBuilds) {
                        return;
                    }
                    if (
                        tempBuilds.find(
                            (t) =>
                                t.armourPieces["head"] == head &&
                                t.armourPieces["torso"] == torso &&
                                t.armourPieces["arms"] == arm &&
                                t.armourPieces["legs"] == leg,
                        ) !== undefined
                    ) {
                        continue;
                    }
                    tempBuilds.push({
                        armourPieces: {
                            head: head,
                            torso: torso,
                            arms: arm,
                            legs: leg,
                        },
                        perks: perks,
                    });
                }
            }
        }
    }
};
