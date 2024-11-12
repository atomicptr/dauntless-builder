import { expect, inject, test } from "vitest";
import { findBuildsImplementation } from "./build-finder";
import { armourStatsForLevel, getCellPerks, mergePerksArray } from "$lib/data/levels";

test("basicBuildFinder1", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const maxBuilds = 50;
    const requiredPerks = [5, 8, 17, 24, 30, 36];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, finderData, builderData.perks).length).toStrictEqual(47);
});

test("basicBuildFinder2", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const maxBuilds = 50;
    const requiredPerks = [1, 16, 32];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, finderData, builderData.perks).length).toStrictEqual(27);
});

test("basicBuildFinder3", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const maxBuilds = 50;
    const requiredPerks = [16, 32, 48, 63];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, finderData, builderData.perks).length).toStrictEqual(11);
});

test("limitTestSmall", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const maxBuilds = 20;
    const requiredPerks = [5, 8, 17, 24, 30, 36];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, finderData, builderData.perks).length).toStrictEqual(
        maxBuilds,
    );
});

test("limitTestLarge", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const maxBuilds = 50;
    const requiredPerks = [15];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, finderData, builderData.perks).length).toStrictEqual(
        maxBuilds,
    );
});

test("validBuildTest", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const maxBuilds = 50;
    const requiredPerks = [22, 41, 73];
    const builds = findBuildsImplementation(requiredPerks, maxBuilds, finderData, builderData.perks);
    for (const build of builds) {
        const perkSet = mergePerksArray([
            builderData.armours[build.head.id]
                ? (armourStatsForLevel(builderData.armours[build.head.id], build.head.level) ?? {})
                : {},
            getCellPerks(build.head.cells),
            builderData.armours[build.torso.id]
                ? (armourStatsForLevel(builderData.armours[build.torso.id], build.torso.level) ?? {})
                : {},
            getCellPerks(build.torso.cells),
            builderData.armours[build.arms.id]
                ? (armourStatsForLevel(builderData.armours[build.arms.id], build.arms.level) ?? {})
                : {},
            getCellPerks(build.arms.cells),
            builderData.armours[build.legs.id]
                ? (armourStatsForLevel(builderData.armours[build.legs.id], build.legs.level) ?? {})
                : {},
            getCellPerks(build.legs.cells),
        ]);
        for (const perk of requiredPerks) {
            const amount = perkSet[perk];
            expect(amount).toBeGreaterThanOrEqual(builderData.perks[perk].threshold);
        }
    }
});
