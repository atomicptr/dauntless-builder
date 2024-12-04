import type {
    Armour,
    ArmourType,
    Element,
    LanternCore,
    Perk,
    PerkType,
    TranslatableString,
    Weapon,
    WeaponType,
} from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";

export interface GenericItem {
    id: number;
    name: TranslatableString | null;
    icon: string | null;
}

export type FilterItem = GenericItem | Weapon | Armour | LanternCore | Perk;

export type FilterFunc = (item: FilterItem) => boolean;

export const applyAll = (items: FilterItem[], funcs: FilterFunc[]) =>
    items.filter((item) => funcs.every((f) => f(item)));

export const filterName = (search: string) => (item: FilterItem) =>
    translatableString(item.name).toLowerCase().indexOf(search.toLowerCase()) > -1;

export const filterWeaponType = (weaponType: WeaponType) => (item: FilterItem) => (item as Weapon).type === weaponType;

export const filterArmourType = (armourType: ArmourType) => (item: FilterItem) => (item as Armour).type === armourType;

export const filterElementType = (element: Element) => (item: FilterItem) =>
    (item as Weapon | Armour).element === element;

export const filterPerkByPerkType = (perkType: PerkType) => (item: FilterItem) => (item as Perk).type === perkType;

export const filterArmourByPerk = (perkId: number) => (item: FilterItem) =>
    (item as Armour).stats.some((stats) => perkId in stats.perks);
