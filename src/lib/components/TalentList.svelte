<script lang="ts">
import { page } from "$app/stores";
import type { BuildWeapon } from "$lib/build/Build";
import { t } from "$lib/i18n.svelte";
import { configViewWeaponTalents } from "$lib/state.svelte";
import { translatableString } from "$lib/utils/translatable-string";
import MinusIcon from "./icons/MinusIcon.svelte";
import PlusIcon from "./icons/PlusIcon.svelte";
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
    <div class="card bg-base-200/50 shadow">
        <div class="card-body">
            <div class="card-title flex flex-row justify-between">
                <div>{$t("page-build-talents")}</div>
                <button class="btn btn-xs btn-ghost" onclick={toggleOpen}>
                    {#if $configViewWeaponTalents}
                        <MinusIcon />
                    {:else}
                        <PlusIcon />
                    {/if}
                </button>
            </div>

            {#if $configViewWeaponTalents}
                {#each selected.talents as row, rowIndex}
                    {#if selected.talents[rowIndex].some(v => v)}
                        <ul class="list-disc pl-4">
                            <li class="font-bold">
                                {#if weaponData.talents[rowIndex].name}
                                    {translatableString(weaponData.talents[rowIndex].name)}
                                {:else}
                                    {$t("page-build-talent")} #{rowIndex + 1}
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
            {/if}
        </div>
    </div>
{/if}
