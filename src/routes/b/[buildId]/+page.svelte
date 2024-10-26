<script lang="ts">
import { goto } from "$app/navigation";
import { empty, serialize } from "$lib/build/Build.js";
import ArmourPicker from "$lib/components/ArmourPicker.svelte";
import WeaponPicker from "$lib/components/WeaponPicker.svelte";
import type { ArmourType } from "$lib/data/phalanx-types.js";

const { data } = $props();

const updateBuild = () => {
    const buildId = serialize(data.build).unwrapOr(empty());
    console.log(buildId, data.build);
    goto(`/b/${buildId}`);
};

const onWeaponPickerClicked = (picker: 1 | 2) => () => {
    data.build[`weapon${picker}`].id = data.build[`weapon${picker}`].id === 0 ? 1 : 0;
    updateBuild();
};

const onWeaponTalentPickerClicked = (picker: 1 | 2) => () => {
    data.build[`weapon${picker}`].level += 1;
    updateBuild();
};

const onArmourPieceClickerClicked = (type: ArmourType) => {
    console.log("type clicked", type);
    data.build[type].id =
        Object.values(data.armours).find(
            (a) => a.type === type && a.element !== data.armours[data.build[type].id]?.element,
        )?.id ?? 0;
    updateBuild();
};

const onArmourCellPickerClicked = (type: ArmourType, index: number, cellId: number) => {
    console.log("cell clicker");
    updateBuild();
};
</script>

<div class="flex flex-row">
    <div class="flex flex-col gap-2 w-2/3">
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
    </div>
    <div class="w-1/3 p-4">
        Perk list could be here
    </div>
</div>
