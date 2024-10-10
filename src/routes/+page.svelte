<script lang="ts">
    let x = $state(1);

    const increment = () => {
        x += 1;
    }
</script>

<svelte:head>
    <title>Demo Page | Dauntless Builder</title>
</svelte:head>

<button class="btn btn-primary" onclick={increment}>+ { x }</button>
