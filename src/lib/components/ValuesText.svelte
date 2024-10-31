<script lang="ts">
import type { TranslatableString, ValuesType } from "$lib/data/phalanx-types";
import { renderTemplate } from "$lib/utils/template-renderer";
import { translatableString } from "$lib/utils/translatable-string";
import showdown from "showdown";

interface ValuesTextProps {
    text: TranslatableString | null;
    values: ValuesType[];
}

const { text, values }: ValuesTextProps = $props();

const classMap: { [key: string]: string } = {
    ol: "list-decimal pl-8",
};

const converter = new showdown.Converter({
    extensions: Object.keys(classMap).map((key) => ({
        type: "output",
        regex: new RegExp(`<${key}(.*)>`, "g"),
        replace: `<${key} class="${classMap[key]}" $1>`,
    })),
});
</script>

<div class="values-text">
    {@html converter.makeHtml(renderTemplate(translatableString(text), values))}
</div>
