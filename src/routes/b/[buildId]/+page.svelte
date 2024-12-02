<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { empty, serialize } from "$lib/build/Build.js";
import { filterArmourType, type FilterItem } from "$lib/build/filters";
import { talentEmpty, talentSet } from "$lib/build/talents.js";
import ArmourPerks from "$lib/components/ArmourPerks.svelte";
import ArmourPicker from "$lib/components/ArmourPicker.svelte";
import ArmourResistance from "$lib/components/ArmourResistance.svelte";
import FinderItemFilter from "$lib/components/FinderItemFilter.svelte";
import BuildFinderIcon from "$lib/components/icons/BuildFinderIcon.svelte";
import LanternCorePicker from "$lib/components/LanternCorePicker.svelte";
import LanternCoreStats from "$lib/components/LanternCoreStats.svelte";
import LazyImage from "$lib/components/LazyImage.svelte";
import Level from "$lib/components/Level.svelte";
import PerkList from "$lib/components/PerkList.svelte";
import PickerModal from "$lib/components/PickerModal.svelte";
import TalentModal from "$lib/components/TalentModal.svelte";
import ValuesText from "$lib/components/ValuesText.svelte";
import WeaponPicker from "$lib/components/WeaponPicker.svelte";
import WeaponPower from "$lib/components/WeaponPower.svelte";
import { itemIconSize } from "$lib/constants";
import { armourStatsForLevel, getCellPerks, mergePerksArray, sortPerkSetByName } from "$lib/data/levels";
import type { Armour, ArmourType, LanternCore, Perk, Weapon } from "$lib/data/phalanx-types.js";
import { armourMaxLevel, weaponMaxLevel } from "$lib/data/static-data.js";
import { finderDefaultData, finderPageDataSerialize } from "$lib/finder/initial";
import { translatableString } from "$lib/utils/translatable-string.js";

const { data } = $props();

interface DialogProps {
    open: "weapon" | "weapon_talent" | "armour" | "lantern_core" | "cells" | null;
    filters: {
        [name: string]: string | number;
    };
}

let dialog: DialogProps = $state({ open: null, filters: {} });

const updateBuild = () => {
    const buildId = serialize(data.build).unwrapOr(empty());
    console.log(buildId, data.build);
    goto(`/b/${buildId}`);
};

const onWeaponPickerClicked = (picker: 1 | 2) => () => {
    dialog = {
        open: "weapon",
        filters: { picker },
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
        filters: { type },
    };
};

const onArmourCellPickerClicked = (type: ArmourType, index: number) => {
    dialog = {
        open: "cells",
        filters: { type, index },
    };
};

const onLanternCorePickerClicked = () => {
    dialog = {
        open: "lantern_core",
        filters: {},
    };
};

const onItemSelected = (id: number) => {
    switch (dialog.open) {
        case "weapon":
            data.build[`weapon${dialog.filters.picker as 1 | 2}`] = {
                // TODO: if weapon is already in other slot move
                id,
                level: weaponMaxLevel, // TODO: add level picker
                talents: talentEmpty(), // TODO: add talents
            };
            break;
        case "armour":
            data.build[dialog.filters.type as ArmourType] = {
                id,
                level: armourMaxLevel, // TODO: add level picker
                cells: Array(data.armours[id].cell_slots).fill(0), // TODO: keep cells selected previously
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

const gotoFinderPageUsingCurrentPerks = () => {
    const finderData = finderDefaultData();

    const perks = mergePerksArray([
        $page.data.armours[data.build.head.id]
            ? (armourStatsForLevel($page.data.armours[data.build.head.id], data.build.head.level) ?? {})
            : {},
        getCellPerks(data.build.head.cells),
        $page.data.armours[data.build.torso.id]
            ? (armourStatsForLevel($page.data.armours[data.build.torso.id], data.build.torso.level) ?? {})
            : {},
        getCellPerks(data.build.torso.cells),
        $page.data.armours[data.build.arms.id]
            ? (armourStatsForLevel($page.data.armours[data.build.arms.id], data.build.arms.level) ?? {})
            : {},
        getCellPerks(data.build.arms.cells),
        $page.data.armours[data.build.legs.id]
            ? (armourStatsForLevel($page.data.armours[data.build.legs.id], data.build.legs.level) ?? {})
            : {},
        getCellPerks(data.build.legs.cells),
    ]);

    finderData.perks = Object.entries(perks)
        .filter(([perkId, amount]) => $page.data.perks[perkId].threshold <= amount)
        .map(([perkId, amount]) => Number(perkId));

    goto(`/b/finder/${finderPageDataSerialize(finderData)}`);
};
</script>

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
    <div class="w-1/3 p-4">
        <PerkList build={data.build} />

        <button class="btn btn-primary btn-outline mt-4" onclick={gotoFinderPageUsingCurrentPerks}>
            <BuildFinderIcon />
            Copy perks to finder
        </button>
    </div>
</div>

{#if dialog.open === "weapon"}
    <PickerModal
        items={Object.values(data.weapons)}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
    >
        {#snippet listItem(item, onclick)}
            <div class="flex flex-col w-full">
                <button class={"card-btn grow " + elementClass(item)} {onclick}>
                    <LazyImage class={`${itemIconSize} ml-2`} src={(item as Weapon).icon ?? `/icons/${(item as Weapon).type}.png`} alt={translatableString(item.name)} />
                    <div class="grow">
                        {translatableString(item.name)}
                        <Level level={weaponMaxLevel} />
                    </div>
                    <WeaponPower level={weaponMaxLevel} element={(item as Armour).element} />
                </button>
            </div>
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
        items={Object.values(data.armours)}
        filters={[
            filterArmourType(dialog.filters.type as ArmourType),
        ]}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
    >
        {#snippet listItem(item, onclick)}
            <div class="flex flex-col w-full">
                <button class={"card-btn grow " + elementClass(item)} {onclick}>
                    <LazyImage class={`${itemIconSize} ml-2`} src={(item as Armour).icon ?? `/icons/${(item as Armour).type}.png`} alt={translatableString(item.name)} />
                    <div class="grow">
                        {translatableString(item.name)}
                        <Level level={armourMaxLevel} />
                    </div>
                    <ArmourResistance level={armourMaxLevel} element={(item as Armour).element} />
                </button>
                <ArmourPerks selected={{id: item.id, level: armourMaxLevel, cells: data.build[(item as Armour).type].cells}} />
            </div>
        {/snippet}
    </PickerModal>
{:else if dialog.open === "lantern_core"}
    <PickerModal
        items={Object.values(data.lantern_cores)}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
    >
        {#snippet listItem(item, onclick)}
            <div class="flex flex-col w-full">
                <button class={"card-btn grow"} {onclick}>
                    <LazyImage class={`${itemIconSize} ml-2`} src={(item as LanternCore).icon ?? `/icons/lantern.png`} alt={translatableString(item.name)} />
                    <div class="grow">
                        {translatableString(item.name)}
                    </div>
                </button>
                <LanternCoreStats selected={{id: item.id}} />
            </div>
        {/snippet}
    </PickerModal>
{:else if dialog.open === "cells"}
    <PickerModal
        items={Object.values(data.perks)}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
    >
        {#snippet listItem(item, onclick)}
            <div class="flex flex-col w-full">
                <button class={"card-btn grow"} {onclick}>
                    <LazyImage class={`${itemIconSize} ml-2`} src={`/icons/${(item as Perk).type}.png`} alt={translatableString(item.name)} />
                    <div class="grow">
                        {translatableString(item.name)}
                    </div>
                </button>

                <ValuesText class="my-4" text={(item as Perk).effect} values={(item as Perk).values} classOverwrite={{p: ""}} />
            </div>
        {/snippet}
    </PickerModal>
{/if}
