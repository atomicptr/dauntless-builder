<script lang="ts">
import { page } from "$app/stores";
import { translatableString } from "$lib/utils/translatable-string";

interface Props {
    perkId: string;
    amount: number;
}

const { perkId, amount }: Props = $props();
</script>

<div>
    {translatableString($page.data.perks[perkId].name)}
    {#if amount !== $page.data.perks[perkId].threshold}
        {amount} / {$page.data.perks[perkId].threshold}
    {/if}
</div>
