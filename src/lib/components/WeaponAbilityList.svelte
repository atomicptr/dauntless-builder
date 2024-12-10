<script lang="ts">
import { page } from "$app/stores";
import type { BuildWeapon } from "$lib/build/Build";
import type { TranslatableString, ValuesType, Weapon, WeaponAbility } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import ValuesText from "./ValuesText.svelte";
import { configViewWeaponAbilities } from "$lib/state.svelte";

interface Props {
    selected: BuildWeapon;
}

const { selected }: Props = $props();
const weaponData = $derived(selected.id !== 0 ? $page.data.weapons[selected.id] : null) as Weapon | null;

const toggleOpen = () => {
    configViewWeaponAbilities.set(!$configViewWeaponAbilities);
};
</script>

{#snippet weaponAbility(ability: WeaponAbility)}
    <div>
        <div class="font-bold">
            {translatableString(ability.name)}
        </div>
        <ValuesText text={ability.description} values={ability.values} />
    </div>
{/snippet}

{#if weaponData}
    {#if weaponData.special || weaponData.passive || weaponData.active}
        <div class="flex flex-row justify-between text-xl ml-2">
            <div>Abilities</div>
            <button class="btn btn-xs btn-ghost" onclick={toggleOpen}>
                {#if $configViewWeaponAbilities}-{:else}+{/if}
            </button>
        </div>
    {/if}

    {#if $configViewWeaponAbilities}
        <div class="ml-4 mt-2">
            {#if weaponData.special}
                {@render weaponAbility(weaponData.special)}
            {/if}
            {#if weaponData.passive}
                {@render weaponAbility(weaponData.passive)}
            {/if}
            {#if weaponData.active}
                {@render weaponAbility(weaponData.active)}
            {/if}
        </div>
    {/if}
{/if}
