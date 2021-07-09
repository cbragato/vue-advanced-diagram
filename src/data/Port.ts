import { uuid } from "uuidv4"

export enum PortType {
    In, Out
}

export interface IPort {
    id: string
    name: string
    type?: PortType
}

export class Port implements IPort {
    readonly id!: string;
    name!: string;
    type?: PortType | undefined;

    constructor(props: Omit<IPort, 'id'>, id?: string) {
        Object.assign(this, props)
        if (!id) {
            this.id = uuid()
        }
    }
}

export interface IPorts {
    content: Array<IPort>
    add(port: IPort): string
    remove(port: IPort): void
}

export class Ports implements IPorts {
    content!: Array<IPort>;

    add(port: IPort): string {
        this.content.push(port)
        return port.id
    }
    remove(port: IPort): void {
        const index = this.content.indexOf(port)
        this.content.splice(index, 1)
    }
}