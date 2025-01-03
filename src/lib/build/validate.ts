import { BuildFlags, type Build } from "./Build";
import { talentEmpty } from "./talents";
import { armourMaxLevel, weaponMaxLevel } from "$lib/data/static-data";
import type { ArmourType } from "$lib/data/phalanx-types";
import { phalanxWeapons } from "$lib/data/phalanx-weapons";
import { phalanxArmours } from "$lib/data/phalanx-armours";
import { phalanxPerks } from "$lib/data/phalanx-perks";
import { phalanxLanternCores } from "$lib/data/phalanx-lantern-cores";

export const validate = (build: Build): Build => {
    const newBuild = structuredClone(build);

    const levelIsInRange = (level: number, maxLevel: number) => level >= 1 && level <= maxLevel;
    const weaponExists = (id: number) => (id === 0 ? true : id in phalanxWeapons);
    const armourExists = (id: number) => (id === 0 ? true : id in phalanxArmours);
    const armourIs = (id: number, type: ArmourType) => (id === 0 ? true : phalanxArmours[id].type === type);
    const lanternCoreExists = (id: number) => (id === 0 ? true : id in phalanxLanternCores);
    const perkExists = (id: number) => (id === 0 ? true : id in phalanxPerks);
    const hasInvalidCell = (cells: number[]) => !cells.some(perkExists);

    // weapon 1
    if (!weaponExists(build.weapon1.id)) {
        newBuild.weapon1.id = 0;
        newBuild.weapon1.talents = talentEmpty();
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    if (!levelIsInRange(build.weapon1.level, weaponMaxLevel)) {
        newBuild.weapon1.level = weaponMaxLevel;
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    // weapon 2
    if (!weaponExists(build.weapon2.id)) {
        newBuild.weapon2.id = 0;
        newBuild.weapon2.talents = talentEmpty();
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    if (!levelIsInRange(build.weapon2.level, weaponMaxLevel)) {
        newBuild.weapon2.level = weaponMaxLevel;
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    // head
    if (!armourExists(build.head.id) || !armourIs(build.head.id, "head")) {
        newBuild.head.id = 0;
        newBuild.head.cells = [0];
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    if (hasInvalidCell(build.head.cells)) {
        newBuild.head.cells = build.head.cells.map((perkId) => (perkExists(perkId) ? perkId : 0));
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    if (!levelIsInRange(build.head.level, armourMaxLevel)) {
        newBuild.head.level = armourMaxLevel;
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    // torso
    if (!armourExists(build.torso.id) || !armourIs(build.torso.id, "torso")) {
        newBuild.torso.id = 0;
        newBuild.torso.cells = [0, 0];
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    if (hasInvalidCell(build.torso.cells)) {
        newBuild.torso.cells = build.torso.cells.map((perkId) => (perkExists(perkId) ? perkId : 0));
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    if (!levelIsInRange(build.torso.level, armourMaxLevel)) {
        newBuild.torso.level = armourMaxLevel;
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    // arms
    if (!armourExists(build.arms.id) || !armourIs(build.arms.id, "arms")) {
        newBuild.arms.id = 0;
        newBuild.arms.cells = [0];
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    if (hasInvalidCell(build.arms.cells)) {
        newBuild.arms.cells = build.arms.cells.map((perkId) => (perkExists(perkId) ? perkId : 0));
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    if (!levelIsInRange(build.arms.level, armourMaxLevel)) {
        newBuild.arms.level = armourMaxLevel;
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    // legs
    if (!armourExists(build.legs.id) || !armourIs(build.legs.id, "legs")) {
        newBuild.legs.id = 0;
        newBuild.legs.cells = [0, 0];
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    if (hasInvalidCell(build.legs.cells)) {
        newBuild.legs.cells = build.legs.cells.map((perkId) => (perkExists(perkId) ? perkId : 0));
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    if (!levelIsInRange(build.legs.level, armourMaxLevel)) {
        newBuild.legs.level = armourMaxLevel;
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    // lantern core
    if (!lanternCoreExists(build.lanternCore.id)) {
        newBuild.lanternCore.id = 0;
        newBuild.flags = newBuild.flags | BuildFlags.InvalidBuild;
    }

    return newBuild;
};

export const buildIsValid = (build: Build): boolean => (build.flags & BuildFlags.InvalidBuild) === 0;
