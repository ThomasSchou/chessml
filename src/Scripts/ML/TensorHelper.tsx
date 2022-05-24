import { tensor, tensor3d } from "@tensorflow/tfjs";
import { store } from "../../Redux/store";

export function whiteUnitsToTensor() {
    const state = store.getState()
    const gameState = state.gameState

    const whitePieces = gameState.board.filter(v => v.type === v.type.toUpperCase())

    let whitestate : any[] = []
    whitePieces.forEach((value) => {
        whitestate.push([value.tile[0], value.tile[1], 1])
    })
    
    return whitestate
}

export function blackUnitsToTensor() {
    const state = store.getState()
    const gameState = state.gameState

    const blackPieces = gameState.board.filter(v => v.type !== v.type.toUpperCase() && v.type !== "free")
    
    let blackstate : any[] = []
    blackPieces.forEach((value) => {
        blackstate.push([value.tile[0], value.tile[1], 1])
    })
    
    return blackstate
}

export function combineTensor() {
    const white = whiteUnitsToTensor()
    const black = blackUnitsToTensor()
    
    const value = [black.flat(), white.flat()]
    console.log(value.flat())
    return tensor3d(value.flat(), [2, black.length, 3])
    
    
}