<script lang="ts">
import { page } from "$app/stores";
import { translatableString } from "$lib/utils/translatable-string";
import PerkTooltip from "./PerkTooltip.svelte";

interface Props {
    perkId: string;
    amount: number;
}

const { perkId, amount }: Props = $props();
</script>

<PerkTooltip {perkId}>
    {translatableString($page.data.perks[perkId].name)}
    {amount} / {$page.data.perks[perkId].threshold}
</PerkTooltip>
