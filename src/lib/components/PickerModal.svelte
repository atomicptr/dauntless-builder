<script lang="ts">
import {
    applyAll,
    filterItemCompare,
    filterName,
    type FilterFunc,
    type FilterItem,
    type GenericItem,
} from "$lib/build/filters";
import { itemIconSize } from "$lib/constants";
import { translatableString } from "$lib/utils/translatable-string";
import { onMount, type Snippet } from "svelte";
import LazyImage from "./LazyImage.svelte";
import Search from "./Search.svelte";
import { t } from "$lib/i18n.svelte";

export interface FilterData {
    [item: string]: string | number | null;
}

export interface ListItemData {
    level?: number;
}

interface PickerModalProps {
    items: FilterItem[];
    filters?: (FilterFunc | null)[];
    filterData?: FilterData;
    onSelected?: (id: number, itemData: ListItemData) => void;
    onClose?: () => void;
    onFilterDataUpdated?: (filterData: FilterData) => void;
    initialLevel?: number;
    maxLevel?: number;
    listItem?: Snippet<[FilterItem, ListItemData, (() => void) | undefined]>;
    itemFilters?: Snippet<[FilterData, ((filterData: FilterData) => void) | undefined]>;
}

let search = $state("");
let currentLevel = $state(1);

const {
    items,
    filters,
    filterData,
    onSelected,
    onClose,
    onFilterDataUpdated,
    initialLevel,
    maxLevel,
    listItem,
    itemFilters,
}: PickerModalProps = $props();

const elementClass = (item: FilterItem): string =>
    "element" in item ? `element-border element-border-${item.element}` : "";

const filteredItems = $derived(
    applyAll(items, [...(filters?.filter((fn) => fn !== null) ?? []), filterName(search)]).toSorted(filterItemCompare),
);

onMount(() => {
    if (maxLevel !== undefined) {
        currentLevel = initialLevel ?? maxLevel;
    }
});
</script>

{#snippet listItemGeneric(item: FilterItem, _itemData: ListItemData, onclick?: () => void)}
    <button class={"card-btn grow " + elementClass(item)} {onclick}>
        <LazyImage class={`${itemIconSize} ml-2`} src={(item as GenericItem).icon ?? '/icons/noicon.png'} alt={translatableString(item.name)} />
        <div class="grow">
            {translatableString(item.name)}
        </div>
    </button>
{/snippet}

<dialog class="modal bg-base-300/80" open>
    <div class="modal-box w-5xl max-w-5xl py-0">
        <div class="sticky top-0 left-0 right-0 z-30 pt-2 pb-4 bg-base-100 bg-opacity-90 backdrop-blur">
            <div class="flex flex-row justify-end mb-4">
                <button class="btn btn-sm btn-circle btn-ghost" onclick={onClose ? () => onClose() : undefined}>✕</button>
            </div>

            <div class="flex flex-col gap-2">
                <Search bind:value={search} />
                {#if itemFilters}
                    {@render itemFilters(filterData ?? {},onFilterDataUpdated)}
                {/if}
            </div>
        </div>

        <div class="flex flex-col gap-2 mt-4">
            {#each filteredItems as item}
                {@render (listItem ?? listItemGeneric)(item, {
                    level: currentLevel,
                }, onSelected ? () => onSelected(item.id, { level: currentLevel }) : undefined)}
            {/each}
        </div>

        <div class="sticky bottom-0 left-0 right-0 z-30 py-2 mt-4 bg-base-100 bg-opacity-90 backdrop-blur flex flex-col sm:flex-row gap-2">
            {#if maxLevel !== undefined}
                <div class="flex flex-row gap-2 items-center py-2 sm:py-0 w-full sm:w-[30%]">
                    <div>
                        {$t("term-level")}
                    </div>
                    <input type="range" min="1" max={maxLevel} class="range range-primary" step="1" bind:value={currentLevel} />
                    <div class="">
                        {currentLevel}
                    </div>
                </div>
            {/if}
            
            <div class="grow"></div>

            <div class="flex flex-row gap-2">
                <button class="btn grow" onclick={onSelected ? () => onSelected(0, { level: currentLevel }) : undefined}>
                    {$t("term-unselect")}
                </button>

                <button class="btn grow" onclick={onClose}>
                    {$t("term-cancel")}
                </button>
            </div>
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button class="cursor-default" onclick={onClose}>close</button>
    </form>
</dialog>
