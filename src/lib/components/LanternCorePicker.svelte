<script lang="ts">
import type { BuildLanternCore } from "$lib/build/Build";
import { itemIconSize } from "$lib/constants";
import { phalanxData } from "$lib/data/phalanx-data";
import { t } from "$lib/i18n.svelte";
import { translatableString } from "$lib/utils/translatable-string";
import LanternCoreStats from "./LanternCoreStats.svelte";
import LazyImage from "./LazyImage.svelte";

interface LanternCorePickerProps {
    selected: BuildLanternCore;
    onClick?: () => void;
}

const { selected, onClick }: LanternCorePickerProps = $props();
const lanternCore = $derived(selected.id !== 0 ? phalanxData.lantern_cores[selected.id] : null);
const icon = $derived(lanternCore?.icon ?? "/icon.png");
const disabled = $derived(onClick === undefined);
</script>

{#if lanternCore}
    <div class="flex flex-col gap-2 min-h-20">
        <button class="card-btn grow" onclick={onClick ? () => onClick() : undefined} {disabled}>
            <LazyImage class={`${itemIconSize} ml-2`} src={icon} alt={translatableString(lanternCore.name)} />
            <div class="grow">
                {translatableString(lanternCore.name)}
            </div>
        </button>
    </div>

    <LanternCoreStats {selected} />
{:else if !disabled}
    <div class="flex flex-row gap-2 min-h-20">
        <button class="card-btn grow" onclick={onClick}>
            <LazyImage class={`${itemIconSize} ml-2 light:invert`} src="/icons/lantern.png" alt={$t("term-lantern-core")} />
            <div class="grow">
                { $t("page-build-select-lantern-core") }
            </div>
        </button>
    </div>
{/if}
