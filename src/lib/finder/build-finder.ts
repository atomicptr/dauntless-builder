import { empty, type Build } from "$lib/build/Build";
import {
    armourTypeValues,
    type Armour,
    type FinderBasicArmour2LevelPerkMap,
    type FinderBasicArmour3LevelPerkMap,
    type FinderData,
    type Perk,
    type TempBuild,
} from "$lib/data/phalanx-types";
import { getCurrentPerkValues, increaseCurrentPerkValues, reduceCurrentPerkValues } from "./finder-utils";

const maxEmptyCellSlots = 6;

export const findBuildsImplementation = (
    selectedPerks: number[],
    maxBuilds: number,
    finderData: FinderData,
    allPerks: { [id: string]: Perk },
): Build[] => {
    let requiredPerks = [...selectedPerks];
    requiredPerks.sort();

    let builds = findBuildsInternal(requiredPerks, maxBuilds, finderData, allPerks);

    return builds;
};

const findBuildsInternal = (
    requiredPerks: number[],
    maxBuilds: number,
    finderData: FinderData,
    allPerks: { [id: string]: Perk },
): Build[] => {
    let currentPerkValues = getCurrentPerkValues(requiredPerks, allPerks);
    let tempBuilds: TempBuild[] = [];

    let tempBuild: TempBuild = {
        armourPieces: {},
        perks: [],
    };

    let armourType = 0;
    findArmourPiece(armourType, requiredPerks, maxBuilds, currentPerkValues, tempBuild, tempBuilds, finderData);

    let builds: Build[] = [];
    for (let tempBuild of tempBuilds) {
        builds.push(CreateBuild(tempBuild));
    }
    return builds;
};

const CreateBuild = (tempBuild: TempBuild): Build => {
    let build = empty();

    build.head.id = tempBuild.armourPieces["head"];
    build.head.level = 20;
    if (tempBuild.perks.length > 0) {
        build.head.cells[0] = Number.parseInt(tempBuild.perks.shift() as string);
    }

    build.torso.id = tempBuild.armourPieces["torso"];
    build.torso.level = 20;
    if (tempBuild.perks.length > 0) {
        build.torso.cells[0] = Number.parseInt(tempBuild.perks.shift() as string);
        if (tempBuild.perks.length > 0) {
            build.torso.cells[1] = Number.parseInt(tempBuild.perks.shift() as string);
        }
    }

    build.arms.id = tempBuild.armourPieces["arms"];
    build.arms.level = 20;
    if (tempBuild.perks.length > 0) {
        build.arms.cells[0] = Number.parseInt(tempBuild.perks.shift() as string);
    }

    build.legs.id = tempBuild.armourPieces["legs"];
    build.legs.level = 20;
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
    requiredPerks: number[],
    maxBuilds: number,
    currentPerkValues: { [id: number]: number },
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
    for (const requiredPerk of requiredPerks) {
        if (currentPerkValues[requiredPerk] > 0) {
            if (isDefined) {
                buildComplete = false;
            }
            totalPerkThreshold += currentPerkValues[requiredPerk];
        }
    }
    if (buildComplete && isDefined) {
        tempBuild.armourPieces[armourTypeValues[armourType]] = 0;
        findArmourPiece(armourType + 1, requiredPerks, maxBuilds, currentPerkValues, tempBuild, tempBuilds, finderData);
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
                requiredPerks,
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
                requiredPerks,
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
    requiredPerks: number[],
    maxBuilds: number,
    currentPerkValues: { [id: number]: number },
    tempBuild: TempBuild,
    tempBuilds: TempBuild[],
    finderData: FinderData,
): void => {
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
                tempBuild.armourPieces[armourTypeValues[armourType]] = armour.id;
                findArmourPiece(
                    armourType + 1,
                    requiredPerks,
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

    for (let i = 0; i < requiredPerks.length; i++) {
        if (currentPerkValues[requiredPerks[i]] <= 0 || !(requiredPerks[i] in currentData)) {
            continue;
        }

        for (const armour of currentData[requiredPerks[i]][0]) {
            const perks = armour.perks;
            reduceCurrentPerkValues(perks, currentPerkValues);
            tempBuild.armourPieces[armourTypeValues[armourType]] = armour.id;
            findArmourPiece(
                armourType + 1,
                requiredPerks,
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
    findArmourPiece(armourType + 1, requiredPerks, maxBuilds, currentPerkValues, tempBuild, tempBuilds, finderData);
};

const findArmourPiece3Perks = (
    armourType: number,
    requiredPerks: number[],
    maxBuilds: number,
    currentPerkValues: { [id: number]: number },
    tempBuild: TempBuild,
    tempBuilds: TempBuild[],
    finderData: FinderData,
): void => {
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
                    tempBuild.armourPieces[armourTypeValues[armourType]] = armour.id;
                    findArmourPiece(
                        armourType + 1,
                        requiredPerks,
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
                tempBuild.armourPieces[armourTypeValues[armourType]] = armour.id;
                findArmourPiece(
                    armourType + 1,
                    requiredPerks,
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

    for (let i = 0; i < requiredPerks.length; i++) {
        if (currentPerkValues[requiredPerks[i]] <= 0 || !(requiredPerks[i] in currentData)) {
            continue;
        }

        for (const armour of currentData[requiredPerks[i]][0][0]) {
            const perks = armour.perks;
            reduceCurrentPerkValues(perks, currentPerkValues);
            tempBuild.armourPieces[armourTypeValues[armourType]] = armour.id;
            findArmourPiece(
                armourType + 1,
                requiredPerks,
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
    findArmourPiece(armourType + 1, requiredPerks, maxBuilds, currentPerkValues, tempBuild, tempBuilds, finderData);
};

const addBuild = (
    tempBuild: TempBuild,
    tempBuilds: TempBuild[],
    currentPerkValues: { [id: number]: number },
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

    let perks: string[] = [];
    for (let key in currentPerkValues) {
        for (let i = 0; i < currentPerkValues[key]; i++) {
            perks.push(key);
        }
    }

    for (let head of heads) {
        for (let torso of torsos) {
            for (let arm of arms) {
                for (let leg of legs) {
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
                        )
                    ) {
                        continue;
                    }
                    let newTempBuild: TempBuild = {
                        armourPieces: {
                            head: head,
                            torso: torso,
                            arms: arm,
                            legs: leg,
                        },
                        perks: perks,
                    };
                    tempBuilds.push(newTempBuild);
                }
            }
        }
    }
};
