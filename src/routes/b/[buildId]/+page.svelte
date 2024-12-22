<script lang="ts">
import { goto } from "$app/navigation";
import { empty, serialize } from "$lib/build/Build.js";
import {
    filterArmourByPerk,
    filterArmourType,
    filterElementType,
    filterPerkByPerkType,
    filterWeaponType,
    type FilterItem,
} from "$lib/build/filters";
import { talentEmpty, talentSet } from "$lib/build/talents.js";
import { buildIsValid } from "$lib/build/validate";
import ArmourPerks from "$lib/components/ArmourPerks.svelte";
import ArmourPicker from "$lib/components/ArmourPicker.svelte";
import ArmourResistance from "$lib/components/ArmourResistance.svelte";
import BuildStats from "$lib/components/BuildStats.svelte";
import BuildTitle from "$lib/components/BuildTitle.svelte";
import ArmourPerkFilter from "$lib/components/filters/ArmourPerkFilter.svelte";
import CellPerkTypeFilter from "$lib/components/filters/CellPerkTypeFilter.svelte";
import ElementFilter from "$lib/components/filters/ElementFilter.svelte";
import WeaponTypeFilter from "$lib/components/filters/WeaponTypeFilter.svelte";
import BuildFinderIcon from "$lib/components/icons/BuildFinderIcon.svelte";
import ExclamationTriangle from "$lib/components/icons/ExclamationTriangle.svelte";
import LanternCorePicker from "$lib/components/LanternCorePicker.svelte";
import LanternCoreStats from "$lib/components/LanternCoreStats.svelte";
import LazyImage from "$lib/components/LazyImage.svelte";
import Level from "$lib/components/Level.svelte";
import PerkList from "$lib/components/PerkList.svelte";
import PickerModal, { type FilterData, type ListItemData } from "$lib/components/PickerModal.svelte";
import TalentModal from "$lib/components/TalentModal.svelte";
import ValuesText from "$lib/components/ValuesText.svelte";
import WeaponPicker from "$lib/components/WeaponPicker.svelte";
import WeaponPower from "$lib/components/WeaponPower.svelte";
import { itemIconSize } from "$lib/constants";
import { armourStatsForLevel, getCellPerks, mergePerksArray } from "$lib/data/levels";
import { phalanxData } from "$lib/data/phalanx-data.js";
import {
    type Armour,
    type ArmourType,
    type LanternCore,
    type Perk,
    type PerkType,
    type Weapon,
    type WeaponType,
    type Element,
} from "$lib/data/phalanx-types.js";
import { armourMaxLevel, weaponMaxLevel } from "$lib/data/static-data.js";
import { finderDefaultData, finderPageDataSerialize } from "$lib/finder/initial";
import { t } from "$lib/i18n.svelte.js";
import { translatableString } from "$lib/utils/translatable-string.js";

const { data } = $props();

interface DialogProps {
    open: "weapon" | "weapon_talent" | "armour" | "lantern_core" | "cells" | null;
    initialLevel?: number;
    filters: FilterData;
}

let dialog: DialogProps = $state({ open: null, filters: {} });

const updateBuild = () => {
    data.build.flags = 0; // reset flags when user changes something
    const buildId = serialize(data.build).unwrapOr(empty());
    console.log(buildId, data.build);
    goto(`/b/${buildId}`, { noScroll: true });
};

const onWeaponPickerClicked = (picker: 1 | 2) => () => {
    dialog = {
        open: "weapon",
        initialLevel: data.build[`weapon${picker}`].id === 0 ? weaponMaxLevel : data.build[`weapon${picker}`].level,
        filters: { picker, weaponType: null, element: null },
    };
};

const onWeaponTalentPickerClicked = (picker: 1 | 2) => () => {
    dialog = {
        open: "weapon_talent",
        filters: { picker },
    };
};

const onArmourPieceClickerClicked = (type: ArmourType) => {
    dialog = {
        open: "armour",
        initialLevel: data.build[type].id === 0 ? armourMaxLevel : data.build[type].level,
        filters: { type, element: null, perkType: null },
    };
};

const onArmourCellPickerClicked = (type: ArmourType, index: number) => {
    dialog = {
        open: "cells",
        filters: { type, index, perkType: null },
    };
};

const onLanternCorePickerClicked = () => {
    dialog = {
        open: "lantern_core",
        filters: {},
    };
};

const onFilterUpdated = (newFilterData: FilterData) => {
    dialog.filters = { ...dialog.filters, ...newFilterData };
};

const onItemSelected = (id: number, itemData: ListItemData) => {
    switch (dialog.open) {
        case "weapon":
            const other = dialog.filters.picker === 1 ? 2 : 1;

            // if the weapon we just selected is in the other slot
            if (data.build[`weapon${other}`].id === id && id !== 0) {
                data.build[`weapon${other}`].id = data.build[`weapon${dialog.filters.picker as 1 | 2}`].id;
                data.build[`weapon${other}`].talents = data.build[`weapon${dialog.filters.picker as 1 | 2}`].talents;
            }

            data.build[`weapon${dialog.filters.picker as 1 | 2}`] = {
                id,
                level: itemData.level ?? weaponMaxLevel,
                talents: talentEmpty(),
            };
            break;
        case "armour":
            const prevCells = data.build[dialog.filters.type as ArmourType].cells;

            data.build[dialog.filters.type as ArmourType] = {
                id,
                level: itemData.level ?? armourMaxLevel,
                cells: prevCells,
            };
            break;
        case "lantern_core":
            data.build.lanternCore = { id };
            break;
        case "cells":
            data.build[dialog.filters.type as ArmourType].cells[dialog.filters.index as number] = id;
            break;
    }
    onDialogClosed();
    updateBuild();
};

const onTalentSelected = (row: number, col: number, value: boolean) => {
    data.build[`weapon${dialog.filters.picker as 1 | 2}`].talents = talentSet(
        data.build[`weapon${dialog.filters.picker as 1 | 2}`].talents,
        row,
        col,
        value,
    );
    updateBuild();
};

const onDialogClosed = () => {
    dialog = { open: null, filters: {} };
};

const elementClass = (item: FilterItem): string =>
    "element" in item ? `element-border element-border-${item.element}` : "";

const isCopyButtonVisible = () => {
    const perks = mergePerksArray([
        phalanxData.armours[data.build.head.id]
            ? (armourStatsForLevel(phalanxData.armours[data.build.head.id], data.build.head.level) ?? {})
            : {},
        getCellPerks(data.build.head.cells),
        phalanxData.armours[data.build.torso.id]
            ? (armourStatsForLevel(phalanxData.armours[data.build.torso.id], data.build.torso.level) ?? {})
            : {},
        getCellPerks(data.build.torso.cells),
        phalanxData.armours[data.build.arms.id]
            ? (armourStatsForLevel(phalanxData.armours[data.build.arms.id], data.build.arms.level) ?? {})
            : {},
        getCellPerks(data.build.arms.cells),
        phalanxData.armours[data.build.legs.id]
            ? (armourStatsForLevel(phalanxData.armours[data.build.legs.id], data.build.legs.level) ?? {})
            : {},
        getCellPerks(data.build.legs.cells),
    ]);

    return Object.entries(perks).filter(([perkId, amount]) => phalanxData.perks[perkId].threshold <= amount).length > 0;
};

const gotoFinderPageUsingCurrentPerks = () => {
    const finderData = finderDefaultData();

    const perks = mergePerksArray([
        phalanxData.armours[data.build.head.id]
            ? (armourStatsForLevel(phalanxData.armours[data.build.head.id], data.build.head.level) ?? {})
            : {},
        getCellPerks(data.build.head.cells),
        phalanxData.armours[data.build.torso.id]
            ? (armourStatsForLevel(phalanxData.armours[data.build.torso.id], data.build.torso.level) ?? {})
            : {},
        getCellPerks(data.build.torso.cells),
        phalanxData.armours[data.build.arms.id]
            ? (armourStatsForLevel(phalanxData.armours[data.build.arms.id], data.build.arms.level) ?? {})
            : {},
        getCellPerks(data.build.arms.cells),
        phalanxData.armours[data.build.legs.id]
            ? (armourStatsForLevel(phalanxData.armours[data.build.legs.id], data.build.legs.level) ?? {})
            : {},
        getCellPerks(data.build.legs.cells),
    ]);

    finderData.perks = Object.entries(perks)
        .filter(([perkId, amount]) => phalanxData.perks[perkId].threshold <= amount)
        .map(([perkId, _]) => Number(perkId));

    goto(`/b/finder/${finderPageDataSerialize(finderData)}`);
};
</script>

<BuildTitle buildId={serialize(data.build).unwrapOr("")} hidden />

{#if !buildIsValid(data.build)}
    <div class="alert alert-error mb-4">
        <ExclamationTriangle />
        {$t("page-build-invalid-message")}
    </div>
{/if}

<div class="flex flex-col sm:flex-row">
    <div class="flex flex-col gap-2 sm:w-2/3">
        <WeaponPicker
            selected={data.build.weapon1}
            onWeaponClick={onWeaponPickerClicked(1)}
            onTalentClick={onWeaponTalentPickerClicked(1)}
        />
        <WeaponPicker
            selected={data.build.weapon2}
            onWeaponClick={onWeaponPickerClicked(2)}
            onTalentClick={onWeaponTalentPickerClicked(2)}
        />
        <ArmourPicker
            type="head"
            selected={data.build.head}
            onArmourPieceClick={onArmourPieceClickerClicked}
            onCellClick={onArmourCellPickerClicked}
        />
        <ArmourPicker
            type="torso"
            selected={data.build.torso}
            onArmourPieceClick={onArmourPieceClickerClicked}
            onCellClick={onArmourCellPickerClicked}
        />
        <ArmourPicker
            type="arms"
            selected={data.build.arms}
            onArmourPieceClick={onArmourPieceClickerClicked}
            onCellClick={onArmourCellPickerClicked}
        />
        <ArmourPicker
            type="legs"
            selected={data.build.legs}
            onArmourPieceClick={onArmourPieceClickerClicked}
            onCellClick={onArmourCellPickerClicked}
        />
        <LanternCorePicker
            selected={data.build.lanternCore}
            onClick={onLanternCorePickerClicked}
        />
    </div>
    <div class="w-full sm:w-1/3 flex flex-col gap-2 sm:px-2">
        <BuildStats build={data.build} />

        <PerkList build={data.build} />

        {#if isCopyButtonVisible()}
            <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
            <button class="btn btn-primary btn-outline" onclick={gotoFinderPageUsingCurrentPerks}>
                <BuildFinderIcon />
                {$t("page-build-copy-perks")}
            </button>
        {/if}
    </div>
</div>

{#if dialog.open === "weapon"}
    <PickerModal
        items={Object.values(phalanxData.weapons)}
        filters={[
            dialog.filters.weaponType ? filterWeaponType(dialog.filters.weaponType as WeaponType) : null,
            dialog.filters.element ? filterElementType(dialog.filters.element as Element) : null
        ]}
        filterData={dialog.filters}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
        onFilterDataUpdated={onFilterUpdated}
        initialLevel={dialog.initialLevel}
        maxLevel={weaponMaxLevel}
    >
        {#snippet listItem(item, itemData, onclick)}
            <div class="flex flex-col w-full">
                <button class={"flex flex-col sm:flex-row card-btn grow " + elementClass(item)} {onclick}>
                    <LazyImage class={`${itemIconSize} ml-2`} src={(item as Weapon).icon ?? `/icons/${(item as Weapon).type}.png`} alt={translatableString(item.name)} />
                    <div class="grow">
                        {translatableString(item.name)}
                        <Level level={itemData.level ?? weaponMaxLevel} />
                    </div>
                    <WeaponPower level={itemData.level ?? weaponMaxLevel} element={(item as Armour).element} />
                </button>
            </div>
        {/snippet}
        {#snippet itemFilters(filterData: FilterData, updateFilter?: (filterData: FilterData) => void)}
            <WeaponTypeFilter {filterData} {updateFilter} />
            <ElementFilter {filterData} {updateFilter} />
        {/snippet}
    </PickerModal>
{:else if dialog.open === "weapon_talent"}
    <TalentModal
        weapon={data.build[`weapon${dialog.filters.picker as 1|2}`]}
        onSelected={onTalentSelected}
        onClose={onDialogClosed}
    />
{:else if dialog.open === "armour"}
    <PickerModal
        items={Object.values(phalanxData.armours)}
        filters={[
            filterArmourType(dialog.filters.type as ArmourType),
            dialog.filters.perkType ? filterArmourByPerk(dialog.filters.perkType as number) : null,
            dialog.filters.element ? filterElementType(dialog.filters.element as Element) : null,
        ]}
        filterData={dialog.filters}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
        onFilterDataUpdated={onFilterUpdated}
        initialLevel={dialog.initialLevel}
        maxLevel={armourMaxLevel}
    >
        {#snippet listItem(item, itemData, onclick)}
            <div class="flex flex-col w-full">
                <button class={"flex flex-col sm:flex-row card-btn grow " + elementClass(item)} {onclick}>
                    <LazyImage class={`${itemIconSize} ml-2`} src={(item as Armour).icon ?? `/icons/${(item as Armour).type}.png`} alt={translatableString(item.name)} />
                    <div class="grow">
                        {translatableString(item.name)}
                        <Level level={itemData.level ?? armourMaxLevel} />
                    </div>
                    <ArmourResistance level={itemData.level ?? armourMaxLevel} element={(item as Armour).element} />
                </button>
                <ArmourPerks selected={{id: item.id, level: armourMaxLevel, cells: data.build[(item as Armour).type].cells}} />
            </div>
        {/snippet}
        {#snippet itemFilters(filterData: FilterData, updateFilter?: (filterData: FilterData) => void)}
            <ArmourPerkFilter {filterData} {updateFilter} />
            <ElementFilter {filterData} {updateFilter} />
        {/snippet}
    </PickerModal>
{:else if dialog.open === "lantern_core"}
    <PickerModal
        items={Object.values(phalanxData.lantern_cores)}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
    >
        {#snippet listItem(item, _itemData, onclick)}
            <div class="flex flex-col w-full">
                <button class={"card-btn grow"} {onclick}>
                    <LazyImage class={`${itemIconSize} ml-2`} src={(item as LanternCore).icon ?? `/icons/lantern.png`} alt={translatableString(item.name)} />
                    <div class="grow">
                        {translatableString(item.name)}
                    </div>
                </button>
                <div class="flex flex-col gap-2 mt-2">
                    <LanternCoreStats selected={{id: item.id}} />
                </div>
            </div>
        {/snippet}
    </PickerModal>
{:else if dialog.open === "cells"}
    <PickerModal
        items={Object.values(phalanxData.perks)}
        filters={[
            dialog.filters.perkType ? filterPerkByPerkType(dialog.filters.perkType as PerkType) : null
        ]}
        filterData={dialog.filters}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
        onFilterDataUpdated={onFilterUpdated}
    >
        {#snippet listItem(item, _itemData, onclick)}
            <div class="flex flex-col w-full">
                <button class={"card-btn grow"} {onclick}>
                    <LazyImage class={`${itemIconSize} ml-2 light:invert`} src={`/icons/${(item as Perk).type}.png`} alt={translatableString(item.name)} />
                    <div class="grow">
                        {translatableString(item.name)}
                    </div>
                </button>

                <div class="card bg-base-200/50 mt-2">
                    <div class="card-body">
                        <ValuesText class="my-4" text={(item as Perk).effect} values={(item as Perk).values} classOverwrite={{p: ""}} />
                    </div>
                </div>
            </div>
        {/snippet}

        {#snippet itemFilters(filterData: FilterData, updateFilter?: (filterData: FilterData) => void)}
            <CellPerkTypeFilter {filterData} {updateFilter} />
        {/snippet}
    </PickerModal>
{/if}
