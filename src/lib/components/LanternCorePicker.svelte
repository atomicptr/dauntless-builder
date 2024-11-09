<script lang="ts">
import { page } from "$app/stores";
import type { BuildLanternCore } from "$lib/build/Build";
import { itemIconSize } from "$lib/constants";
import { translatableString } from "$lib/utils/translatable-string";
import LanternCoreStats from "./LanternCoreStats.svelte";

interface LanternCorePickerProps {
    selected: BuildLanternCore;
    onClick: () => void;
}

const { selected, onClick }: LanternCorePickerProps = $props();
const lanternCore = $derived(selected.id !== 0 ? $page.data.lantern_cores[selected.id] : null);
const icon = $derived(lanternCore.icon ?? "/icon.png");
</script>

{#if lanternCore}
    <div class="flex flex-col gap-2 min-h-20">
        <button class="card-btn grow" onclick={() => onClick()}>
            <div class={`${itemIconSize} ml-2`}>
                <img src="{icon}" alt="{translatableString(lanternCore.name)}" />
            </div>
            <div class="grow">
                {translatableString(lanternCore.name)}
            </div>
        </button>
    </div>

    <LanternCoreStats {selected} />
{:else}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={onClick}>
            <div class={`${itemIconSize} ml-2`}>
                <img src="/icons/lantern.png" alt="Lantern Core" />
            </div>
            <div class="grow">
                Select a lantern core
            </div>
        </button>
    </div>
{/if}
