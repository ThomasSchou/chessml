export function ReverseBitBoard(bitboard: [number]) {
    
    let tempBoard: number[] = []

    bitboard.forEach(element => {
        tempBoard.push(element - (element * 2))
    });

    return tempBoard
    
}