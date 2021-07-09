import { ILayer, ILayers } from "./Layer";

export enum DiagramType {
    simple,
    lanes,
    layers
}

export interface IDiagram {
    id: string
    name: string
    description: string
    type: DiagramType
    layers: ILayers
    addLayer(layer: ILayer): string
    removeLayer(layer: ILayer): void
}

export class Diagram implements IDiagram {
    readonly id!: string;
    name!: string;
    description!: string;
    type!: DiagramType;
    layers!: ILayers;

    addLayer(layer: ILayer): string {
        return this.layers.add(layer)
    }
    removeLayer(layer: ILayer): void {
        this.layers.remove(layer)
    }
}