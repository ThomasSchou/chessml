import { highlight } from "../Redux/ReduxSlices/GameStateSlice";
import { store } from "../Redux/store";

let state = store.getState()
let gameState = state.gameState
let board = gameState.board
let startIndexes: number[] = []
let moveIndexes: number[] = []
let selectedPiece: any

export function calcMove () {
    
    state = store.getState()
    gameState = state.gameState
    board = gameState.board
    moveIndexes = []
    console.log(selectedPiece)

    selectedPiece = state.gameState.selectedPiece

    switch (selectedPiece[0].toUpperCase()) {
        case "P":
            //Determine if white or black piece
            if(selectedPiece[1] === 0) {
                if(selectedPiece[3] === true) {
                    calcMoveNorth(2)
                } else {
                    calcMoveNorth(1)
                }
                calcNorthPawnCapture()
                store.dispatch(highlight(moveIndexes))
                break;
            } else {
                if(selectedPiece[3] === true) {
                    calcMoveSouth(2)
                } else {
                    calcMoveSouth(1)
                }
                calcSouthPawnCapture()
                store.dispatch(highlight(moveIndexes))
                break;
            }
            break;
        case "K":
            calcMoveNorth(1)
            calcMoveSouth(1)
            calcMoveWest(1)
            calcMoveEast(1)

            calcMoveNorthWest(1)
            calcMoveNorthEast(1)
            calcMoveSouthWest(1)
            calcMoveSouthEast(1)
            store.dispatch(highlight(moveIndexes))
            break;
        case "Q":
            calcMoveNorth(gameState.boardHeight)
            calcMoveSouth(gameState.boardHeight)
            calcMoveWest(gameState.boardWidth)
            calcMoveEast(gameState.boardWidth)

            calcMoveNorthWest(gameState.boardHeight)
            calcMoveNorthEast(gameState.boardHeight)
            calcMoveSouthWest(gameState.boardHeight)
            calcMoveSouthEast(gameState.boardHeight)
            store.dispatch(highlight(moveIndexes))
            break;
        case "N":
            calcMoveKnight()
            store.dispatch(highlight(moveIndexes))
            break;
        case "R":
            calcMoveNorth(gameState.boardHeight)
            calcMoveSouth(gameState.boardHeight)
            calcMoveWest(gameState.boardWidth)
            calcMoveEast(gameState.boardWidth)
            store.dispatch(highlight(moveIndexes))
            break;
        case "B":
            calcMoveNorthWest(gameState.boardHeight)
            calcMoveNorthEast(gameState.boardHeight)
            calcMoveSouthWest(gameState.boardHeight)
            calcMoveSouthEast(gameState.boardHeight)
            store.dispatch(highlight(moveIndexes))
            break;
    
        default:
            break;
    }
}

export function calcAIMove (color: number) {
    state = store.getState()
    gameState = state.gameState
    board = gameState.board
    startIndexes = []
    moveIndexes = []

    let ourUnits = color === 0 ? gameState.board.filter(v => v.type === v.type.toUpperCase()) : gameState.board.filter(v => v.type === v.type.toLowerCase())

    ourUnits.forEach((value) => {
        const pieceColor = value.type === value.type.toUpperCase() ? 0 : 1
        selectedPiece = [value.type, pieceColor, value.index, value.firstMove, value.tile]
        switch (value.type.toUpperCase()) {
            case "P":
                //Determine if white or black piece
                if(pieceColor === 0) {
                    if(value.firstMove === true) {
                        calcMoveNorth(2)
                    } else {
                        calcMoveNorth(1)
                    }
                    calcNorthPawnCapture()
                    
                    break;
                } else {
                    if(value.firstMove === true) {
                        calcMoveSouth(2)
                    } else {
                        calcMoveSouth(1)
                    }
                    calcSouthPawnCapture()
                    
                    break;
                }
                break;
            case "K":
                calcMoveNorth(1)
                calcMoveSouth(1)
                calcMoveWest(1)
                calcMoveEast(1)
    
                calcMoveNorthWest(1)
                calcMoveNorthEast(1)
                calcMoveSouthWest(1)
                calcMoveSouthEast(1)
                
                break;
            case "Q":
                calcMoveNorth(gameState.boardHeight)
                calcMoveSouth(gameState.boardHeight)
                calcMoveWest(gameState.boardWidth)
                calcMoveEast(gameState.boardWidth)
    
                calcMoveNorthWest(gameState.boardHeight)
                calcMoveNorthEast(gameState.boardHeight)
                calcMoveSouthWest(gameState.boardHeight)
                calcMoveSouthEast(gameState.boardHeight)
                
                break;
            case "N":
                calcMoveKnight()
                
                break;
            case "R":
                calcMoveNorth(gameState.boardHeight)
                calcMoveSouth(gameState.boardHeight)
                calcMoveWest(gameState.boardWidth)
                calcMoveEast(gameState.boardWidth)
                
                break;
            case "B":
                calcMoveNorthWest(gameState.boardHeight)
                calcMoveNorthEast(gameState.boardHeight)
                calcMoveSouthWest(gameState.boardHeight)
                calcMoveSouthEast(gameState.boardHeight)
                
                break;
        
            default:
                break;
        }
    })
    console.log(moveIndexes)
    console.log(startIndexes)
    return [startIndexes, moveIndexes]
}

function calcMoveNorth(value: number) {
    for (let i = 1; i < value + 1; i++) {
        console.log("calcN")
        const iteration = i * 6
        const index = selectedPiece[2]

        //Determines if the space is free
        const destinationIndex = gameState.board.findIndex(v => v.index === index - iteration)
        
        if(!gameState.board[destinationIndex]) return
        
        if(gameState.board[destinationIndex].type === "free") {
            startIndexes.push(index - 1)
            moveIndexes.push(index - iteration - 1)
            
        } else {
            const destinationPiece = gameState.board[destinationIndex].type === gameState.board[destinationIndex].type.toUpperCase() ? 0 : 1
            //Determines if the space has a friendly piece on it. Does not allow more iterations
            if(destinationPiece === selectedPiece[1]) {
                i = value + 1
                console.log("1")
            }
            else if(destinationPiece !== selectedPiece[1])
            //Determines if the space has an enemy piece on it. Does not allow more iterations
            {
                if((selectedPiece[0] !== "p" && selectedPiece[0] !== "P")) {
                    startIndexes.push(index - 1)
                    moveIndexes.push(selectedPiece[2] - iteration - 1)
                }
                i = value + 1
            }
        }
    }
}



function calcMoveSouth(value: number) {
    for (let i = 1; i < value + 1; i++) {
        const iteration = i * 6
        const index = selectedPiece[2]
        //Determines if the space is free
        const destinationIndex = gameState.board.findIndex(v => v.index === index + iteration)
        
        if(!gameState.board[destinationIndex]) return

        if(gameState.board[destinationIndex].type === "free") {
            startIndexes.push(index - 1)
            moveIndexes.push(index + iteration - 1)
            
        } else {
            const destinationPiece = gameState.board[destinationIndex].type === gameState.board[destinationIndex].type.toUpperCase() ? 0 : 1
            //Determines if the space has a friendly piece on it. Does not allow more iterations
            if(destinationPiece === selectedPiece[1]) {i = value}
            //Determines if the space has an enemy piece on it. Does not allow more iterations
            else if(destinationPiece !== selectedPiece[1]) {
                if((selectedPiece[0] !== "p" && selectedPiece[0] !== "P")) {
                    startIndexes.push(index - 1)
                    moveIndexes.push(selectedPiece[2] + iteration - 1)
                }
                i = value
            }
        }
    }
}

function calcMoveWest(value: number) {
    for (let i = 1; i < value + 1; i++) {
        const iteration = i * 1
        const index = selectedPiece[2]

        //Determines if the space is free
        const destinationIndex = gameState.board.findIndex(v => v.index === index - iteration)
        
        if(!gameState.board[destinationIndex]) return
        if(gameState.board[destinationIndex].tile > selectedPiece[4]) return
        
        if(gameState.board[destinationIndex].type === "free") {
            startIndexes.push(index - 1)
            moveIndexes.push(index - iteration - 1)
            
        } else {
            const destinationPiece = gameState.board[destinationIndex].type === gameState.board[destinationIndex].type.toUpperCase() ? 0 : 1
            //Determines if the space has a friendly piece on it. Does not allow more iterations
            if(destinationPiece === selectedPiece[1]) {i = value}
            //Determines if the space has an enemy piece on it. Does not allow more iterations
            if(destinationPiece !== selectedPiece[1]) {
                startIndexes.push(index- 1)
                moveIndexes.push(selectedPiece[2] - iteration - 1)
                i = value
            }
        }
    }
}

function calcMoveEast(value: number) {
    for (let i = 1; i < value + 1; i++) {
        const iteration = i * 1
        const index = selectedPiece[2]
        
        //Determines if the space is free
        const destinationIndex = gameState.board.findIndex(v => v.index === index + iteration)
        
        if(!gameState.board[destinationIndex]) return
        if(gameState.board[destinationIndex].tile < selectedPiece[4]) return
        
        if(gameState.board[destinationIndex].type === "free") {
            startIndexes.push(index- 1)
            moveIndexes.push(index + iteration - 1)
            
        } else {
            const destinationPiece = gameState.board[destinationIndex].type === gameState.board[destinationIndex].type.toUpperCase() ? 0 : 1
            //Determines if the space has a friendly piece on it. Does not allow more iterations
            if(destinationPiece === selectedPiece[1]) {i = value}
            //Determines if the space has an enemy piece on it. Does not allow more iterations
            if(destinationPiece !== selectedPiece[1]) {
                startIndexes.push(index- 1)
                moveIndexes.push(selectedPiece[2] + iteration - 1)
                i = value
            }
        }
    }
}

function calcMoveNorthWest(value: number) {
    for (let i = 1; i < value + 1; i++) {
        const iteration = i * 7
        const index = selectedPiece[2]
        
        //Determines if the space is free
        const destinationIndex = gameState.board.findIndex(v => v.index === index - iteration)
        
        if(!gameState.board[destinationIndex]) return
        if(gameState.board[destinationIndex].tile > selectedPiece[4]) return
        
        if(gameState.board[destinationIndex].type === "free") {
            startIndexes.push(index - 1)
            moveIndexes.push(index - iteration -1)
            
        } else {
            const destinationPiece = gameState.board[destinationIndex].type === gameState.board[destinationIndex].type.toUpperCase() ? 0 : 1
            //Determines if the space has a friendly piece on it. Does not allow more iterations
            if(destinationPiece === selectedPiece[1]) {i = value}
            //Determines if the space has an enemy piece on it. Does not allow more iterations
            if(destinationPiece !== selectedPiece[1]) {
                startIndexes.push(index - 1)
                moveIndexes.push(selectedPiece[2] - iteration -1)
                i = value
            }
        }
    }
}

function calcMoveNorthEast(value: number) {
    for (let i = 1; i < value + 1; i++) {
        const iteration = i * 5
        const index = selectedPiece[2]
        
        //Determines if the space is free
        const destinationIndex = gameState.board.findIndex(v => v.index === index - iteration)
        
        if(!gameState.board[destinationIndex]) return
        if(gameState.board[destinationIndex].tile[0] < selectedPiece[4][0] || gameState.board[destinationIndex].tile[1] > selectedPiece[4][1]) return
        
        if(gameState.board[destinationIndex].type === "free") {
            startIndexes.push(index - 1)
            moveIndexes.push(index - iteration -1)
            
        } else {
            const destinationPiece = gameState.board[destinationIndex].type === gameState.board[destinationIndex].type.toUpperCase() ? 0 : 1
            //Determines if the space has a friendly piece on it. Does not allow more iterations
            if(destinationPiece === selectedPiece[1]) {i = value}
            //Determines if the space has an enemy piece on it. Does not allow more iterations
            if(destinationPiece !== selectedPiece[1]) {
                startIndexes.push(index - 1)
                moveIndexes.push(selectedPiece[2] - iteration -1)
                i = value
            }
        }
    }
}

function calcMoveSouthWest(value: number) {
    for (let i = 1; i < value + 1; i++) {
        const iteration = i * 5
        const index = selectedPiece[2]
        
        //Determines if the space is free
        const destinationIndex = gameState.board.findIndex(v => v.index === index + iteration)

        if(!gameState.board[destinationIndex]) return
        if(gameState.board[destinationIndex].tile > selectedPiece[4]) return
        
        if(gameState.board[destinationIndex].type === "free") {
            startIndexes.push(index - 1)
            moveIndexes.push(index + iteration -1)
            
        } else {
            const destinationPiece = gameState.board[destinationIndex].type === gameState.board[destinationIndex].type.toUpperCase() ? 0 : 1
            //Determines if the space has a friendly piece on it. Does not allow more iterations
            if(destinationPiece === selectedPiece[1]) {i = value}
            //Determines if the space has an enemy piece on it. Does not allow more iterations
            if(destinationPiece !== selectedPiece[1]) {
                startIndexes.push(index - 1)
                moveIndexes.push(selectedPiece[2] + iteration -1)
                i = value
            }
        }
    }
}

function calcMoveSouthEast(value: number) {
    for (let i = 1; i < value + 1; i++) {
        const iteration = i * 7
        const index = selectedPiece[2]
        
        //Determines if the space is free
        const destinationIndex = gameState.board.findIndex(v => v.index === index + iteration)
        if(!gameState.board[destinationIndex]) return
        if(gameState.board[destinationIndex].tile < selectedPiece[4]) return
        
        if(gameState.board[destinationIndex].type === "free") {
            startIndexes.push(index - 1)
            moveIndexes.push(index + iteration -1)
            
        } else {
            const destinationPiece = gameState.board[destinationIndex].type === gameState.board[destinationIndex].type.toUpperCase() ? 0 : 1
            //Determines if the space has a friendly piece on it. Does not allow more iterations
            if(destinationPiece === selectedPiece[1]) {i = value}
            //Determines if the space has an enemy piece on it. Does not allow more iterations
            if(destinationPiece !== selectedPiece[1]) {
                startIndexes.push(index - 1)
                moveIndexes.push(selectedPiece[2] + iteration -1)
                i = value
            }
        }
    }
}

//knight specific movements
function calcMoveKnight() {

}

//Pawn Specific Move Calculator
function calcNorthPawnCapture() {
    
        const index = selectedPiece[2]

        const northEastDestIndex = gameState.board.findIndex(v => v.index === index - 5)
        const northWestDestIndex = gameState.board.findIndex(v => v.index === index - 7)

        const destinationNEPiece = gameState.board[northEastDestIndex].type === gameState.board[northEastDestIndex].type.toUpperCase() ? 0 : 1
        if (destinationNEPiece !== selectedPiece[1] && gameState.board[northEastDestIndex].type !== "free") {
            startIndexes.push(index - 1)
            moveIndexes.push(index - 6)
        }

        const destinationNWPiece = gameState.board[northWestDestIndex].type === gameState.board[northWestDestIndex].type.toUpperCase() ? 0 : 1
        if (destinationNWPiece !== selectedPiece[1] && gameState.board[northWestDestIndex].type !== "free") {
            startIndexes.push(index - 1)
            moveIndexes.push(index - 8)
        }
    
}

function calcSouthPawnCapture() {
    
    const index = selectedPiece[2]

    const southEastDestIndex = gameState.board.findIndex(v => v.index === index + 7)
    const southWestDestIndex = gameState.board.findIndex(v => v.index === index + 5)

    

    const destinationSEPiece = gameState.board[southEastDestIndex].type === gameState.board[southEastDestIndex].type.toUpperCase() ? 0 : 1
    if (destinationSEPiece !== selectedPiece[1] && gameState.board[southEastDestIndex].type !== "free") {
        startIndexes.push(index - 1)
        moveIndexes.push(index + 6)
    }
    
    const destinationSWPiece = gameState.board[southWestDestIndex].type === gameState.board[southWestDestIndex].type.toUpperCase() ? 0 : 1
    console.log(index + 7)
    if (destinationSWPiece !== selectedPiece[1]  && gameState.board[southWestDestIndex].type !== "free") {
        startIndexes.push(index - 1)
        moveIndexes.push(index + 4)
    }

}