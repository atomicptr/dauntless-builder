<script lang="ts">
interface Props {
    title: string;
    hidden?: boolean;
    remove?: boolean;
}

const { title, hidden, remove }: Props = $props();

const iconPath = "https://www.dauntless-builder.com/icon.png";
const metaDescription = "Create and share Dauntless builds with your friends!";
</script>

<svelte:head>
    <title>{title} - Dauntless Builder</title>

    <meta
        content="Dauntless Builder"
        property="og:site_name"
    />

    <meta
        content={title}
        property="og:title"
    />

    <meta
        content={metaDescription}
        name="description"
    />

    <meta
        content={metaDescription}
        property="og:description"
    />

    <meta
        content={iconPath}
        property="og:image"
    />
</svelte:head>

{#if !remove}
    <h1 class="text-2xl mb-8" class:hidden={hidden}>{title}</h1>
{/if}
