import { uuid } from "uuidv4"
import { IPort } from "./Port";

export interface ILink {
    id: string,
    from: IPort
    to: IPort
    points?: Array<string>
}

export class Link implements ILink {
    readonly id!: string;
    from!: IPort;
    to!: IPort;
    points?: string[] | undefined;

    constructor(props: Omit<ILink, 'id'>, id?: string) {
        Object.assign(this, props)
        if (!id) {
            this.id = uuid()
        }
    }
}

export interface ILinks {
    content: Array<ILink>
    add(link: ILink): string
    remove(link: ILink): void
}

export class Links implements ILinks {
    content!: Array<ILink>

    add(link: ILink): string {
        this.content.push(link)
        return link.id
    }

    remove(link: ILink): void {
        const index = this.content.indexOf(link, 0)
        if (index > -1) this.content.splice(index, 1)
    }
}


