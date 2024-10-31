<script lang="ts">
import { page } from "$app/stores";
import type { BuildLanternCore } from "$lib/build/Build";
import { translatableString } from "$lib/utils/translatable-string";
import ValuesText from "./ValuesText.svelte";

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
            <div class="w-16 ml-2">
                <img src="{icon}" alt="{translatableString(lanternCore.name)}" />
            </div>
            <div class="grow">
                {translatableString(lanternCore.name)}
            </div>
        </button>
    </div>

    <div>
        <div class="py-2 pl-4">
            {#if lanternCore.passive.title}
                <h2 class="text-xl mb-4">{translatableString(lanternCore.passive.title)}</h2>
            {/if}
            <ValuesText text={lanternCore.passive.description} values={lanternCore.passive.values} />
        </div>

        <div class="py-2 pl-4">
            <div class="flex flex-row items-center gap-4 mb-4">
                {#if lanternCore.active_icon}
                    <img class="w-12 h-12" src="{lanternCore.active_icon}" alt={lanternCore.active.title ? translatableString(lanternCore.active.title) : "Active"}/>
                {/if}
                <h2 class="text-xl">{lanternCore.active.title ? translatableString(lanternCore.active.title) : "Active"}</h2>
            </div>
            <ValuesText text={lanternCore.active.description} values={lanternCore.active.values} />
        </div>
    </div>
{:else}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={onClick}>
            <div class="w-16 ml-2">
                <img src="/icons/lantern.png" alt="Lantern Core" />
            </div>
            <div class="grow">
                Select a lantern core
            </div>
        </button>
    </div>
{/if}
