import type { Armour, ArmourType, Element, LanternCore, TranslatableString, Weapon } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";

export interface GenericItem {
    id: number;
    name: TranslatableString | null;
    icon: string | null;
}

export type FilterItem = GenericItem | Weapon | Armour | LanternCore;

export type FilterFunc = (item: FilterItem) => boolean;

export const applyAll = (items: FilterItem[], funcs: FilterFunc[]) =>
    items.filter((item) => funcs.every((f) => f(item)));

export const filterName = (search: string) => (item: FilterItem) =>
    translatableString(item.name).toLowerCase().indexOf(search.toLowerCase()) > -1;

export const filterArmourType = (armourType: ArmourType) => (item: FilterItem) => (item as Armour).type === armourType;

export const filterElementType = (element: Element) => (item: FilterItem) =>
    (item as Weapon | Armour).element === element;
