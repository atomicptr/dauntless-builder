<script lang="ts">
import PageTitle from "$lib/components/PageTitle.svelte";
import FinderPage from "$lib/components/FinderPage.svelte";
import { finderDefaultData } from "$lib/finder/initial";
</script>

<PageTitle title="Build Finder" />

<FinderPage initialFinderData={finderDefaultData()} />
