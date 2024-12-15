<script lang="ts">
import { page } from "$app/stores";
import type { BuildWeapon } from "$lib/build/Build";
import type { TranslatableString, ValuesType, Weapon, WeaponAbility } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import ValuesText from "./ValuesText.svelte";
import { configViewWeaponAbilities } from "$lib/state.svelte";
import MinusIcon from "./icons/MinusIcon.svelte";
import PlusIcon from "./icons/PlusIcon.svelte";
import { t } from "$lib/i18n.svelte";

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
    <div class="card bg-base-200/50 shadow">
        <div class="card-body">
            {#if weaponData.special || weaponData.passive || weaponData.active}
                <div class="card-title flex flex-row justify-between">
                    <div>{$t("page-build-abilities")}</div>
                    <button class="btn btn-xs btn-ghost" onclick={toggleOpen}>
                        {#if $configViewWeaponAbilities}
                            <MinusIcon />
                        {:else}
                            <PlusIcon />
                        {/if}
                    </button>
                </div>
            {/if}

            {#if $configViewWeaponAbilities}
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
        </div>
    </div>
{/if}
