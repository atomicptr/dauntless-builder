<script lang="ts">
// this component exist to fix: https://svelte.dev/docs/svelte/runtime-warnings#Client-warnings-hydration_html_changed

interface Props {
    content: string | undefined;
}

let { content }: Props = $props();

(() => {
    if (typeof window !== "undefined") {
        const initial = content;

        content = undefined;

        $effect(() => {
            content = initial;
        });
    }
})();
</script>

{@html content}
