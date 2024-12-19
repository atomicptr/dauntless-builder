<script lang="ts">
import { page } from "$app/stores";
import type { BuildLanternCore } from "$lib/build/Build";
import { phalanxData } from "$lib/data/phalanx-data";
import { t } from "$lib/i18n.svelte";
import { translatableString } from "$lib/utils/translatable-string";
import LazyImage from "./LazyImage.svelte";
import ValuesText from "./ValuesText.svelte";

interface Props {
    selected: BuildLanternCore;
}

const { selected }: Props = $props();
const lanternCore = $derived(selected.id !== 0 ? phalanxData.lantern_cores[selected.id] : null);
</script>

{#if lanternCore?.passive}
    <div class="card bg-base-200/50 shadow">
        <div class="card-body">
            {#if lanternCore.passive.title}
                <div class="card-title">{translatableString(lanternCore.passive.title)}</div>
            {/if}
            <ValuesText text={lanternCore.passive.description} values={lanternCore.passive.values} />
        </div>
    </div>
{/if}

{#if lanternCore?.active}
    <div class="card bg-base-200/50 shadow">
        <div class="card-body">
            <div class="card-title flex flex-row items-center gap-4 mb-4">
                {#if lanternCore.active_icon}
                    <LazyImage class="w-12 h-12" src={lanternCore.active_icon} alt={lanternCore.active.title ? translatableString(lanternCore.active.title) : $t("term-active-ability")}/>
                {/if}
                <div>{lanternCore.active.title ? translatableString(lanternCore.active.title) : $t("term-active-ability")}</div>
            </div>
            <ValuesText text={lanternCore.active.description} values={lanternCore.active.values} />
            {#if lanternCore.active_cooldown}
                <div>
                    <strong>{$t("term-cooldown")}</strong>: {$t("page-build-cooldown-string", {time: lanternCore.active_cooldown})}
                </div>
            {/if}
        </div>
    </div>

    <div class="mb-2 sm:mb-0"></div>
{/if}
