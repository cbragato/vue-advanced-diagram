export interface ICoordinate {
    x: number,
    y: number,
    change(x: number, y: number): void
}

export class Coordinate implements ICoordinate {
    x!: number;
    y!: number;
    constructor(x = 10, y = 10) {
        this.x = x
        this.y = y
    }
    change(x: number, y: number): void {
        this.x = x
        this.y = y
    }
}