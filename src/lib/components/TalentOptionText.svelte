<script lang="ts">
import type { WeaponTalentOption } from "$lib/data/phalanx-types";
import ValuesText from "./ValuesText.svelte";

interface Props {
    class?: string;
    option: WeaponTalentOption;
    compact?: boolean;
}

const { option, compact, ...rest }: Props = $props();
</script>

<div class={rest.class}>
    {#if option.type === 'custom'}
        <ValuesText
            text={option.description}
            values={option.values}
            classOverwrite={compact ? {p: ""} : undefined}
        />
    {:else if option.type === 'stat'}
        <div>
            You have {option.value} additional point of held {option.stat.toUpperCase()}.
        </div>
    {/if}
</div>
