<script lang="ts">
import { page } from "$app/stores";
import { armourTypeValues, type Armour, type ArmourType } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import { match } from "ts-pattern";
import LazyImage from "./LazyImage.svelte";
import Search from "./Search.svelte";
import { onMount } from "svelte";

interface Props {
    heads: number[];
    torsos: number[];
    arms: number[];
    legs: number[];
}

let { heads = $bindable(), torsos = $bindable(), arms = $bindable(), legs = $bindable() }: Props = $props();

const filtersCount = $derived(heads.length + torsos.length + arms.length + legs.length);

let filtersSearch = $state("");
let filtersOpen = $state(false);

const armours = Object.values<Armour>($page.data.armours);
const armoursByType = Object.groupBy(armours, (item) => item.type);

const collectionByType = (type: ArmourType) =>
    match(type)
        .with("head", () => heads)
        .with("torso", () => torsos)
        .with("arms", () => arms)
        .with("legs", () => legs)
        .run();

const isWhitelisted = (type: ArmourType, id: number) => collectionByType(type).indexOf(id) > -1;

const toggleWhitelisted = (type: ArmourType, id: number) => {
    switch (type) {
        case "head":
            if (isWhitelisted(type, id)) {
                heads = heads.filter((item) => item !== id);
            } else {
                heads.push(id);
            }
            break;
        case "torso":
            if (isWhitelisted(type, id)) {
                torsos = torsos.filter((item) => item !== id);
            } else {
                torsos.push(id);
            }
            break;
        case "arms":
            if (isWhitelisted(type, id)) {
                arms = arms.filter((item) => item !== id);
            } else {
                arms.push(id);
            }
            break;
        case "legs":
            if (isWhitelisted(type, id)) {
                legs = legs.filter((item) => item !== id);
            } else {
                legs.push(id);
            }
            break;
    }
};

onMount(() => {
    if (filtersCount > 0) {
        filtersOpen = true;
    }
});
</script>

<div class="flex flex-row justify-end mb-4">
    <button class="btn max-w-96" onclick={() => filtersOpen = !filtersOpen}>
        Item Filters
        {#if filtersCount > 0}
            ({filtersCount} active)
        {/if}
    </button>
</div>

{#if filtersOpen}
    <div class="text-2xl mb-4">
        Filter
    </div>

    <div class="flex flex-col gap-2 mb-4">
        <Search bind:value={filtersSearch} />
    </div>

    <div class="flex flex-col lg:flex-row gap-2">
        {#each armourTypeValues as armourType}
            <div class="flex flex-col gap-2 grow">
                <div class="text-xl">{armourType.slice(0, 1).toUpperCase() + armourType.slice(1)}</div>
                {#each armoursByType[armourType] ?? [] as armour}
                    <div class="form-control" class:hidden={translatableString(armour.name).toLowerCase().indexOf(filtersSearch.toLowerCase()) === -1}>
                        <label class="label cursor-pointer">
                            <input type="checkbox" checked={isWhitelisted(armourType, armour.id)} class="checkbox" onchange={() => toggleWhitelisted(armourType, armour.id)} />
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
