<script lang="ts">
interface Props {
    level: number;
}

const { level }: Props = $props();
</script>

{#if level > 1}
    +{level}
{/if}
