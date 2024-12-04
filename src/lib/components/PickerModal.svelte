<script lang="ts">
import { applyAll, filterName, type FilterFunc, type FilterItem, type GenericItem } from "$lib/build/filters";
import { itemIconSize } from "$lib/constants";
import { translatableString } from "$lib/utils/translatable-string";
import { onMount, type Snippet } from "svelte";
import LazyImage from "./LazyImage.svelte";
import Search from "./Search.svelte";

export interface ListItemData {
    level?: number;
}

interface PickerModalProps {
    items: FilterItem[];
    filters?: FilterFunc[];
    onSelected?: (id: number, itemData: ListItemData) => void;
    onClose?: () => void;
    listItem?: Snippet<[FilterItem, ListItemData, (() => void) | undefined]>;
    initialLevel?: number;
    maxLevel?: number;
}

let search = $state("");
let currentLevel = $state(1);

const { items, filters, onSelected, onClose, listItem, initialLevel, maxLevel }: PickerModalProps = $props();

const elementClass = (item: FilterItem): string =>
    "element" in item ? `element-border element-border-${item.element}` : "";

const filteredItems = $derived(applyAll(items, [...(filters ?? []), filterName(search)]));

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
            <Search bind:value={search} />
        </div>

        <div class="flex flex-col gap-2 mt-4">
            {#each filteredItems as item}
                {@render (listItem ?? listItemGeneric)(item, {
                    level: currentLevel,
                }, onSelected ? () => onSelected(item.id, { level: currentLevel }) : undefined)}
            {/each}
        </div>

        <div class="sticky bottom-0 left-0 right-0 z-30 py-2 mt-4 bg-base-100 bg-opacity-90 backdrop-blur flex flex-row gap-2">
            {#if maxLevel !== undefined}
                <div class="flex flex-row gap-2 items-center w-[30%]">
                    <div>
                        Level
                    </div>
                    <input type="range" min="1" max={maxLevel} class="range range-primary" step="1" bind:value={currentLevel} />
                    <div class="">
                        {currentLevel}
                    </div>
                </div>
            {/if}
            
            <div class="grow"></div>

            <button class="btn" onclick={onSelected ? () => onSelected(0, { level: currentLevel }) : undefined}>
                Unselect item
            </button>

            <button class="btn" onclick={onClose}>
                Cancel
            </button>
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button class="cursor-default" onclick={onClose}>close</button>
    </form>
</dialog>
