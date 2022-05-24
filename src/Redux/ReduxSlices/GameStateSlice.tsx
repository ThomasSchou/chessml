import { createSlice } from '@reduxjs/toolkit'

import { Tile } from '../../Models/Tile'

interface gameState {
  gameID: number,
  gameType: number,
  boardHeight: number,
  boardWidth: number,
  board: Tile[],
  turn: number,
  colorTurn: number,
  selectedPiece: any[],
  status: number,
  destination: number,
  
}

const initialState = { gameType: 0 } as gameState



const GameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setGameType: (state, action) => {
      state.gameType = action.payload
    },
    setGameState: (state, action) => {
      state.gameID = action.payload.gameID
      state.boardHeight = action.payload.height
      state.boardWidth = action.payload.width
      state.board = action.payload.board
      state.turn = action.payload.turn
      state.colorTurn = 0
      
    },
    selectPiece(state, action) {
      let tile = state.board.find(v => v.index === action.payload)
      if(tile?.type === "free" || state.status === 1) {return}
      state.selectedPiece = [
        tile?.type,
        tile?.type === tile?.type.toUpperCase() ? 0 : 1,
        action.payload,
        tile?.firstMove,
        tile?.tile
        
      ]
      
    },

    deselectPiece(state) {
      state.selectedPiece = [undefined]
      
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setDestination: (state, action) => {
      state.destination = action.payload
    },
    moveUnit: (state, action) => {
      //Get the indexes of the tiles of the current location of the piece and the destination of the piece.
      let currentIndex = state.board.findIndex(v => v.index === state.selectedPiece[2])
      let destIndex = state.board.findIndex(v => v.index === action.payload)
      
      
      //Applies the changes to the board state
      state.board[currentIndex].type = "free"
      state.board[destIndex].type = state.selectedPiece[0]
      state.board[destIndex].firstMove = false

    },
    highlight: (state, action) => {
      console.log(action.payload)
      let board = state.board
      action.payload.forEach(function(value: any) {
        board[value].highlight = 1;
      });
      state.board = board

    },
    deHighlight: (state, ) => {
      
      let board = state.board
      for (let index = 0; index < board.length; index++) {
        board[index].highlight = 0;
      }
      state.board = board
    },
    transformPawn: (state, action) => {
      const targetIndex = state.board.findIndex(v => v.index === action.payload)
      const color = state.board[targetIndex].type === state.board[targetIndex].type.toUpperCase() ? 0 : 1
      state.board[targetIndex].type = color === 0 ? "Q" : "q"
    },
    setColorTurn: (state) => {
      //colorTurn 0 is white, 1 is black
      if(state.colorTurn === 0) {state.colorTurn = 1} else {
        state.colorTurn = 0
        state.turn++
      }
      
    }
    

  },
})

export const { setGameState, setGameType, selectPiece, deselectPiece, setStatus, setDestination, moveUnit, highlight, deHighlight, transformPawn, setColorTurn } = GameStateSlice.actions
export default GameStateSlice.reducer