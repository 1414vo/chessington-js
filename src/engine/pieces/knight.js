import Piece from './piece';
import Square from '../square'
export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let availableMoves = [];
        const currentSquare = board.findPiece(this), row = currentSquare.row, col = currentSquare.col;
        for(let i of [-2,2]){
            for(let j of [-1,1]){
                if(board.isValidAndEmpty(Square.at(row+i,col+j)) 
                || board.isValidAndCapturable(Square.at(row + i, col + j),this.player)){
                    availableMoves.push(Square.at(row+i,col+j));
                }
                if(board.isValidAndEmpty(Square.at(row+j,col+i))
                || board.isValidAndCapturable(Square.at(row + i, col + j),this.player)){
                    availableMoves.push(Square.at(row+j,col+i));
                }
            }
        }
        return availableMoves;
    }
}
