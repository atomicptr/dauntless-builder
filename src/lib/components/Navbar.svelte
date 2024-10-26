<script lang="ts">
import HamburgerIcon from "$lib/components/icons/HamburgerIcon.svelte";
import AppIcon from "$lib/components/AppIcon.svelte";
</script>

<div class="navbar w-full sticky top-0 z-20 bg-base-100 bg-opacity-90 backdrop-blur">
    <div class="flex-none lg:hidden">
        <label for="drawer" class="btn btn-square btn-ghost">
            <HamburgerIcon />
        </label>
    </div>

    <div class="mx-2 flex-1 px-2 lg:hidden">
        <AppIcon />
    </div>

    <div class="mx-2 flex-1 hidden lg:block"></div>

    <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
                <img src="https://gravatar.com/avatar/c58aeb397a3ad41836cd14d484c05337" alt="avatar" />
            </div>
        </div>
    </div>
</div>
