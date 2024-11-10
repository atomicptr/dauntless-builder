import { expect, inject, test } from "vitest";
import { findAvailablePerksImplementation } from "./perk-checker";

test("basicTest1", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks: number[] = [];
    const requestedPerks = [1];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());
});

test("basicTest2", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks: number[] = [];
    const requestedPerks = [1, 6, 3, 5];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());
});

test("basicTest3", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks = [1, 6, 3, 5];
    const requestedPerks = [4];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual([]);
});

test("requestAll", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks: number[] = [];
    const requestedPerks = [...Array(81).keys()].slice(1);
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());
});

test("largeQuantityPerkChecker", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks = [5, 8, 17, 24, 30];
    let requestedPerks = [...Array(81).keys()].slice(1);
    requestedPerks = requestedPerks.filter((perk) => selectedPerks.indexOf(perk) === -1);
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual(
        [
            4, 6, 9, 10, 11, 12, 18, 19, 20, 21, 23, 26, 27, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 44, 45, 46, 47, 48,
            51, 52, 54, 55, 56, 57, 58, 60, 63, 64, 65, 66, 67, 69, 70, 71, 73, 74, 77,
        ].toSorted(),
    );
});

test("useAllThreshold2", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks = [5, 8, 17, 24, 30, 44, 48, 71];
    const requestedPerks = [77];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual([]);
});

test("useAllThreshold3", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks = [7, 10, 13, 22, 25, 42, 72];
    const requestedPerks = [76];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual([]);
});

test("useAllThreshold6", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks = [4, 6, 11, 12, 18, 19, 21, 27, 33, 36, 49, 51, 53, 54, 56, 58];
    const requestedPerks = [67];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual([]);
});

test("useAllThreshold7", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks = [2, 40, 59, 60, 65];
    const requestedPerks = [79];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual([]);
});

test("useAllThreshold8", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks = [16, 32];
    const requestedPerks = [57];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual([]);
});

test("threshold8Tests", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    let selectedPerks = [16];
    let requestedPerks = [32];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());

    selectedPerks = [67];
    requestedPerks = [16];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());

    selectedPerks = [32];
    requestedPerks = [57];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());
});

test("limitedBuildTest", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks = [32, 57];
    const requestedPerks = [8, 20, 26, 38, 41, 42, 46, 48, 50, 51, 55, 67];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual([8, 20, 26, 38, 41, 42, 46, 48, 50, 51, 55, 67].toSorted());
});

test("oppositeLimitedBuildTest", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const selectedPerks = [32, 57];
    let requestedPerks = [...Array(81).keys()].slice(1);
    const removePerks = [8, 20, 26, 32, 38, 41, 42, 46, 48, 50, 51, 55, 57, 67];
    requestedPerks = requestedPerks.filter((perk) => removePerks.indexOf(perk) === -1);
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual([]);
});
