import { expect, test } from "vitest";
import { findBuildsImplementation } from "./build-finder";
import { armourStatsForLevel, getCellPerks, mergePerksArray } from "$lib/data/levels";
import { phalanxData } from "$lib/data/phalanx-data";
import { phalanxFinderData } from "$lib/data/phalanx-finder-data";

test("basicBuildFinder1", () => {
    const maxBuilds = 50;
    const requiredPerks = [5, 8, 17, 24, 30, 36];
    expect(
        findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxData.perks).length,
    ).toStrictEqual(47);
});

test("basicBuildFinder2", () => {
    const maxBuilds = 50;
    const requiredPerks = [1, 16, 32];
    expect(
        findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxData.perks).length,
    ).toStrictEqual(27);
});

test("basicBuildFinder3", () => {
    const maxBuilds = 50;
    const requiredPerks = [16, 32, 48, 63];
    expect(
        findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxData.perks).length,
    ).toStrictEqual(11);
});

test("limitTestSmall", () => {
    const maxBuilds = 20;
    const requiredPerks = [5, 8, 17, 24, 30, 36];
    expect(
        findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxData.perks).length,
    ).toStrictEqual(maxBuilds);
});

test("limitTestLarge", () => {
    const maxBuilds = 50;
    const requiredPerks = [15];
    expect(
        findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxData.perks).length,
    ).toStrictEqual(maxBuilds);
});

test("validBuildTest", () => {
    const maxBuilds = 50;
    const requiredPerks = [22, 41, 73];
    const builds = findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxData.perks);
    for (const build of builds) {
        const perkSet = mergePerksArray([
            phalanxData.armours[build.head.id]
                ? (armourStatsForLevel(phalanxData.armours[build.head.id], build.head.level) ?? {})
                : {},
            getCellPerks(build.head.cells),
            phalanxData.armours[build.torso.id]
                ? (armourStatsForLevel(phalanxData.armours[build.torso.id], build.torso.level) ?? {})
                : {},
            getCellPerks(build.torso.cells),
            phalanxData.armours[build.arms.id]
                ? (armourStatsForLevel(phalanxData.armours[build.arms.id], build.arms.level) ?? {})
                : {},
            getCellPerks(build.arms.cells),
            phalanxData.armours[build.legs.id]
                ? (armourStatsForLevel(phalanxData.armours[build.legs.id], build.legs.level) ?? {})
                : {},
            getCellPerks(build.legs.cells),
        ]);
        for (const perk of requiredPerks) {
            const amount = perkSet[perk];
            expect(amount).toBeGreaterThanOrEqual(phalanxData.perks[perk].threshold);
        }
    }
});
