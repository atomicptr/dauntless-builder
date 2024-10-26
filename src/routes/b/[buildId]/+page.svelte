<script lang="ts">
import { goto } from "$app/navigation";
import { empty, serialize } from "$lib/build/Build.js";
import WeaponPicker from "$lib/components/WeaponPicker.svelte";

const { data } = $props();

const updateBuild = () => {
    const buildId = serialize(data.build).unwrapOr(empty());
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
</script>

<div class="flex flex-col gap-2">
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
</div>
