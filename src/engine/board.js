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
        return this.isValid(square) && this.getPiece(square).getPlayer != player;
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

    getHorizontalBounds(square, player){
        const row = square.row;
        const col = square.col;
        let leftEnd = 0, rightEnd = this.board.length - 1;
        for(let i = 0; i < this.board.length; i++){
            if(!!this.board[row][i]){
                if(this.board[row][i].getPlayer === player){
                    if(i > col){
                        rightEnd = i-1;
                        break;
                    }else if (i != col){
                        leftEnd = i + 1;
                    }
                }else{
                    if(i > col){
                        rightEnd = i;
                        break;
                    }else if (i != col){
                        leftEnd = i;
                    }
                }
            }
        }
        return [leftEnd,rightEnd];
    }

    getVerticalBounds(square, player){
        const row = square.row;
        const col = square.col;
        let bottomEnd = 0, topEnd = this.board[0].length - 1;
        for(let i = 0; i < this.board[0].length; i++){
            if(!!this.board[i][col]){
                if(this.board[i][col].getPlayer === player){
                    if(i > row){
                        topEnd = i-1;
                        break;
                    }else if (i != row){
                        bottomEnd = i + 1;
                    }
                }else{
                    if(i > row){
                        topEnd = i;
                        break;
                    }else if (i != row){
                        bottomEnd = i;
                    }
                }
            }
        }
        return [bottomEnd, topEnd];
    }

    getHorizontalSquaresBetween(leftEnd, rightEnd, row){
        let horizSquares = [];
        for(let i = leftEnd; i <= rightEnd; i++){
            horizSquares.push(Square.at(row,i));
        }
        return horizSquares;
    }

    getVerticalSquaresBetween(bottomEnd, topEnd, col){
        let vertSquares = [];
        for(let i = bottomEnd; i <= topEnd; i++){
            vertSquares.push(Square.at(i,col));
        }
        return vertSquares;
    }
    
    getUpDiagonalBounds(square,player){
        let bottomEnd = 0, topEnd = Math.min(this.board.length, this.board[0].length);
        const col = square.col, row = square.row;
        const startRow = row - Math.min(row,col), 
            startCol = col -  Math.min(row,col);
        for(let i = 0; i < topEnd; i ++){
            if(!this.isValid(Square.at(startRow+i,startCol+i))){
                topEnd = i-1;
                break;
            }
            if(!!this.board[startRow + i][startCol + i]){
                if(this.board[startRow + i][startCol + i].getPlayer === player){
                    if(startRow + i > row){
                        topEnd = i-1;
                        break;
                    }else if (i != row){
                        bottomEnd = i + 1;
                    }
                }else{
                    if(i > row){
                        topEnd = i;
                        break;
                    }else if (i != row){
                        bottomEnd = i;
                    }
                }
            }
        }
        return [bottomEnd, topEnd];
    }

    getDownDiagonalBounds(square, player){

        const col = square.col, row = square.row;
        let counter = 1;
        while((true)){
            if(!this.isValid(Square.at(row + counter, col - counter))){
                break;
            }
            const current = this.board[row + counter][col - counter];
            if(!!current){
                if(current.getPlayer == player){
                    break;
                }else{
                    counter++;
                    break;
                }
            }
            counter++;
        }
        const leftEnd = row + counter - 1;
        counter = 1;
        while((true)){
            if(!this.isValid(Square.at(row - counter, col + counter))){
                break;
            }
            const current = this.board[row - counter][col + counter];
            if(!!current){
                if(current.getPlayer == player){
                    break;
                }else{
                    counter++;
                    break;
                }
            }
            counter++;
         }
        const rightEnd = row - counter + 1;
        return [leftEnd, rightEnd];
    }

    getDiagonalMoves(square,player){
        let diagSquares = [];
        const upDiagonal = this.getUpDiagonalBounds(square, player);
        const col = square.col, row = square.row;
        const startRow = row - Math.min(row,col), 
            startCol = col -  Math.min(row,col);
        for(let i = upDiagonal[0]; i <= upDiagonal[1]; i++){
            if(i != row){
                diagSquares.push(Square.at(startRow + i, startCol + i));
            }
        }
        const downDiagonal = this.getDownDiagonalBounds(square, player);
        for(let i = downDiagonal[0]; i >= downDiagonal[1]; i--){
            if(i != row){
                diagSquares.push(Square.at(i, row + col - i));
            }
        }
        return diagSquares;
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

    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }
}
