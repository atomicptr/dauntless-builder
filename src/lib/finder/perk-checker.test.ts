import { expect, inject, test } from "vitest";
import { findAvailablePerksImplementation } from "./perk-checker";

test("perkChecker", () => {
    const finderData = inject("finderData");
    const builderData = inject("builderData");

    const requiredPerks = [5, 8, 17, 24, 30];
    let requestedPerks = [...Array(81).keys()].slice(1);
    requestedPerks = requestedPerks.filter((perk) => requiredPerks.indexOf(perk) === -1);
    expect(
        findAvailablePerksImplementation(requiredPerks, requestedPerks, finderData, builderData.perks).toSorted(),
    ).toStrictEqual([
        4, 6, 9, 10, 11, 12, 18, 19, 20, 21, 23, 26, 27, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 44, 45, 46, 47, 48, 51,
        52, 54, 55, 56, 57, 58, 60, 63, 64, 65, 66, 67, 69, 70, 71, 73, 74, 77,
    ].toSorted());
});
