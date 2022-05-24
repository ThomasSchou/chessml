import { ReactElement } from "react";
import { JsxElement } from "typescript";


export interface Tile {
    tile: [number, number],
    index: number,
    type: string,
    color: number,
    highlight: number,
    firstMove: boolean
}

