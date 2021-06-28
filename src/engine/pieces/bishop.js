import Piece from './piece';
export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        return board.getDiagonalMoves(board.findPiece(this),this.player);
    }
}
