<template>
    <SvgPanZoom
        id="svgRoot"
        viewportSelector="#svgRoot2"
        :style="{
            width: width + 'px',
            height: height + 'px',
            border: '1px solid black',
        }"
        :zoomEnabled="zoomEnabled"
        :panEnabled="panEnabled"
        :controlIconsEnabled="true"
        :fit="false"
        :center="true"
        :preventMouseEventsDefault="false"
        :beforePan="beforePan"
    >
        <svg
            id="svgRoot2"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
            class="svg-content"
            ref="diagramRoot"
            :viewBox="'0 0 ' + width + ' ' + height"
            :width="width"
            :height="height"
            @mousemove="mouseMove"
            @mouseup="mouseUp"
        >
            <defs>
                <pattern
                    id="smallGrid"
                    width="16"
                    height="16"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 16 0 L 0 0 0 16"
                        fill="none"
                        stroke="gray"
                        stroke-width="0.5"
                    />
                </pattern>
                <pattern
                    id="grid"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="80" height="80" fill="url(#smallGrid)" />
                    <path
                        d="M 80 0 L 0 0 0 80"
                        fill="none"
                        stroke="gray"
                        stroke-width="1"
                    />
                </pattern>
            </defs>
            <rect
                x="-5000px"
                y="-5000px"
                width="10000px"
                height="10000px"
                fill="url(#grid)"
                @mousedown="clearSelection"
                ref="grid"
                class="svg-pan-zoom_viewport"
            />
            <g ref="viewPort" id="viewport" x="50" y="50"></g>
        </svg>
    </SvgPanZoom>
</template>

<script lang="ts">
import Vue from "vue";
import SvgPanZoom from "vue-svg-pan-zoom";
import { Diagram, IDiagram } from "../data/Diagram";

const diagram: IDiagram = new Diagram();

export default Vue.extend({
    name: "Diagram",
    props: {
        model: {
            required: true,
        },
        width: {
            default: 800,
        },
        height: {
            default: 600,
        },
        gridSnap: {
            default: true,
        },
    },
    data: () => {
        return {
            diagram,
            zoomEnabled: true,
            panEnabled: true,
            draggedItem: undefined,
            selectedItem: undefined,
            initialDragX: 0,
            initialDragY: 0,
            newLink: undefined,
            mouseX: 0,
            mouseY: 0,
        };
    },
    components: {
        SvgPanZoom,
    },
    methods: {
        clearSelection() {
            this.selectedItem = undefined;
        },
        mouseMove(position: { x: number; y: number }) {
            console.log(position);
        },
        mouseUp() {
            this.draggedItem = undefined;
            this.newLink = undefined;
        },
    },
});
</script>

<style scoped>
svg {
    user-select: none;
    font-family: Arial, Helvetica, sans-serif;
}
</style>