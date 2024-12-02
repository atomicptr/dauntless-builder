import { ok, err, type Result } from "neverthrow";
import { talentEmpty, talentParse, talentSerialize, type TalentGrid } from "./talents";
import { sqids } from "$lib/sqids";

export const CURRENT_BUILD_VERSION = 10;

export enum BuildFlags {
    UpgradedBuild = 0b0001,
    InvalidBuild = 0b0010,
}

export enum BuildFields {
    // meta
    Version = 0,
    Flags = 1,

    // weapon 1
    Weapon1Id = 2,
    Weapon1Level = 3,
    Weapon1Talents = 4,

    // weapon 2
    Weapon2Id = 5,
    Weapon2Level = 6,
    Weapon2Talents = 7,

    // head
    HeadId = 8,
    HeadLevel = 9,
    HeadCell = 10,

    // torso
    TorsoId = 11,
    TorsoLevel = 12,
    TorsoCell1 = 13,
    TorsoCell2 = 14,

    // arms
    ArmsId = 15,
    ArmsLevel = 16,
    ArmsCell = 17,

    // legs
    LegsId = 18,
    LegsLevel = 19,
    LegsCell1 = 20,
    LegsCell2 = 21,

    // lantern core
    LanternCoreId = 22,

    // checksum
    Checksum = 23,
}

export interface Build {
    version: number;
    flags: number;
    weapon1: BuildWeapon;
    weapon2: BuildWeapon;
    head: BuildArmourPiece;
    torso: BuildArmourPiece;
    arms: BuildArmourPiece;
    legs: BuildArmourPiece;
    lanternCore: BuildLanternCore;
}

export interface BuildWeapon {
    id: number;
    level: number;
    talents: TalentGrid;
}

export interface BuildArmourPiece {
    id: number;
    level: number;
    cells: number[];
}

export interface BuildLanternCore {
    id: number;
}

export const empty = (): Build => {
    return {
        version: CURRENT_BUILD_VERSION,
        flags: 0,
        weapon1: {
            id: 0,
            level: 1,
            talents: talentEmpty(),
        },
        weapon2: {
            id: 0,
            level: 1,
            talents: talentEmpty(),
        },
        head: {
            id: 0,
            level: 1,
            cells: [0],
        },
        torso: {
            id: 0,
            level: 1,
            cells: [0, 0],
        },
        arms: {
            id: 0,
            level: 1,
            cells: [0],
        },
        legs: {
            id: 0,
            level: 1,
            cells: [0, 0],
        },
        lanternCore: {
            id: 0,
        },
    };
};

export const deserialize = (buildId: string): Result<Build, string> => {
    const data = sqids.decode(buildId);
    const supposedLength = BuildFields.Checksum + 1;

    if (data.length !== supposedLength) {
        return err(`build length should be ${supposedLength}`);
    }

    const ids = data.slice(0, data.length - 1);
    const rest = data.slice(ids.length);
    const checksum = rest.length > 0 ? rest[0] : null;

    if (checksum === null) {
        return err("invalid checksum");
    }

    if (!checkChecksum(ids, checksum)) {
        return err("invalid checksum");
    }

    // TODO: do validation

    return ok({
        version: ids[BuildFields.Version],
        flags: ids[BuildFields.Flags],
        weapon1: {
            id: ids[BuildFields.Weapon1Id],
            level: ids[BuildFields.Weapon1Level],
            talents: talentParse(ids[BuildFields.Weapon1Talents]),
        },
        weapon2: {
            id: ids[BuildFields.Weapon2Id],
            level: ids[BuildFields.Weapon2Level],
            talents: talentParse(ids[BuildFields.Weapon2Talents]),
        },
        head: {
            id: ids[BuildFields.HeadId],
            level: ids[BuildFields.HeadLevel],
            cells: [ids[BuildFields.HeadCell]],
        },
        torso: {
            id: ids[BuildFields.TorsoId],
            level: ids[BuildFields.TorsoLevel],
            cells: [ids[BuildFields.TorsoCell1], ids[BuildFields.TorsoCell2]],
        },
        arms: {
            id: ids[BuildFields.ArmsId],
            level: ids[BuildFields.ArmsLevel],
            cells: [ids[BuildFields.ArmsCell]],
        },
        legs: {
            id: ids[BuildFields.LegsId],
            level: ids[BuildFields.LegsLevel],
            cells: [ids[BuildFields.LegsCell1], ids[BuildFields.LegsCell2]],
        },
        lanternCore: {
            id: ids[BuildFields.LanternCoreId],
        },
    });
};

export const serialize = (build: Build): Result<string, string> => {
    // TODO: do validation

    const data: number[] = [
        build.version,
        build.flags,
        build.weapon1.id,
        build.weapon1.level,
        talentSerialize(build.weapon1.talents),
        build.weapon2.id,
        build.weapon2.level,
        talentSerialize(build.weapon2.talents),
        build.head.id,
        build.head.level,
        build.head.cells[0],
        build.torso.id,
        build.torso.level,
        build.torso.cells[0],
        build.torso.cells[1],
        build.arms.id,
        build.arms.level,
        build.arms.cells[0],
        build.legs.id,
        build.legs.level,
        build.legs.cells[0],
        build.legs.cells[1],
        build.lanternCore.id,
    ];

    const checksum = calculateChecksum(data);
    const buildId = sqids.encode([...data, checksum]);

    return ok(buildId);
};

const calculateChecksum = (data: number[]): number => {
    let checksum = 0;
    data.forEach((d) => (checksum ^= d));
    return checksum;
};

const checkChecksum = (data: number[], checksum: number): boolean => calculateChecksum(data) === checksum;
