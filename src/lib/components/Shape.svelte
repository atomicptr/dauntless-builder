<script lang="ts">
import type { Snippet } from "svelte";

interface ShapeProps {
    type: "square" | "pentagon" | "hexagon" | "octagon" | "circle";
    extraClasses?: {
        container?: string;
        shape?: string;
        content?: string;
    };
    children: Snippet;
}

const { type, extraClasses, children }: ShapeProps = $props();

const getShapeStyle = () => {
    switch (type) {
        case "square":
            return "border-radius: 12%";
        case "pentagon":
            return "clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)";
        case "hexagon":
            return "clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
        case "octagon":
            return "clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";
        case "circle":
            return "border-radius: 50%";
    }
};

const shapeClasses = {
    container: "relative w-full h-full p-4 " + (extraClasses?.container ?? ""),
    shape: "absolute inset-0 bg-base-100 " + (extraClasses?.shape ?? ""),
    content: "relative z-10 flex items-center justify-center w-full h-full " + (extraClasses?.content ?? ""),
};
</script>

<div class={shapeClasses.container}>
    <div class={shapeClasses.shape} style={getShapeStyle()}></div>
    <div class={shapeClasses.content}>
        {@render children()}
    </div>
</div>

<style>
    .container {
        --size: 200px;
        width: var(--size);
        height: var(--size);
    }

    .shape {
        width: 100%;
        height: 100%;
    }

    .content {
        pointer-events: none;
    }

    .content > * {
        pointer-events: auto;
    }
</style>
