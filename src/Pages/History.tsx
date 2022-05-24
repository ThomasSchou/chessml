import React, { Component } from 'react'
import { store } from '../Redux/store'

const History = () => {
    let state = store.getState()
    let gamestate = state.gameState
    
    store.subscribe(() => {
        state = store.getState()
        gamestate = state.gameState
    })
  
    return (
      <div>{gamestate.turn}</div>
    )
  
}

export default History
