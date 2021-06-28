import Piece from './piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const currPiece = board.findPiece(this);
        return board.getHorizontalSquares(currPiece,this.player)
            .concat(board.getVerticalSquares(currPiece,this.player))
            .concat(board.getUpDiagonalSquares(currPiece,this.player))
            .concat(board.getDownDiagonalSquares(currPiece,this.player));
    }
}
