<script lang="ts">
import type { TranslatableString, ValuesType } from "$lib/data/phalanx-types";
import { renderTemplate } from "$lib/utils/template-renderer";
import { translatableString } from "$lib/utils/translatable-string";
import showdown from "showdown";

interface ValuesTextProps {
    class?: string;
    text: TranslatableString | null;
    values: ValuesType[];
    classOverwrite?: { [key: string]: string };
}

const { text, values, classOverwrite, ...rest }: ValuesTextProps = $props();

const classMap: { [key: string]: string } = {
    ol: "list-decimal pl-8 my-2",
    ul: "list-disc pl-8 my-2",
    p: "py-2",
    ...(classOverwrite ?? {}),
};

const converter = new showdown.Converter({
    extensions: Object.keys(classMap).map((key) => ({
        type: "output",
        regex: new RegExp(`<${key}(.*)>`, "g"),
        replace: `<${key} class="${classMap[key]}" $1>`,
    })),
});
</script>

<div class={"values-text " + (rest.class ?? "")}>
    {@html converter.makeHtml(renderTemplate(translatableString(text), values))}
</div>
