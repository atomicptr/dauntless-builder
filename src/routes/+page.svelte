<script lang="ts">
import PageTitle from "$lib/components/PageTitle.svelte";
import { githubLink } from "$lib/constants";
</script>

<PageTitle title="Home" remove />

<h1 class="text-2xl mb-8">Welcome to Dauntless Builder,</h1>

<p>a free and open source web application for creating and sharing builds for the popular free to play monster hunting game Dauntless.</p>

<h2 class="text-xl my-4">Contributing</h2>

<p>If you're interested in contributing code or especially localizations please head over to our <a class="link-primary" href={githubLink} target="_blank">Github</a>!</p>
