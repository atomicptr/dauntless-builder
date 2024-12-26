import { expect, test } from "vitest";
import { findAvailablePerksImplementation } from "./perk-checker";
import { phalanxFinderData } from "$lib/data/phalanx-finder-data";
import { phalanxPerks } from "$lib/data/phalanx-perks";

test("basicPerkChecker1", () => {
    const selectedPerks: number[] = [];
    const requestedPerks = [1];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());
});

test("basicPerkChecker2", () => {
    const selectedPerks: number[] = [];
    const requestedPerks = [1, 6, 3, 5];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());
});

test("basicPerkChecker3", () => {
    const selectedPerks = [1, 6, 3, 5];
    const requestedPerks = [4];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual([]);
});

test("requestAllPerks", () => {
    const selectedPerks: number[] = [];
    const requestedPerks = Object.values(phalanxPerks).map((perk) => perk.id);
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());
});

test("largeQuantityPerkChecker", () => {
    const selectedPerks = [5, 8, 17, 24, 30];
    let requestedPerks = Object.values(phalanxPerks).map((perk) => perk.id);
    requestedPerks = requestedPerks.filter((perk) => selectedPerks.indexOf(perk) === -1);
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual(
        [
            4, 6, 9, 11, 12, 18, 19, 20, 21, 23, 26, 27, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 43, 44, 45, 46, 47, 48,
            51, 52, 54, 55, 56, 57, 58, 60, 63, 64, 65, 66, 67, 69, 70, 71, 73, 74, 77,
        ].toSorted(),
    );
});

test("useAllThreshold2", () => {
    const selectedPerks = [5, 8, 17, 24, 30, 44, 48, 71];
    const requestedPerks = [77];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual([]);
});

test("useAllThreshold3", () => {
    const selectedPerks = [7, 10, 13, 22, 25, 42, 72];
    const requestedPerks = [76];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual([]);
});

test("useAllThreshold6", () => {
    const selectedPerks = [4, 6, 11, 12, 18, 19, 21, 27, 33, 36, 49, 51, 53, 54, 56, 58];
    const requestedPerks = [67];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual([]);
});

test("useAllThreshold7", () => {
    const selectedPerks = [2, 40, 59, 60, 65];
    const requestedPerks = [79];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual([]);
});

test("useAllThreshold8", () => {
    const selectedPerks = [16, 32];
    const requestedPerks = [57];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual([]);
});

test("threshold8Tests", () => {
    let selectedPerks = [16];
    let requestedPerks = [32];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());

    selectedPerks = [67];
    requestedPerks = [16];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());

    selectedPerks = [32];
    requestedPerks = [57];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());
});

test("limitedBuildTest", () => {
    const selectedPerks = [32, 57];
    const requestedPerks = [
        8, 20, 26, 38, 41, 42, 46, 48, 51, 55, 67, 80, 81, 10, 13, 17, 22, 24, 25, 29, 30, 31, 34, 35, 39, 43, 44, 45,
        47, 5, 52, 64, 66, 69, 7, 70, 71, 72, 73, 74, 76, 77, 9,
    ];
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual(requestedPerks.toSorted());
});

test("oppositeLimitedBuildTest", () => {
    const selectedPerks = [32, 57];
    let requestedPerks = Object.values(phalanxPerks).map((perk) => perk.id);
    const removePerks = [
        8, 20, 26, 32, 38, 41, 42, 46, 48, 51, 55, 57, 67, 80, 81, 10, 13, 17, 22, 24, 25, 29, 30, 31, 34, 35, 39, 43,
        44, 45, 47, 5, 52, 64, 66, 69, 7, 70, 71, 72, 73, 74, 76, 77, 9,
    ];
    requestedPerks = requestedPerks.filter((perk) => removePerks.indexOf(perk) === -1);
    expect(
        findAvailablePerksImplementation(selectedPerks, requestedPerks, phalanxFinderData, phalanxPerks).toSorted(),
    ).toStrictEqual([]);
});
