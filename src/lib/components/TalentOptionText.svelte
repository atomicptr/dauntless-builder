<script lang="ts">
import type { WeaponTalentOption } from "$lib/data/phalanx-types";
import { t } from "$lib/i18n.svelte";
import ValuesText from "./ValuesText.svelte";

interface Props {
    class?: string;
    option: WeaponTalentOption;
    compact?: boolean;
}

const { option, compact, ...rest }: Props = $props();
</script>

<div class={rest.class}>
    {#if option.type === "custom"}
        <ValuesText
            text={option.description}
            values={option.values}
            classOverwrite={compact ? { p: "" } : undefined}
        />
    {:else if option.type === "stat"}
        <div>
            {$t("page-build-talent-stat", {value: option.value.toString(), stat: $t(`stat-${option.stat}`).toUpperCase()})}
        </div>
    {/if}
</div>
