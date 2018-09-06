'use strict';

function initBoard() {
    
    var x = 0;
    var y = 0;

    var blockCol = 0;
    var blockRow = 0;

    for (blockRow = 0; blockRow < 8; blockRow++) {
        for (blockCol = 0; blockCol < 8; blockCol++) {
            x = blockCol * gridSquareSize;
            y = blockRow * gridSquareSize;

            gridArrayX[row[blockRow] + blockCol] = x; // array name[index] = x associaticve array
            gridArrayY[row[blockRow] + blockCol] = y; // array name[index] = y

            boardGridArray[blockRow][blockCol] = row[blockRow] + blockCol;
            
            ctx.fillStyle = [chessBoardSquareA, chessBoardSquareB][(blockRow + blockCol) % 2];
            ctx.fillRect(blockCol * gridSquareSize, blockRow * gridSquareSize, gridSquareSize, gridSquareSize);
        } 
    }
}

function initChessPiecesOnBoard() {

    for (var i = 0; i < piecesArray.length; i++) {   
        if (piecesArray[i].CAPTURED !== true) {
            gridStatus[boardGridArray[piecesArray[i].col][piecesArray[i].row]] = true;

            ctx2.fillStyle =  piecesArray[i].colour;
            ctx2.fillRect(gridArrayX[boardGridArray[piecesArray[i].col][piecesArray[i].row]] + 12.5, gridArrayY[boardGridArray[piecesArray[i].col][piecesArray[i].row]] + 12.5, 50, 50)

            ctx2.fillStyle = textColour;
            ctx2.font = "bold 10px Arial";
            ctx2.fillText(piecesArray[i].type, gridArrayX[boardGridArray[piecesArray[i].col][piecesArray[i].row]] + 15, gridArrayY[boardGridArray[piecesArray[i].col][piecesArray[i].row]] + 30);
        }
    }
}

initBoard();
initChessPiecesOnBoard();