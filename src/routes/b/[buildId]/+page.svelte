<script lang="ts">
import { goto } from "$app/navigation";
import { empty, serialize } from "$lib/build/Build.js";
import { filterArmourType, filterElementType, filterName, type GenericItem } from "$lib/build/filters";
import { talentEmpty, talentSerialize, talentSet } from "$lib/build/talents.js";
import ArmourPicker from "$lib/components/ArmourPicker.svelte";
import LanternCorePicker from "$lib/components/LanternCorePicker.svelte";
import PerkList from "$lib/components/PerkList.svelte";
import PickerModal from "$lib/components/PickerModal.svelte";
import TalentModal from "$lib/components/TalentModal.svelte";
import WeaponPicker from "$lib/components/WeaponPicker.svelte";
import type { Armour, ArmourType } from "$lib/data/phalanx-types.js";
import { armourMaxLevel, weaponMaxLevel } from "$lib/data/static-data.js";

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
    </div>
</div>

{#if dialog.open === "weapon"}
    <PickerModal
        items={Object.values(data.weapons)}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
    />
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
    />
{:else if dialog.open === "lantern_core"}
    <PickerModal
        items={Object.values(data.lantern_cores)}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
    />
{:else if dialog.open === "cells"}
    <PickerModal
        items={Object.values(data.perks).map(perk => ({
            id: perk.id,
            name: perk.name,
            icon: `/icons/${perk.type}.png`,
        }))}
        onSelected={onItemSelected}
        onClose={onDialogClosed}
    />
{/if}
