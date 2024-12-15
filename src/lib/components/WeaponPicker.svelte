<script lang="ts">
import { page } from "$app/stores";
import type { BuildWeapon } from "$lib/build/Build";
import { itemIconSize } from "$lib/constants";
import { t } from "$lib/i18n.svelte";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "./LazyImage.svelte";
import Level from "./Level.svelte";
import TalentList from "./TalentList.svelte";
import TalentPicker from "./TalentPicker.svelte";
import WeaponAbilityList from "./WeaponAbilityList.svelte";
import WeaponPower from "./WeaponPower.svelte";

interface WeaponPickerProps {
    selected: BuildWeapon;
    onWeaponClick?: () => void;
    onTalentClick?: () => void;
}

const { selected, onWeaponClick, onTalentClick }: WeaponPickerProps = $props();
const weapon = $derived(selected.id !== 0 ? $page.data.weapons[selected.id] : null);
const icon = $derived(weapon?.icon ?? "/icon.png");
const disabled = $derived(onWeaponClick === undefined);
</script>

{#if weapon}
    <div class="flex flex-col sm:flex-row gap-2 min-h-20">
        <button class="card-btn grow element-border element-border-{weapon.element}" onclick={onWeaponClick} {disabled}>
            <LazyImage class={`${itemIconSize} ml-2`} src={icon} alt={translatableString(weapon.name)} />
            <div class="grow">
                {translatableString(weapon.name)}
                <Level level={selected.level} />
            </div>
            <WeaponPower level={selected.level} element={weapon.element} />
        </button>
        <TalentPicker talents={selected.talents} onClick={onTalentClick} />
    </div>

    <div class="flex flex-col gap-2">
        <WeaponAbilityList {selected} />
        <TalentList {selected} />
    </div>
{:else if !disabled}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={onWeaponClick}>
            <LazyImage class={`${itemIconSize} ml-2 light:invert`} src="/icons/weapons.png" alt={ $t("term-weapon") } />
            <div class="grow">
                { $t("page-build-select-weapon") }
            </div>
        </button>
    </div>
{/if}
