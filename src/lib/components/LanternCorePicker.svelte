<script lang="ts">
import { page } from "$app/stores";
import type { BuildLanternCore } from "$lib/build/Build";
import { translatableString } from "$lib/utils/translatable-string";

interface LanternCorePickerProps {
    selected: BuildLanternCore;
    onClick: () => void;
}

const { selected, onClick }: LanternCorePickerProps = $props();
const lanternCore = $derived(selected.id !== 0 ? $page.data.lantern_cores[selected.id] : null);
const icon = $derived(lanternCore.icon ?? "/icon.png");
</script>

{#if lanternCore}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={() => onClick()}>
            <div class="w-16 ml-2">
                <img src="{icon}" alt="{translatableString(lanternCore.name)}" />
            </div>
            <div class="grow">
                {translatableString(lanternCore.name)}
            </div>
        </button>
    </div>
{:else}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={() => onClick()}>
            <div class="w-16 ml-2">
                Placeholder icon
            </div>
            <div class="grow">
                Select a lantern core
            </div>
        </button>
    </div>
{/if}
