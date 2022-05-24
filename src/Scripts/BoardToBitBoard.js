import { store } from "../Redux/store"

const encoding = {'P': 1, 'R': 2, 'N': 3, 'B': 4, 'Q': 5, 'K': 6,
                'p': -1, 'r': -2, 'n': -3, 'b': -4, 'q': -5, 'k': -6, 'free': 0}

export function BoardToBitBoard() {

    const state = store.getState()
    const gameState = state.gameState
    let board = gameState.board

    let pieces = []
    for (let index = 0; index < gameState.boardHeight * gameState.boardWidth; index++) {
        let piece = board[index].type
        pieces.push(encoding[piece])
    }

    return pieces
}