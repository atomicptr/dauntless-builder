import { type Build } from "$lib/build/Build";
import { page } from "$app/stores";
import { get } from "svelte/store";
import type { FinderData, Perk } from "$lib/data/phalanx-types";
import { findAvailablePerksImplementation } from "./perk-checker";
import { findBuildsImplementation } from "./build-finder";

export const findBuilds = (selectedPerks: number[]): Build[] => {
    const finderData: FinderData = get(page).data.finderData;
    const allPerks: { [id: string]: Perk } = get(page).data.perks;

    return findBuildsImplementation(selectedPerks, 50, finderData, allPerks);
};

export const findAvailablePerks = (selectedPerks: number[], requestedPerks: number[]): number[] => {
    const finderData: FinderData = get(page).data.finderData;
    const allPerks: { [id: string]: Perk } = get(page).data.perks;

    return findAvailablePerksImplementation(selectedPerks, requestedPerks, finderData, allPerks);
};
