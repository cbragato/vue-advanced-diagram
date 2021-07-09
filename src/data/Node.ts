import { uuid } from "uuidv4"
import { Coordinate, ICoordinate } from "./Coordinate";
import { IPort, IPorts, Ports } from "./Port";
import { ISize, Size } from "./Size";

export interface INodeProps {
    id: string
    title: string
    symbol: string
    color?: string
    removable: boolean
    coordinate: ICoordinate,
    size?: ISize,
    ports: IPorts
    data?: Record<string, unknown>
}

export interface INode {
    _props: INodeProps
    addPort(port: IPort): string
    removePort(port: IPort): void
}

export class Node implements INode {
    _props!: INodeProps;

    constructor(_props?: INodeProps, id?: string) {
        if (!_props)
            this._props = {
                id: id ? id : uuid(),
                title: "new node",
                symbol: "",
                color: "#CC00EEFF",
                removable: false,
                coordinate: new Coordinate(),
                size: new Size({ width: 100, height: 100 }),
                ports: new Ports(),
            }
        else
            this._props = _props

        if (!id) {
            this._props.id = uuid();
        }
        if (!this._props.coordinate) this._props.coordinate = new Coordinate(10, 10)
        if (!this._props.size) this._props.size = new Size({ width: 100, height: 100 })
    }

    addPort(port: IPort): string {
        return this._props.ports.add(port)
    }

    removePort(port: IPort): void {
        this._props.ports.remove(port)
    }

    public get data(): Record<string, unknown> | undefined {
        return this._props.data
    }

    public set data(data: Record<string, unknown> | undefined) {
        this._props.data = data
    }

}

export interface INodes {
    content: Array<INode>
    add(node: INode): string
    remove(node: INode): void
}

export class Nodes implements INodes {
    content!: Array<INode>

    add(node: INode): string {
        this.content.push(node)
        return node._props.id
    }
    remove(node: INode): void {
        const index = this.content.indexOf(node)
        if (index > -1) this.content.splice(index, 1)
    }
}