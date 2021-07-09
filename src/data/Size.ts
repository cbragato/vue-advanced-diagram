export interface ISizeData {
    width: number,
    height: number,
    resizeable?: boolean

}

export interface ISize {
    change(size: ISizeData): void
}

export class Size implements ISize {
    _size!: ISizeData;

    constructor(props: Omit<ISizeData, 'resizeable'>, resizeable = true) {
        Object.assign(this, props)
        this._size.resizeable = resizeable
    }

    change(size: ISizeData): void {
        if (this._size.resizeable) {
            this._size.width = size.width
            this._size.height = size.height
        } else {
            throw new Error("This node is not resizeable")
        }
    }
}