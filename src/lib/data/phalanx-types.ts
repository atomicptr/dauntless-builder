export interface Data {
    patch: Patch;
    armours: {
        [id: string]: Armour;
    };
    weapons: {
        [id: string]: Weapon;
    };
    perks: {
        [id: string]: Perk;
    };
}

export interface Patch {
    name: string;
    version: {
        major: number;
        minor: number;
        patch: number;
    };
}

export type ArmourType = "head" | "torso" | "arms" | "legs";

export type Element = "blaze" | "frost" | "shock" | "terra" | "umbral" | "radiant";

export type Stat = "might";

export interface Armour {
    id: number;
    name: string;
    description: string;
    type: ArmourType;
    icon: string | null;
    element: Element;
    cell_slots: number;
    stats: {
        min_level: number;
        perks: {
            [perkId: string]: number;
        };
    }[];
}

export type WeaponType =
    | "sword"
    | "axe"
    | "hammer"
    | "war_pike"
    | "chain_blades"
    | "ostian_repeaters"
    | "aether_strikers";

export interface Weapon {
    id: number;
    name: string;
    description: string;
    type: WeaponType;
    icon: string | null;
    element: Element;
    special: WeaponAbility | null;
    active: WeaponAbility | null;
    passive: WeaponAbility | null;
    talents: WeaponTalent | null[];
}

export type WeaponAbility = {};

export type WeaponTalent = {};

export interface Perk {
    id: number;
    name: string;
    effect: string;
    values: ValuesType[];
    threshold: number;
}

export type ValuesType = ValuesTypeStat | ValuesTypeCustom;

export interface ValuesTypeStat {
    name: string;
    type: "stat";
    stat: Stat;
    value: number;
}

export interface ValuesTypeCustom {
    name: string;
    type: "custom";
    value: number;
}
