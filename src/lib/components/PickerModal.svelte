<script lang="ts">
import { applyAll, filterName, type FilterFunc, type FilterItem } from "$lib/build/filters";
import { translatableString } from "$lib/utils/translatable-string";

interface PickerModalProps {
    items: FilterItem[];
    filters?: FilterFunc[];
    onSelected?: (id: number) => void;
    onClose?: () => void;
}

let search = $state("");

const { items, filters, onSelected, onClose }: PickerModalProps = $props();

const elementClass = (item: FilterItem): string =>
    "element" in item ? `element-border element-border-${item.element}` : "";

const filteredItems = $derived(applyAll(items, [...(filters ?? []), filterName(search)]));
</script>

<dialog class="modal bg-base-300/80" open>
    <div class="modal-box w-5xl max-w-5xl">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick={onClose ? () => onClose() : undefined}>✕</button>

        <div class="mt-8"></div>

        <label class="input input-bordered flex items-center gap-2">
            <input type="text" class="grow" placeholder="Search" bind:value={search} />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70">
                    <path
                        fill-rule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clip-rule="evenodd"
                />
            </svg>
        </label>

        <div class="flex flex-col gap-2 mt-4">
            {#each filteredItems as item}
                <button class={"card-btn grow " + elementClass(item)} onclick={onSelected ? () => onSelected(item.id) : undefined}>
                    <div class="w-16 ml-2">
                        <img src="{item.icon ?? '/icons/noicon.png'}" alt="{translatableString(item.name)}" />
                    </div>
                    <div class="grow">
                        {translatableString(item.name)}
                    </div>
                </button>
            {/each}
        </div>
    </div>
</dialog>
