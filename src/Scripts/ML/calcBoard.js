import { tensor } from "@tensorflow/tfjs";
import { store } from "../../Redux/store";
import { BoardToBitBoard } from "../BoardToBitBoard";
import { ReverseBitBoard } from "../ReverseBitBoard";

const encoding = {'P': 1, 'R': 2, 'N': 3, 'B': 4, 'Q': 5, 'K': 6,
                'p': -1, 'r': -2, 'n': -3, 'b': -4, 'q': -5, 'k': -6, 'free': 0}

export function predictBoard (currentIndex, destinationIndex, white) {
    const state = store.getState()
    const gameState = state.gameState
    let board = gameState.board

    let pieces = BoardToBitBoard()
    pieces[destinationIndex] = encoding[board[currentIndex].type]
    pieces[currentIndex] = encoding['free']

    if(white === false) {
        pieces = ReverseBitBoard(pieces)
    }
    
    console.log(pieces)

    return tensor(pieces).reshape([-1, gameState.boardHeight * gameState.boardWidth])
    
}