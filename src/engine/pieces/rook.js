import Player from '../player';
import Piece from './piece';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const currPiece = board.findPiece(this);
        return board.getHorizontalSquares(currPiece,this.player)
            .concat(board.getVerticalSquares(currPiece,this.player));
    }

    
}
