<script lang="ts">
import { page } from "$app/stores";
import { armourTypeValues, type Armour } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "./LazyImage.svelte";
import Search from "./Search.svelte";

interface Props {
    whitelist?: number[];
    inverted?: boolean;
}

let filtersSearch = $state("");
let filtersOpen = $state(false);

let { whitelist = $bindable(), inverted = $bindable() }: Props = $props();

const armours = Object.values<Armour>($page.data.armours);
const armoursByType = Object.groupBy(armours, (item) => item.type);

const isWhitelisted = (id: number) => (whitelist ?? []).indexOf(id) > -1;
const toggleWhitelist = (id: number) => {
    if (isWhitelisted(id)) {
        whitelist = whitelist?.filter((item) => item !== id);
        return;
    }
    whitelist?.push(id);
};
const clearWhitelist = () => {
    whitelist = [];
};
const insertAll = () => {
    whitelist = armours.map((item) => item.id);
};
</script>

<div class="flex flex-row justify-end mb-4">
    <button class="btn max-w-96" onclick={() => filtersOpen = !filtersOpen}>
        Item Filters ({whitelist?.length ?? 0} active)
    </button>
</div>

{#if filtersOpen}
    <div class="flex flex-col gap-2 mb-8">
        <Search bind:value={filtersSearch} />

        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">Invert filter</span>
                <input type="checkbox" bind:checked={inverted} class="checkbox" />
            </label>
        </div>

        <button class="btn" onclick={insertAll}>
            Select all
        </button>

        <button class="btn" onclick={clearWhitelist}>
            Select none
        </button>
    </div>

    <div class="text-2xl">
        {#if inverted}
            Don't use
        {:else}
            Use only
        {/if}
    </div>

    <div class="flex flex-col lg:flex-row gap-2">
        {#each armourTypeValues as armourType}
            <div class="flex flex-col gap-2 grow">
                <div class="text-xl">{armourType.slice(0, 1).toUpperCase() + armourType.slice(1)}</div>
                {#each armoursByType[armourType] ?? [] as armour}
                    <div class="form-control" class:hidden={translatableString(armour.name).toLowerCase().indexOf(filtersSearch.toLowerCase()) === -1}>
                        <label class="label cursor-pointer">
                            <input type="checkbox" checked={isWhitelisted(armour.id)} class="checkbox" onchange={() => toggleWhitelist(armour.id)} />
                            <div class="flex flex-row gap-2 grow ml-4">
                                <LazyImage class="w-6 h-6" src={armour.icon ?? `/icons/${armourType}.png`} />
                                <div class="label-text">{translatableString(armour.name)}</div>
                            </div>
                        </label>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
{/if}
