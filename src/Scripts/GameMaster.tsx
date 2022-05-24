import { useDispatch } from "react-redux";
import { deHighlight, deselectPiece, moveUnit, selectPiece, setColorTurn, setDestination, setStatus, transformPawn } from "../Redux/ReduxSlices/GameStateSlice";
import { store } from "../Redux/store";
import { move_sound } from "../Audio/index"
import { calcAIMove, calcMove } from "./MoveCalculator";
import { Model } from "./ML/Model";
import { predictBoard } from "./ML/calcBoard";
import { blackUnitsToTensor, combineTensor, whiteUnitsToTensor } from "./ML/TensorHelper";
import { tensor, Tensor } from "@tensorflow/tfjs";
import { Memory } from "./memory";
import { BoardToBitBoard } from "./BoardToBitBoard";
import { CalculateReward } from "./CalculateReward";
import { ReverseBitBoard } from "./ReverseBitBoard";



let state = store.getState()
let gameState = state.gameState

let currentStatus = gameState.status
let currentTurn = gameState.colorTurn

var moveVFX = new Audio(move_sound);

export function startGame () {

  state = store.getState()
  gameState = state.gameState

    console.log("Game Started")
    switch (gameState.gameType) {
      
      //Player vs. Player (local)
      case 0:
        console.log(gameState.gameType)
        console.log("gametype = pvp")
        store.subscribe(() => {
          state = store.getState()
          
          gameState = state.gameState
          if(currentStatus !== gameState.status) {
            currentStatus = gameState.status
            if(gameState.status === 1) {calcMove()}
            if(gameState.status === 2 && gameState.destination !== null) {movePiece(gameState.destination)}
            if(gameState.status === 0) {
              checkPawn()
              checkKing()
            }
          }
          
        })
        break;
    
      //Player vs. AI (local)
      case 1:

        console.log("gametype = pvai")

        const model = new Model(5, 3, 1, 5)
        let memory = new Memory()

        store.subscribe(() => {
          state = store.getState()
          
          gameState = state.gameState

          if(currentStatus !== gameState.status || currentTurn !== gameState.colorTurn) {
            currentStatus = gameState.status
            currentTurn = gameState.colorTurn
            if(gameState.colorTurn === 0) {
              if(gameState.status === 1) {calcMove()}
              if(gameState.status === 2 && gameState.destination !== null) {movePiece(gameState.destination)}
              if(gameState.status === 0) {
                checkPawn()
                checkKing()
              }
            } else {
              console.log("ai turn")

              checkPawn()
              checkKing()

              if(gameState.status === 4) {
                
              }
              if(gameState.status === 0) {

                
                const legalMoves = calcAIMove(1)

                console.log(legalMoves)

                const desiredMove = model.PredictBestMove(legalMoves, false)
                aiMovePiece(desiredMove![0] + 1, desiredMove![1] + 1)
                
                //Save state and reward from both sides to memory
                const bitBoard = BoardToBitBoard()
                const reversedBitBoard = ReverseBitBoard(bitBoard as [number])
                
                memory.addToMemory(bitBoard, CalculateReward(bitBoard))
                memory.addToMemory(reversedBitBoard, CalculateReward(reversedBitBoard))

              }

            }
          }
          
        })
        break;

      //AI vs. AI (local)
      case 2:
        console.log("gametype = aivai")

        break;

      default:
        break;
    }
    

}



function movePiece (destinationIndex: number) {
  
  store.dispatch(moveUnit(destinationIndex))
  store.dispatch(setDestination(null))
  store.dispatch(deselectPiece())
  store.dispatch(deHighlight())
  store.dispatch(setColorTurn())
  store.dispatch(setStatus(0))
  moveVFX.play()
}

function aiMovePiece (currentIndex: number, destinationIndex: number) {
  
  store.dispatch(selectPiece(currentIndex))
  store.dispatch(moveUnit(destinationIndex))
  store.dispatch(setDestination(null))
  store.dispatch(deselectPiece())
  store.dispatch(setColorTurn())
  store.dispatch(setStatus(0))
  moveVFX.play()
}

function checkPawn() {
  let pawns = gameState.board.filter(v => v.type.toLowerCase() === "p")
  pawns.forEach(function(value: any) {
    if(value.tile[1] === 1 || value.tile[1] === 6) {
      store.dispatch(transformPawn(value.index))
    } 
  });
}

function checkKing() {
  let kings = gameState.board.filter(v => v.type.toLowerCase() === "k")
  if(!kings.find(v => v.type === "k")) {
    console.log("white won")
    store.dispatch(setStatus(3))
  } else if(!kings.find(v => v.type === "K")) {
    console.log("black won")
    store.dispatch(setStatus(3))
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}