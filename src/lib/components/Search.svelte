<script lang="ts">
interface Props {
    value?: string;
    class?: string;
}

let { value = $bindable(), ...rest }: Props = $props();
</script>

<label class={"input input-bordered flex items-center gap-2 " + rest.class}>
    <input type="text" class="grow" placeholder="Search" bind:value={value} />
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="h-4 w-4 opacity-70">
            <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
        />
    </svg>
</label>
