<script lang="ts">
import { page } from "$app/stores";
import { type Perk } from "$lib/data/phalanx-types";
import { translatableString } from "$lib/utils/translatable-string";
import type { Snippet } from "svelte";
import PerkTooltip from "./PerkTooltip.svelte";
import { phalanxData } from "$lib/data/phalanx-data";

interface Props {
    perkId: string;
    amount: number;
    item?: Snippet<[Perk, number]>;
}

const { perkId, amount, item }: Props = $props();
</script>

{#snippet genericItem(perk: Perk, amount: number)}
    {translatableString(perk.name)}
    {amount} / {perk.threshold}
{/snippet}

<PerkTooltip {perkId}>
    {@render (item ?? genericItem)(phalanxData.perks[perkId], amount)}
</PerkTooltip>
