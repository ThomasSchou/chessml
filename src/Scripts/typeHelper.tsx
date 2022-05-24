import {white_king, white_queen, white_bishop, white_knight, white_pawn, white_rook, black_king, black_queen, black_bishop, black_knight, black_rook, black_pawn} from '../Art/index'

export function typeHelper(value: string) {
    switch (value) {

        //White units
        case "K":
            return white_king
            break;
        case "Q":
            return white_queen
            break;
        case "R":
            return white_rook
            break;
        case "B":
            return white_bishop
            break;
        case "N":
            return white_knight
            break;
        case "P":
            return white_pawn
            break;

        //Black Units
        case "k":
            return black_king
            break;
        case "q":
            return black_queen
            break;
        case "r":
            return black_rook
            break;
        case "b":
            return black_bishop
            break;
        case "n":
            return black_knight
            break;
        case "p":
            return black_pawn
            break;
  
        default:
          break;
      }
}