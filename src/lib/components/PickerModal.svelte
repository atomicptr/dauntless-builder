<script lang="ts">
import { applyAll, filterName, type FilterFunc, type FilterItem, type GenericItem } from "$lib/build/filters";
import { itemIconSize } from "$lib/constants";
import { translatableString } from "$lib/utils/translatable-string";
import type { Snippet } from "svelte";
import LazyImage from "./LazyImage.svelte";
import Search from "./Search.svelte";

interface PickerModalProps {
    items: FilterItem[];
    filters?: FilterFunc[];
    onSelected?: (id: number) => void;
    onClose?: () => void;
    listItem?: Snippet<[FilterItem, (() => void) | undefined]>;
}

let search = $state("");

const { items, filters, onSelected, onClose, listItem }: PickerModalProps = $props();

const elementClass = (item: FilterItem): string =>
    "element" in item ? `element-border element-border-${item.element}` : "";

const filteredItems = $derived(applyAll(items, [...(filters ?? []), filterName(search)]));
</script>

{#snippet listItemGeneric(item: FilterItem, onclick?: () => void)}
    <button class={"card-btn grow " + elementClass(item)} {onclick}>
        <LazyImage class={`${itemIconSize} ml-2`} src={(item as GenericItem).icon ?? '/icons/noicon.png'} alt={translatableString(item.name)} />
        <div class="grow">
            {translatableString(item.name)}
        </div>
    </button>
{/snippet}

<dialog class="modal bg-base-300/80" open>
    <div class="modal-box w-5xl max-w-5xl pt-0">
        <div class="sticky top-0 left-0 right-0 z-30 pt-2 pb-4 bg-base-100 bg-opacity-90 backdrop-blur">
            <div class="flex flex-row justify-end mb-4">
                <button class="btn btn-sm btn-circle btn-ghost" onclick={onClose ? () => onClose() : undefined}>✕</button>
            </div>
            <Search bind:value={search} />
        </div>

        <div class="flex flex-col gap-2 mt-4">
            {#each filteredItems as item}
                {@render (listItem ?? listItemGeneric)(item, onSelected ? () => onSelected(item.id) : undefined)}
            {/each}
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button class="cursor-default" onclick={onClose}>close</button>
    </form>
</dialog>
