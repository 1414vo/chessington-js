import Piece from './piece';
export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const currPiece = board.findPiece(this);
        return board.getUpDiagonalSquares(currPiece,this.player)
            .concat(board.getDownDiagonalSquares(currPiece,this.player));
    }
}
