import Piece from './piece';
import Player from '../player';
import Square from '../square';
export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let availableMoves = [];
        const currentSquare = board.findPiece(this);
        if(this.player == Player.WHITE 
            && board.isValidAndEmpty(Square.at(currentSquare.row + 1,currentSquare.col))){

            if(currentSquare.row == 1
                && board.isValidAndEmpty(Square.at(currentSquare.row + 2,currentSquare.col))){

                availableMoves.push(Square.at(currentSquare.row + 2,currentSquare.col));  
            }

            availableMoves.push(Square.at(currentSquare.row + 1,currentSquare.col));
        }
        if(this.player == Player.BLACK 
            && board.isValidAndEmpty(Square.at(currentSquare.row - 1,currentSquare.col))){

            if(currentSquare.row == 6
                && board.isValidAndEmpty(Square.at(currentSquare.row - 2,currentSquare.col))){
                availableMoves.push(Square.at(currentSquare.row - 2,currentSquare.col));  
            }

            availableMoves.push(Square.at(currentSquare.row - 1,currentSquare.col));
        }
        return availableMoves;
    }
}
