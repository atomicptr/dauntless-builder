<script lang="ts">
import { page } from "$app/stores";
import type { BuildWeapon } from "$lib/build/Build";
import { configViewWeaponTalents } from "$lib/state.svelte";
import { translatableString } from "$lib/utils/translatable-string";
import TalentOptionText from "./TalentOptionText.svelte";

interface Props {
    selected: BuildWeapon;
}

const { selected }: Props = $props();
const weaponData = $derived(selected.id !== 0 ? $page.data.weapons[selected.id] : null);
const available = $derived(selected.talents.some((options) => options.some((v) => v)));

const toggleOpen = () => {
    configViewWeaponTalents.set(!$configViewWeaponTalents);
};
</script>

{#if available}
    <div>
        <div class="flex flex-row justify-between text-xl ml-2">
            <div>Talents</div>
            <button class="btn btn-xs btn-ghost" onclick={toggleOpen}>
                {#if $configViewWeaponTalents}-{:else}+{/if}
            </button>
        </div>

        {#if $configViewWeaponTalents}
            <div class="ml-8 mt-2">
                {#each selected.talents as row, rowIndex}
                    {#if selected.talents[rowIndex].some(v => v)}
                        <ul class="list-disc pl-4">
                            <li class="font-bold">
                                {#if weaponData.talents[rowIndex].name}
                                    {translatableString(weaponData.talents[rowIndex].name)}
                                {:else}
                                    Talent #{rowIndex + 1}
                                {/if}
                            </li>

                            <ul class="list-disc pl-4">
                                {#each row as col, colIndex}
                                    {#if col}
                                        <li>
                                            <TalentOptionText option={weaponData.talents[rowIndex].options[colIndex]} compact />
                                        </li>
                                    {/if}
                                {/each}
                            </ul>
                        </ul>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
{/if}
