<script lang="ts">
import { phalanxPerks } from "$lib/data/phalanx-perks";
import type { Perk } from "$lib/data/phalanx-types";
import { perkIcon } from "$lib/data/static-data";
import { t } from "$lib/i18n.svelte";
import { searchInTranslatableStrings } from "$lib/utils/search";
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
const perkGroups = Object.groupBy(Object.values(phalanxPerks) as Perk[], (perk) => perk.type);

const getPerksByCategoryName = (category: string) => perkGroups[category as keyof typeof perkGroups] as Perk[];

const inSearch = (perk: Perk) => searchInTranslatableStrings(search, [perk.name, perk.effect]);
const sort = (a: Perk, b: Perk) => translatableString(a.name).localeCompare(translatableString(b.name));
const perkTypeSort = (a: string, b: string) => $t(`perk-type-${a}`).localeCompare($t(`perk-type-${b}`));
</script>

<div class="flex flex-col w-full gap-2">
    <div class="flex flex-row justify-between items-center">
        <h2 class="text-2xl">
            {$t("page-build-perks")}
        </h2>
        {#if onClear && perks.length > 0}
            <button class="btn btn-ghost" onclick={onClear}>
                <CloseIcon />
                {$t("page-finder-clear-all")}
            </button>
        {/if}
    </div>
    
    <Search class="my-2" bind:value={search} />

    <div class="flex flex-col sm:flex-row gap-1 w-full">
        {#each Object.keys(perkGroups).sort(perkTypeSort) as perkGroupName}
            <div class="flex flex-col gap-2 grow basis-0">
                {#if getPerksByCategoryName(perkGroupName).filter(inSearch).length > 0}
                    <div class="flex flex-col items-center gap-2">
                        <img class="w-8 h-8 light:invert" src={perkIcon(perkGroupName)} alt={perkGroupName} />
                        <div>{$t(`perk-type-${perkGroupName}`)}</div>
                    </div>
                {/if}

                <div class="flex flex-col sm:gap-1">
                    {#each getPerksByCategoryName(perkGroupName).filter(inSearch).sort(sort) as perk}
                        <PerkTooltip perkId={perk.id} class="flex flex-col">
                            <button
                                class="card-btn disabled:hidden sm:disabled:flex flex-col w-full my-1 sm:my-0" 
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
