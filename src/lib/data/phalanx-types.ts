export interface HasMetaData {
    __meta?: {
        commit: string;
        buildTime: number;
    };
}

export type WeaponsData = HasMetaData & {
    items: { [id: string]: Weapon };
};

export type ArmoursData = HasMetaData & {
    items: { [id: string]: Armour };
};

export type PerksData = HasMetaData & {
    items: { [id: string]: Perk };
};

export type LanternCoresData = HasMetaData & {
    items: { [id: string]: LanternCore };
};

export type PatchData = HasMetaData & {
    item: Patch;
};

export interface Patch {
    name: string;
    version: {
        major: number;
        minor: number;
        patch: number;
    };
}

export interface TranslatableString {
    [langIdent: string]: string;
}

export type ArmourType = "head" | "torso" | "arms" | "legs";
export const armourTypeValues: ArmourType[] = ["head", "torso", "arms", "legs"];

export type Element = "blaze" | "frost" | "shock" | "terra" | "umbral" | "radiant";
export const elementValues: Element[] = ["blaze", "frost", "shock", "terra", "umbral", "radiant"];

export type Stat = "might" | "critical" | "speed" | "vitality" | "defense" | "endurance";

export interface PerkSet {
    [perkId: string]: number;
}

export interface Armour {
    id: number;
    name: TranslatableString | null;
    type: ArmourType;
    icon: string | null;
    element: Element;
    cell_slots: number;
    stats: {
        min_level: number;
        perks: PerkSet;
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
export const weaponTypeValues: WeaponType[] = [
    "sword",
    "axe",
    "hammer",
    "war_pike",
    "chain_blades",
    "ostian_repeaters",
    "aether_strikers",
];

export interface Weapon {
    id: number;
    name: TranslatableString | null;
    type: WeaponType;
    icon: string | null;
    element: Element;
    special: WeaponAbility | null;
    active: WeaponAbility | null;
    passive: WeaponAbility | null;
    talents: WeaponTalent[];
}

export interface WeaponAbility {
    name: TranslatableString;
    description: TranslatableString;
    values: ValuesType[];
}

export interface WeaponTalent {
    name: TranslatableString | null;
    options: (WeaponTalentOption | null)[];
}

export type WeaponTalentOption = WeaponTalentOptionStat | WeaponTalentOptionCustom;

export interface WeaponTalentOptionStat {
    name: TranslatableString | null;
    type: "stat";
    stat: Stat;
    value: number;
}

export interface WeaponTalentOptionCustom {
    name: TranslatableString | null;
    type: "custom";
    description: TranslatableString | null;
    values: ValuesType[];
}

export type PerkType = "alacrity" | "brutality" | "finesse" | "fortitude" | "insight";
export const perkTypeValues: PerkType[] = ["alacrity", "brutality", "finesse", "fortitude", "insight"];

export interface Perk {
    id: number;
    name: TranslatableString | null;
    type: PerkType;
    effect: TranslatableString;
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

export interface LanternCore {
    id: number;
    name: TranslatableString | null;
    icon: string | null;
    active_icon: string | null;
    active_cooldown: number | null;
    active: LanternCoreAbility | null;
    passive: LanternCoreAbility | null;
}

export interface LanternCoreAbility {
    title: TranslatableString | null;
    description: TranslatableString | null;
    values: ValuesType[];
}

export interface BuildsData extends HasMetaData {
    meta: Build[];
}

export interface Build {
    id: number;
    name: TranslatableString | null;
    buildId: string;
    description: TranslatableString | null;
    youtube: string | null;
}

export interface FinderData extends HasMetaData {
    head: FinderBasicArmour3LevelPerkMap;
    torso: FinderBasicArmour2LevelPerkMap;
    arms: FinderBasicArmour3LevelPerkMap;
    legs: FinderBasicArmour2LevelPerkMap;
}

export interface FinderBasicArmour2LevelPerkMap {
    [perkLevel1: string]: {
        [perkLevel2: string]: FinderBasicArmour[];
    };
}

export interface FinderBasicArmour3LevelPerkMap {
    [perkLevel1: string]: {
        [perkLevel2: string]: {
            [perkLevel3: string]: FinderBasicArmour[];
        };
    };
}

export interface FinderBasicArmour {
    id: number;
    perks: PerkSet;
}

export type Language = "en" | "de" | "es" | "fr" | "it" | "ja" | "pt" | "ru" | "zh" | "zx" | "tr" | "hu";
export const languageValues: Language[] = ["en", "de", "es", "fr", "it", "ja", "pt", "ru", "zh", "zx", "tr", "hu"];

interface HasI18nStats {
    __stats: {
        [lang in Language]: {
            total: number;
            translated: number;
            approved: number;
            progress: number;
        };
    };
}

export type I18nData = {
    [lang in Language]: {
        [key: string]: string;
    };
} & HasMetaData &
    HasI18nStats;
