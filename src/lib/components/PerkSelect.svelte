<script lang="ts">
import { page } from "$app/stores";
import type { Perk } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import CloseIcon from "./icons/CloseIcon.svelte";
import PerkTooltip from "./PerkTooltip.svelte";
import Search from "./Search.svelte";
import ValuesText from "./ValuesText.svelte";

interface Props {
    perks: number[];
    disabledPerks?: number[];
    onSelect?: (perkId: number) => void;
    onClear?: () => void;
}

let search = $state("");

const { perks, disabledPerks, onSelect, onClear }: Props = $props();
const perkGroups = Object.groupBy(Object.values($page.data.perks) as Perk[], (perk) => perk.type);

const getPerksByCategoryName = (category: string) => perkGroups[category as keyof typeof perkGroups] as Perk[];

const inSearch = (perk: Perk) => translatableString(perk.name).toLowerCase().indexOf(search.toLowerCase()) >= 0;
const sort = (a: Perk, b: Perk) => translatableString(a.name).localeCompare(translatableString(b.name));
</script>

<div class="flex flex-col w-full gap-2">
    <div class="flex flex-row justify-between items-center">
        <h2 class="text-2xl">
            Perks
        </h2>
        {#if onClear && perks.length > 0}
            <button class="btn btn-ghost" onclick={onClear}>
                <CloseIcon />
                Clear All
            </button>
        {/if}
    </div>
    
    <Search class="my-2" bind:value={search} />

    <div class="flex flex-col sm:flex-row gap-2 w-full">
        {#each Object.keys(perkGroups) as perkGroupName}
            <div class="flex flex-col gap-2 grow basis-0">
                {#if getPerksByCategoryName(perkGroupName).filter(inSearch).sort(sort).length > 0}
                    <div class="flex flex-col items-center gap-2">
                        <img class="w-8 h-8 light:invert" src={`/icons/${perkGroupName}.png`} alt={perkGroupName} />
                        <div>{perkGroupName[0].toUpperCase() + perkGroupName.slice(1)}</div>
                    </div>
                {/if}

                <div class="flex flex-col gap-1">
                    {#each getPerksByCategoryName(perkGroupName).filter(inSearch).sort(sort) as perk}
                        <PerkTooltip perkId={perk.id} class="flex flex-col">
                            <button
                                class="card-btn disabled:hidden sm:disabled:flex flex-col w-full" 
                                class:btn-primary={perks.indexOf(perk.id) > -1}
                                onclick={onSelect ? () => onSelect(perk.id) : undefined}
                                disabled={(disabledPerks ?? []).indexOf(perk.id) > -1}
                            >
                                {translatableString(perk.name)} ({perk.threshold})

                                <div
                                    class="text-xs text-base-content/75 mt-2 block sm:hidden"
                                    class:text-primary-content={perks.indexOf(perk.id) > -1}
                                >
                                    <ValuesText text={perk.effect} values={perk.values} />
                                </div>
                            </button>
                        </PerkTooltip>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>
