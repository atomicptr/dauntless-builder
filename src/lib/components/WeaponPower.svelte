<script lang="ts">
import type { Element } from "$lib/data/phalanx-types";
import { elementResistanceLevel, oppositeElement, powerLevel } from "$lib/data/static-data";

interface Props {
    level: number;
    element: Element;
}

const { level, element }: Props = $props();
</script>

<div class="mr-4 flex flex-col align-center">
    <div class="text-xl">
        {powerLevel(level)}
    </div>
    <div class="element-text-{oppositeElement(element)}">
        +{elementResistanceLevel(level)}
    </div>
    <div class="element-text-{element}">
        -{elementResistanceLevel(level)}
    </div>
</div>
