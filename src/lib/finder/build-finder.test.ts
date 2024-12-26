import { expect, test } from "vitest";
import { findBuildsImplementation } from "./build-finder";
import { armourStatsForLevel, getCellPerks, mergePerksArray } from "$lib/data/levels";
import { phalanxFinderData } from "$lib/data/phalanx-finder-data";
import { phalanxPerks } from "$lib/data/phalanx-perks";
import { phalanxArmours } from "$lib/data/phalanx-armours";

test("basicBuildFinder1", () => {
    const maxBuilds = 50;
    const requiredPerks = [5, 8, 17, 24, 30, 36];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxPerks).length).toStrictEqual(
        47,
    );
});

test("basicBuildFinder2", () => {
    const maxBuilds = 50;
    const requiredPerks = [1, 16, 32];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxPerks).length).toStrictEqual(
        27,
    );
});

test("basicBuildFinder3", () => {
    const maxBuilds = 50;
    const requiredPerks = [16, 32, 48, 63];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxPerks).length).toStrictEqual(
        11,
    );
});

test("limitTestSmall", () => {
    const maxBuilds = 20;
    const requiredPerks = [5, 8, 17, 24, 30, 36];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxPerks).length).toStrictEqual(
        maxBuilds,
    );
});

test("limitTestLarge", () => {
    const maxBuilds = 50;
    const requiredPerks = [15];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxPerks).length).toStrictEqual(
        maxBuilds,
    );
});

test("validBuildTest", () => {
    const maxBuilds = 50;
    const requiredPerks = [22, 41, 73];
    const builds = findBuildsImplementation(requiredPerks, maxBuilds, phalanxFinderData, phalanxPerks);
    for (const build of builds) {
        const perkSet = mergePerksArray([
            phalanxArmours[build.head.id]
                ? (armourStatsForLevel(phalanxArmours[build.head.id], build.head.level) ?? {})
                : {},
            getCellPerks(build.head.cells),
            phalanxArmours[build.torso.id]
                ? (armourStatsForLevel(phalanxArmours[build.torso.id], build.torso.level) ?? {})
                : {},
            getCellPerks(build.torso.cells),
            phalanxArmours[build.arms.id]
                ? (armourStatsForLevel(phalanxArmours[build.arms.id], build.arms.level) ?? {})
                : {},
            getCellPerks(build.arms.cells),
            phalanxArmours[build.legs.id]
                ? (armourStatsForLevel(phalanxArmours[build.legs.id], build.legs.level) ?? {})
                : {},
            getCellPerks(build.legs.cells),
        ]);
        for (const perk of requiredPerks) {
            const amount = perkSet[perk];
            expect(amount).toBeGreaterThanOrEqual(phalanxPerks[perk].threshold);
        }
    }
});
