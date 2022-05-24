import { useDispatch, useSelector } from "react-redux";
import { Tile } from "../Models/Tile";
import { store } from "../Redux/store";
import { setColorTurn, setGameState, setStatus } from "../Redux/ReduxSlices/GameStateSlice";
import { ReadFen } from "./FenReader";

export function Setup (gameID: number) {

    const state = store.getState()
    const settings = state.settings

    const dispatch = useDispatch()

    //Create the board tiles
    const tiles = []

    let index: number = 0

    for (let file = 1; file < settings.boardHeight+1; file++) {
        for (let rank = 1; rank < settings.boardHeight+1; rank++) {

            index += 1

            let isLightTile: boolean = (file + rank +1) % 2 !== 0
      
            console.log ("Block statement execution no." + file + ' ' + rank + ' ' + isLightTile);
    
            let currentIndex = index

            let tile: Tile = {
                tile: [rank, file],
                index: currentIndex,
                type: "free",
                color: isLightTile ? 0 : 1,
                highlight: 0,
                firstMove: true
            }

            tiles.push(tile)

            console.dir(tiles)
    }
  }

  let tileData: Tile[] = []
  tiles.forEach(function (value){
    value.type = ReadFen(value.tile[0], value.tile[1])
    let tile: Tile = {
      tile: value.tile,
      index: value.index,
      type: value.type,
      color: value.color,
      highlight: value.highlight,
      firstMove: true
    }
    tileData.push(tile)

  })
  console.log(tileData)
  let data = {
    gameID: gameID,
    height: settings.boardHeight,
    width: settings.boardWidth,
    board : tileData,
    turn: 1
  }
  
  dispatch(setGameState(data))
  
  dispatch(setStatus(0))

}