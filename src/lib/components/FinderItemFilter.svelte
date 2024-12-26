<script lang="ts">
import { armourTypeValues, type Armour, type ArmourType } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import { match } from "ts-pattern";
import LazyImage from "./LazyImage.svelte";
import Search from "./Search.svelte";
import { onMount } from "svelte";
import CloseIcon from "./icons/CloseIcon.svelte";
import CheckCircle from "./icons/CheckCircle.svelte";
import { filterItemCompare } from "$lib/build/filters";
import type { WhitelistedItems } from "$lib/finder/finder.svelte";
import { searchInTranslatableStrings } from "$lib/utils/search";
import { t } from "$lib/i18n.svelte";
import { phalanxArmours } from "$lib/data/phalanx-armours";

interface Props {
    heads: number[];
    torsos: number[];
    arms: number[];
    legs: number[];
    onChange: (items: WhitelistedItems) => void;
}

let { heads, torsos, arms, legs, onChange }: Props = $props();

const filtersCount = $derived(heads.length + torsos.length + arms.length + legs.length);

let filtersSearch = $state("");
let filtersOpen = $state(false);

const armours = Object.values<Armour>(phalanxArmours);
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
            onChange({
                heads: isWhitelisted(type, id) ? heads.filter((item) => item !== id) : [...heads, id],
                torsos,
                arms,
                legs,
            });
            break;
        case "torso":
            onChange({
                heads,
                torsos: isWhitelisted(type, id) ? torsos.filter((item) => item !== id) : [...torsos, id],
                arms,
                legs,
            });
            break;
        case "arms":
            onChange({
                heads,
                torsos,
                arms: isWhitelisted(type, id) ? arms.filter((item) => item !== id) : [...arms, id],
                legs,
            });
            break;
        case "legs":
            onChange({
                heads,
                torsos,
                arms,
                legs: isWhitelisted(type, id) ? legs.filter((item) => item !== id) : [...legs, id],
            });
            break;
    }
};

const selectAllByType = (armourType: ArmourType) => {
    switch (armourType) {
        case "head":
            onChange({
                heads: armours.filter((item) => item.type === armourType).map((item) => item.id),
                torsos,
                arms,
                legs,
            });
            break;
        case "torso":
            onChange({
                heads,
                torsos: armours.filter((item) => item.type === armourType).map((item) => item.id),
                arms,
                legs,
            });
            break;
        case "arms":
            onChange({
                heads,
                torsos,
                arms: armours.filter((item) => item.type === armourType).map((item) => item.id),
                legs,
            });
            break;
        case "legs":
            onChange({
                heads,
                torsos,
                arms,
                legs: armours.filter((item) => item.type === armourType).map((item) => item.id),
            });
            break;
    }
};

const unselectAllByType = (armourType: ArmourType) => {
    switch (armourType) {
        case "head":
            onChange({ heads: [], torsos, arms, legs });
            break;
        case "torso":
            onChange({ heads, torsos: [], arms, legs });
            break;
        case "arms":
            onChange({ heads, torsos, arms: [], legs });
            break;
        case "legs":
            onChange({ heads, torsos, arms, legs: [] });
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
        {$t("page-finder-item-filters")}
        {#if filtersCount > 0}
            {$t("page-finder-item-filters-active", {count: filtersCount.toString()})}
        {/if}
    </button>
</div>

{#if filtersOpen}
    <div class="text-2xl mb-4">
        {$t("page-finder-filter")}
    </div>

    <div class="flex flex-col gap-2 mb-4">
        <Search bind:value={filtersSearch} />
    </div>

    <div class="flex flex-col lg:flex-row gap-2">
        {#each armourTypeValues as armourType}
            <div class="flex flex-col gap-2 grow">
                <div class="flex flex-row gap-2 items-center">
                    <div class="text-xl">{$t(`term-${armourType}`)}</div>
                    <button class="btn btn-ghost" title={$t("page-finder-select-all")} onclick={() => selectAllByType(armourType)}>
                        <CheckCircle />
                    </button>
                    <button class="btn btn-ghost" title={$t("page-finder-unselect-all")} class:hidden={collectionByType(armourType).length === 0} onclick={() => unselectAllByType(armourType)}>
                        <CloseIcon />
                    </button>
                </div>

                {#each armoursByType[armourType]?.toSorted(filterItemCompare) ?? [] as armour}
                    <div class="form-control" class:hidden={!searchInTranslatableStrings(filtersSearch, [armour.name])}>
                        <label class="label cursor-pointer h-12">
                            <input type="checkbox" checked={isWhitelisted(armourType, armour.id)} class="checkbox" onchange={() => toggleWhitelisted(armourType, armour.id)} />
                            <div class="flex flex-row gap-2 grow ml-4 items-center">
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
