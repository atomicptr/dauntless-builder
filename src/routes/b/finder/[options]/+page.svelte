<script lang="ts">
import FinderPage from "$lib/components/FinderPage.svelte";
import PageTitle from "$lib/components/PageTitle.svelte";
import type { FinderInitialData } from "$lib/finder/initial";

const { data } = $props();
const finderPageData = data.finderPageData as FinderInitialData;
</script>

<PageTitle title="Build Finder" />

<FinderPage initialFinderData={finderPageData} />
