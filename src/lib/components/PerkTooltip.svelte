<script lang="ts">
import { phalanxPerks } from "$lib/data/phalanx-perks";
import { renderTemplate } from "$lib/utils/template-renderer";
import { translatableString } from "$lib/utils/translatable-string";
import type { Snippet } from "svelte";

interface Props {
    class?: string;
    perkId: number | string;
    children: Snippet;
}

const { perkId, children, ...rest }: Props = $props();

const perk = $derived(phalanxPerks[perkId]);
</script>

<div class={"sm:tooltip sm:tooltip-bottom " + rest.class} data-tip={renderTemplate(translatableString(perk.effect), perk.values)}>
    {@render children()}
</div>
