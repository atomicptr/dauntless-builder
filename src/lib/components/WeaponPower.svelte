<script lang="ts">
import type { Element } from "$lib/data/phalanx-types";
import { elementPowerLevel, oppositeElement, powerLevel } from "$lib/data/static-data";

interface Props {
    level: number;
    element: Element;
}

const { level, element }: Props = $props();
</script>

{#if powerLevel(level) > 0}
    <div class="mr-4 flex flex-col align-center">
        <div class="text-xl">
            {powerLevel(level)}
        </div>
        <div class="element-text-{oppositeElement(element)}">
            +{elementPowerLevel(level)[0]}
        </div>
        <div class="element-text-{element}">
            -{elementPowerLevel(level)[1]}
        </div>
    </div>
{/if}
