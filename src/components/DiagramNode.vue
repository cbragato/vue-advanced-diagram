<template>
    <svg :x="value._props.coordinate.x" :y="value._props.coordinate.y">
        <rect
            stroke="#000000"
            x="5"
            y="5"
            rx="3"
            ry="3"
            :fill="value._props.color"
            :stroke-width="value._props.select ? 2 : 0"
            :width="value._props.size.width"
            :height="value._props.size.height"
            class="node-dark-background"
        />
        <svg
            x="0"
            y="0"
            @mousedown="mouseDown"
            @mouseenter="mouseenter"
            @mouseleave="mouseleave"
        >
            <rect
                fill="#000000"
                :fill-opacity="titleFillOpacity"
                x="7"
                y="17"
                rx="3"
                ry="3"
                :width="value._props.size.width - 4"
                height="16"
                class="node-dark-background"
            />
            <text
                :x="10"
                :y="30"
                font-size="14"
                font-weight="bold"
                fill="#000000"
            >
                {{ value._props.title }}
            </text>
            <g @click="edit">
                <rect
                    :x="width - value._props.deletable ? 24 : 12"
                    y="18"
                    width="14"
                    height="14"
                    rx="2"
                    ry="2"
                    fill="#ffffff"
                    :fill-opacity="0.25"
                />
                <line
                    :x1="width - 10"
                    :y1="20"
                    :x2="width"
                    :y2="30"
                    style="stroke: rgb(0, 0, 0)"
                    stroke-width="1"
                />
                <line
                    :x1="width - 10"
                    :y1="20"
                    :x2="width"
                    :y2="30"
                    style="stroke: rgb(0, 0, 0)"
                    stroke-width="2"
                />
            </g>
            <g v-if="value._props.deletable" @click="deleteNode">
                <rect
                    :x="width - 12"
                    y="18"
                    width="14"
                    height="14"
                    rx="2"
                    ry="2"
                    fill="#ffffff"
                    :fill-opacity="0.25"
                />
                <line
                    :x1="width"
                    :y1="20"
                    :x2="width - 10"
                    :y2="30"
                    style="stroke: rgb(0, 0, 0)"
                    stroke-width="2"
                />
                <line
                    :x1="width - 10"
                    :y1="20"
                    :x2="width"
                    :y2="30"
                    style="stroke: rgb(0, 0, 0)"
                    stroke-width="2"
                />
            </g>
        </svg>
    </svg>
</template>

<script lang="ts">
import Vue from "vue";
import { INode, Node } from "@/data/Node";

export default Vue.extend({
    name: "DiagramNode",
    props: {
        value: {
            type: Node,
            required: true,
            default: (): INode => new Node(),
        },
    },
    data: () => ({}),
    methods: {
        edit() {
            this.$emit("edit", this.value._props.data);
        },
        deleteNode() {
            this.$emit("delete");
        },
        mouseDown(event: { x: number; y: number }) {
            const x = this.value._props.coordinate.x;
            const y = this.value._props.coordinate.y;

            this.$emit("onDragStart", {
                type: "nodes",
                node: this.value._props.id,
                x: event.x - x,
                y: event.y - y,
            });
        },
    },
});
</script>