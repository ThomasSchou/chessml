import { connect, useDispatch } from 'react-redux'
import React, { Component, MouseEvent, ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CSS from 'csstype';
import {white_king, white_queen, white_bishop, white_knight, white_pawn, white_rook, black_king, black_queen, black_bishop, black_knight, black_rook, black_pawn} from '../Art/index'
import { store } from '../Redux/store';
import { Setup } from '../Scripts/GameSetup';
import { typeHelper } from '../Scripts/typeHelper';
import { deHighlight, deselectPiece, selectPiece, setDestination, setGameType, setStatus } from '../Redux/ReduxSlices/GameStateSlice';
import { useParams } from 'react-router-dom';
import { startGame } from '../Scripts/GameMaster';



const Chess = () => {
  const dispatch = useDispatch()
  const { gameID, gameType } = useParams()
  let state = store.getState()
  let settings = state.settings
  let gameState = state.gameState
  const [rerender , setRerender] = useState(false);
  
  const currentStatus = gameState.status

  console.log("start of scrip")
  store.subscribe(() => {
    state = store.getState()

    gameState = state.gameState
    if(currentStatus !== gameState.status) {

      setRerender(!rerender)
    }
  })

  const gameTypeInt = (parseInt(gameType as string))
  if(gameTypeInt !== gameState.gameType || gameState.gameType === null){
    console.log("Setting game type")
    dispatch(setGameType(gameTypeInt))
  }

  const gameIntID = (parseInt(gameID as string))

  if(gameIntID !== gameState.gameID || gameState.gameID === null){
    console.log("Setting up game")
    Setup(gameIntID)
    startGame()
  }




  //Generate HTML
  const renderedTiles: ReactElement[] = []
  let board = gameState.board
  
  board.forEach(function(value) {
      let imgsrc = typeHelper(value.type)

      let classes = value.color === 0 ? "whiteTile" : "blackTile"
      classes += value.highlight === 1 ? " highlight" : ""
      renderedTiles.push(React.createElement(
        "div",
        {
          key: value.index,
          onClick: ()=> {click(value.index)},
          className: classes,
        },
        imgsrc ?
        <img src={imgsrc} alt="tile" height="100px" width="100px"></img> : null
        ))
  })

  const selected = undefined

  function click(index: number) {
    const tile = gameState.board.find(v => v.index === index)
    const pieceColor = tile?.type === tile?.type.toUpperCase() ? 0 : 1

    
      if((gameState.status === 0 || gameState.status === null) && tile?.type !== "free" && pieceColor === gameState.colorTurn) {
        dispatch(selectPiece(index))
        dispatch(setStatus(1))
      } else if(gameState.status === 1 && gameState.board.find(v => v.index === index)?.highlight === 1){
        dispatch(setDestination(index))
        dispatch(setStatus(2))
      }
    

  }

  //listen for right click
  const onContext = (event: React.MouseEvent<HTMLDivElement>) => {
    // Disable the default context menu
    event.preventDefault();
    console.log(gameState.status)
    
      dispatch(deselectPiece())
      dispatch(setStatus(0))
      dispatch(deHighlight())
    
  }

  const gridSettings: CSS.Properties = {
    gridTemplateColumns: 'repeat(' + settings.boardHeight + ', 100px)',
    gridTemplateRows: 'repeat(' + settings.boardWidth + ', 100px)'
  }
    return (
      <div>
          <div className='chessboard' onContextMenu={onContext} style={gridSettings}>
              {renderedTiles}
          </div>
        </div>
    )
}

export default Chess
