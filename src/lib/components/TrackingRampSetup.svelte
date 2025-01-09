<script lang="ts">
import { env, envBool } from "$lib/utils/env-helper";

let displayAds = $state(true); // TODO: default this to false, check with "backend" and then load stuff

const enableAds = envBool("DB_ENABLE_ADS");
const displayPlaceholders = envBool("DB_DISPLAY_AD_PLACEHOLDERS");

const publisherId = env("DB_PW_PUBSLIHER_ID");
const websiteId = env("DB_PW_WEBSITE_ID");
const ga4MeasurementId = env("DB_GA4_MEASUREMENT_ID");

const init = async () => {
    // feature flag hasn't been enabled
    if (!enableAds) {
        return;
    }

    // user doesnt have ads so stop here, might want to check here :)
    if (!displayAds) {
        return;
    }

    // if we are displaying placeholders instead, just stop here
    if (displayPlaceholders) {
        return;
    }

    // not properly set up?
    if (!publisherId || !websiteId) {
        return;
    }

    // ramp has already been initialized
    if (window.ramp) {
        return;
    }

    window.ramp = window.ramp ?? {};
    window.ramp.que = window.ramp.que ?? [];
    window.ramp.passiveMode = true;

    const gtagFunc = (...args: unknown[]) => window.dataLayer.push(args);

    window._pwGA4PageviewId = Date.now().toString();
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || gtagFunc;
    window.gtag("js", new Date());
    window.gtag("config", ga4MeasurementId, { send_page_view: false });
    window.gtag("event", "ramp_js", {
        pageview_id: window._pwGA4PageviewId,
        send_to: ga4MeasurementId,
    });

    window.ramp.que.push(() => {
        // TODO: remove me
        console.log("playwire has been setup");
    });

    const rampScript = document.createElement("script");
    rampScript.src = `https://cdn.intergient.com/${publisherId}/${websiteId}/ramp.js`;
    rampScript.async = true;
    document.body.appendChild(rampScript);
};
</script>

<svelte:head>
    {#if ga4MeasurementId}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`} onload={init}></script>
    {/if}
</svelte:head>
