import { expect, inject, test } from "vitest";
import { findBuildsImplementation } from "./build-finder";

test("buildFinder1", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const maxBuilds = 50;
    const requiredPerks = [5, 8, 17, 24, 30, 36];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, finderData, builderData.perks).length).toStrictEqual(47);
});

test("buildFinder2", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const maxBuilds = 50;
    const requiredPerks = [1, 16, 32];
    expect(findBuildsImplementation(requiredPerks, maxBuilds, finderData, builderData.perks).length).toStrictEqual(27);
});

test("buildFinder3", () => {
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
