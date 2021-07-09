import { uuid } from "uuidv4";
import { ILink, ILinks } from "./Link";
import { INodes, INode } from "./Node";

export interface ILayer {
    id: string
    name: string
    description: string
    nodes: INodes
    links: ILinks
    addNode(node: INode): string
    removeNode(node: INode): void
    addLink(link: ILink): string
    removeLink(link: ILink): void
}

export class Layer implements ILayer {
    id!: string;
    name!: string;
    description!: string;
    nodes!: INodes;
    links!: ILinks;

    constructor(props: Omit<ILayer, 'id'>, id?: string) {
        Object.assign(this, props)
        if (!id) this.id = uuid()
    }

    addNode(node: INode): string {
        return this.nodes.add(node)
    }

    removeNode(node: INode): void {
        if (node.removable)
            this.nodes.remove(node)
    }

    addLink(link: ILink): string {
        return this.links.add(link)
    }
    removeLink(link: ILink): void {
        this.links.remove(link)
    }
}

export interface ILayers {
    _content: Array<ILayer>
    add(layer: ILayer): string
    remove(layer: ILayer): void
}

export class Layers implements ILayers {
    _content!: ILayer[];
    add(layer: ILayer): string {
        this._content.push(layer)
        return layer.id
    }
    remove(layer: ILayer): void {
        const index = this._content.indexOf(layer)
        this._content.splice(index, 1)
    }
}