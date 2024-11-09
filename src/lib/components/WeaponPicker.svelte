<script lang="ts">
import { page } from "$app/stores";
import type { BuildWeapon } from "$lib/build/Build";
import { itemIconSize } from "$lib/constants";
import { translatableString } from "$lib/utils/translatable-string";
import Level from "./Level.svelte";
import TalentList from "./TalentList.svelte";
import TalentPicker from "./TalentPicker.svelte";
import WeaponPower from "./WeaponPower.svelte";

interface WeaponPickerProps {
    selected: BuildWeapon;
    onWeaponClick: () => void;
    onTalentClick: () => void;
}

const { selected, onWeaponClick, onTalentClick }: WeaponPickerProps = $props();
const weapon = $derived(selected.id !== 0 ? $page.data.weapons[selected.id] : null);
const icon = $derived(weapon.icon ?? "/icon.png");
</script>

{#if weapon}
    <div class="flex flex-col sm:flex-row gap-2 min-h-20">
        <button class="card-btn grow element-border element-border-{weapon.element}" onclick={onWeaponClick}>
            <div class={`${itemIconSize} ml-2`}>
                <img src="{icon}" alt="{translatableString(weapon.name)}" />
            </div>
            <div class="grow">
                {translatableString(weapon.name)}
                <Level level={selected.level} />
            </div>
            <WeaponPower level={selected.level} element={weapon.element} />
        </button>
        <TalentPicker talents={selected.talents} onClick={onTalentClick} />
    </div>

    <TalentList {selected} />
{:else}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={onWeaponClick}>
            <div class={`${itemIconSize} ml-2`}>
                <img src="/icons/weapons.png" alt="Weapon" />
            </div>
            <div class="grow">
                Select a weapon
            </div>
        </button>
    </div>
{/if}
