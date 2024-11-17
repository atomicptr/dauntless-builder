<script lang="ts">
import { page } from "$app/stores";
import { deserialize, empty } from "$lib/build/Build";
import MiniBuild from "$lib/components/MiniBuild.svelte";
</script>

<h1 class="text-2xl mb-8">
    Meta Builds
</h1>

<div class="flex flex-col gap-2">
    {#each $page.data.buildsData.meta as {id, name, buildId}}
        <MiniBuild title={name} build={deserialize(buildId).unwrapOr(empty())} link={`/b/meta/${id}`} />
    {/each}
</div>
