import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';

export default class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
    isValid(square){
        return square.col >= 0 && square.col < this.board.length
        && square.row >= 0 && square.row < this.board.length
    }
    isValidAndCapturable(square, player){
        return this.isValid(square) && !!this.board[square.row][square.col] && this.getPiece(square).getPlayer != player;
    }
    isValidAndEmpty(square){
        return this.isValid(square) && !this.board[square.row][square.col];
    }
    setPiece(square, piece) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square) {
        return this.board[square.row][square.col];
    }
    findPiece(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }
    getSquaresInDirection(square, player, topShift, rightShift){
        let squareList = [];
        let shift = 1;
        const col = square.col, row = square.row;
        while(this.isValidAndEmpty(Square.at(row + shift*topShift, col + shift*rightShift))){
            squareList.push(Square.at(row + shift*topShift, col + shift*rightShift));
            shift++;
        }
        if(this.isValidAndCapturable(Square.at(row + shift*topShift, col + shift*rightShift), player)){
            squareList.push(Square.at(row + shift*topShift, col + shift*rightShift));
        }
        return squareList;
    }
    getTopSquares(square, player){
        return this.getSquaresInDirection(square, player, 1, 0);
    }
    getBottomSquares(square, player){
        return this.getSquaresInDirection(square, player, -1, 0);
    }
    getRightSquares(square, player){
        return this.getSquaresInDirection(square, player, 0, 1);
    }
    getLeftSquares(square, player){
        return this.getSquaresInDirection(square, player, 0, -1);
    }
    getTopRightSquares(square, player){
        return this.getSquaresInDirection(square, player, 1, 1);
    }
    getTopLeftSquares(square, player){
        return this.getSquaresInDirection(square, player, 1, -1);
    }
    getBottomRightSquares(square, player){
        return this.getSquaresInDirection(square, player, -1, 1);
    }
    getBottomLeftSquares(square, player){
        return this.getSquaresInDirection(square, player, -1, -1);
    }
    getHorizontalSquares(square, player){
        return this.getRightSquares(square,player).concat(this.getLeftSquares(square,player));
    }
    getVerticalSquares(square, player){
        return this.getTopSquares(square, player).concat(this.getBottomSquares(square,player));
    }
    getUpDiagonalSquares(square,player){
        return this.getTopRightSquares(square,player).concat(this.getBottomLeftSquares(square,player));
    }
    getDownDiagonalSquares(square,player){
        return this.getTopLeftSquares(square,player).concat(this.getBottomRightSquares(square,player));
    }
    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }
}
