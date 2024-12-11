<script lang="ts">
import PageTitle from "$lib/components/PageTitle.svelte";
import { configViewWeaponAbilities, configViewWeaponTalents, theme } from "$lib/state.svelte";

const onThemeChanged = () => {
    theme.set($theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", $theme);
};
</script>

<PageTitle title="Settings" />

<div class="flex flex-col gap-2">
    <div class="form-control max-w-64">
        <label class="label cursor-pointer">
            <span class="label-text">Use Dark Mode</span>
            <input type="checkbox" class="toggle toggle-primary" checked={$theme === "dark"} onchange={onThemeChanged} />
        </label>
    </div>

    <div class="form-control max-w-64">
        <label class="label cursor-pointer">
            <span class="label-text">View Weapon Abilities</span>
            <input type="checkbox" class="toggle toggle-primary" checked={$configViewWeaponAbilities} onchange={() => configViewWeaponAbilities.set(!$configViewWeaponAbilities)} />
        </label>
    </div>

    <div class="form-control max-w-64">
        <label class="label cursor-pointer">
            <span class="label-text">View Weapon Talents</span>
            <input type="checkbox" class="toggle toggle-primary" checked={$configViewWeaponTalents} onchange={() => configViewWeaponTalents.set(!$configViewWeaponTalents)} />
        </label>
    </div>
</div>
