
let fenString: String = "rbqkbr/pppppp/6/6/PPPPPP/RBQKBR"


export function ReadFen(rank: Number, file: Number) {
    let sliced = fenString.split("/")

    let currentRank = 1
    let piece = "free"

    for (var i = 0; i < sliced[file.valueOf() - 1].length; i++) {

        if(rank === currentRank) {
            if(parseInt(sliced[file.valueOf() - 1].charAt(i))) {break;}

            piece = sliced[file.valueOf() - 1].charAt(i)
            break;
        }
        
        if(parseInt(sliced[file.valueOf() - 1].charAt(i))) {currentRank += parseInt(sliced[file.valueOf() - 1].charAt(i))} else {currentRank++}
      }
    console.log('piece at' + rank + ',' + file + ' is ' + piece)
    return piece
}