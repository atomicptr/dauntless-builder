<script lang="ts">
import PageTitle from "$lib/components/PageTitle.svelte";
import { languageValues, nativeLanguageName, type Language } from "$lib/i18n";
import { configViewWeaponAbilities, configViewWeaponTalents, language, theme } from "$lib/state.svelte";
</script>

<PageTitle title="Settings" />

<div class="flex flex-col gap-2">
    <div class="form-control max-w-64">
        <label class="form-control w-full max-w-xs">
        <div class="label">
            <span class="label-text">Language</span>
        </div>
            <select class="select select-bordered" value={$language} onchange={(ev) => language.set(ev.currentTarget.value as Language)}>
                {#each languageValues as lang}
                    <option value={lang}>{nativeLanguageName(lang)}</option>
                {/each}
            </select>
        </label>
    </div>
    
    <div class="form-control max-w-64">
        <label class="label cursor-pointer">
            <span class="label-text">Use Dark Mode</span>
            <input type="checkbox" class="toggle toggle-primary" checked={$theme === "dark"} onchange={() => theme.set($theme === "dark" ? "light" : "dark")} />
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
