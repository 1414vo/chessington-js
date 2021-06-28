import Piece from './piece';
import Square from '../square';
export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let availableMoves = [];
        const currentSquare = board.findPiece(this), row = currentSquare.row, col = currentSquare.col;
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(i!=0 || j != 0){
                    if(board.isValidAndEmpty(Square.at(row + i, col + j)) ||
                    board.isValidAndCapturable(Square.at(row + i, col + j),this.player)){
                        availableMoves.push(Square.at(row + i, col + j));
                    }
                }
            } 
        }
        return availableMoves;
    }
}
