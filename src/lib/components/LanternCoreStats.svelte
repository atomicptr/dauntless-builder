<script lang="ts">
import { page } from "$app/stores";
import type { BuildLanternCore } from "$lib/build/Build";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "./LazyImage.svelte";
import ValuesText from "./ValuesText.svelte";

interface Props {
    selected: BuildLanternCore;
}

const { selected }: Props = $props();
const lanternCore = $derived(selected.id !== 0 ? $page.data.lantern_cores[selected.id] : null);
</script>

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
                <LazyImage class="w-12 h-12" src={lanternCore.active_icon} alt={lanternCore.active.title ? translatableString(lanternCore.active.title) : "Active"}/>
            {/if}
            <h2 class="text-xl">{lanternCore.active.title ? translatableString(lanternCore.active.title) : "Active"}</h2>
        </div>
        <ValuesText text={lanternCore.active.description} values={lanternCore.active.values} />
        <div>
            <strong>Cooldown</strong>: {lanternCore.active_cooldown}s
        </div>
    </div>
</div>
