import Piece from './piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let availableMoves = [];
        const currentSquare = board.findPiece(this);
        const horizBounds = board.getHorizontalBounds(currentSquare, this.player);
        const vertBounds = board.getVerticalBounds(currentSquare, this.player);
        availableMoves = availableMoves.concat(
            board.getHorizontalSquaresBetween(
                horizBounds[0], horizBounds[1], currentSquare.row)
                .filter(x => !x.equals(currentSquare)));
        availableMoves = availableMoves.concat(
            board.getVerticalSquaresBetween(
                vertBounds[0], vertBounds[1], currentSquare.col)
                .filter(x => !x.equals(currentSquare)));
        return availableMoves.concat(board.getDiagonalMoves(currentSquare,this.player));
    }
}
