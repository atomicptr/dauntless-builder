<script lang="ts">
import { page } from "$app/stores";
import type { BuildWeapon } from "$lib/build/Build";
import type { TranslatableString, ValuesType, Weapon, WeaponAbility } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import ValuesText from "./ValuesText.svelte";

interface Props {
    selected: BuildWeapon;
}

const { selected }: Props = $props();
const weaponData = $derived(selected.id !== 0 ? $page.data.weapons[selected.id] : null) as Weapon | null;
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
        <div class="text-xl mt-4">
            Abilities
        </div>
    {/if}

    {#if weaponData.special}
        {@render weaponAbility(weaponData.special)}
    {/if}
    {#if weaponData.passive}
        {@render weaponAbility(weaponData.passive)}
    {/if}
    {#if weaponData.active}
        {@render weaponAbility(weaponData.active)}
    {/if}
{/if}
