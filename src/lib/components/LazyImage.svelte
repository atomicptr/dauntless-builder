<script lang="ts">
import { onMount } from "svelte";

interface Props {
    src: string;
    class?: string;
    alt?: string;
}

let observer: IntersectionObserver | null = $state(null);
let element: HTMLElement | null = $state(null);

let load = $state(false);

const { src, alt, ...rest }: Props = $props();

onMount(() => {
    if (!element) {
        return;
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                load = true;
            }
        });
    });

    observer.observe(element);

    return () => {
        if (!element) {
            return;
        }
        observer?.unobserve(element);
    };
});
</script>

<div bind:this={element}>
    {#if load}
        <img {src} {alt} title={alt} class={rest.class} />
    {:else}
        <div class={"skeleton " + (rest.class ?? "")}></div>
    {/if}
</div>
