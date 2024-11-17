<script lang="ts">
import LazyImage from "./LazyImage.svelte";

interface Props {
    id: string;
    title?: string;
}

let loadRequested = $state(false);

const { id, title }: Props = $props();
</script>

<div>
    {#if loadRequested}
        <iframe
            class="w-full aspect-video"
            title={title}
            loading="lazy"
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            frameborder="0"
            allow="autoplay;encrypted-media"
            allowfullscreen></iframe>
    {:else}
        <button class="relative" onclick={() => loadRequested = true}>
            <LazyImage src={`https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`} />
            <div class="absolute top-0 bottom-0 left-0 right-0 flex justify-center align-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="max-w-32 text-white drop-shadow-lg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                </svg>
            </div>
        </button>
    {/if}
</div>
