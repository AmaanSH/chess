'use strict';

hightlightCanvas.addEventListener('click', mousePos, true);

function mousePos(event) {
    clickPosX = event.clientX - chessCanvas.offsetLeft;
    clickPosY = event.clientY - chessCanvas.offsetTop;
    
    clickPosX = Math.floor(clickPosX / gridSquareSize);
    clickPosY = Math.floor(clickPosY / gridSquareSize);

    clickPosX = clickPosX * gridSquareSize;
    clickPosY = clickPosY * gridSquareSize;

    mouse.x = clickPosX
    mouse.y = clickPosY

    if (pieceClicked == false)  {
        pieceClicked = getPieceClicked();

        if (pieceClicked != null) {
            showPieceInfo();
            getMovementParameters(pieceClicked);
            if (getMovementParameters(pieceClicked) !== null){
                highlightPlacesToMove();
            }
        } else {
            pieceClicked = false;
        }
    } else {
       movePiece(pieceClicked, clickPosX, clickPosY);
       ctx3.clearRect(0, 0, hightlightCanvas.width, hightlightCanvas.height)

        pieceClicked = false;
        clearPieceInfoText();
    }
}

function getPieceClicked() {
    for (var i = 0; i < piecesArray.length; i++) {
        // checks to see if the mouseX position matches with the index stated in the piecesArray 
        if (mouse.x >= gridArrayX[boardGridArray[piecesArray[i].col][piecesArray[i].row]] && mouse.x <= gridArrayX[boardGridArray[piecesArray[i].col][piecesArray[i].row]]) {
            // checks to see if the mouseY position matches with the index in the pieces array
            if (mouse.y >= gridArrayY[boardGridArray[piecesArray[i].col][piecesArray[i].row]] && mouse.y <= gridArrayY[boardGridArray[piecesArray[i].col][piecesArray[i].row]]){
                console.log('Piece: ' + piecesArray[i].id + ' Pos: ' + boardGridArray[piecesArray[i].col][piecesArray[i].row] + ' Team1: ' + piecesArray[i].team1)
                return piecesArray[i]
            }
        }
    }
}

function addAllMovesForPieceToArray(piece) {
    var posX = clickPosX / gridSquareSize;
    var posY = clickPosY / gridSquareSize;

    var moveParams = piece.movement();
    var allMovesForPiece = [];

    // gets index of the piececlick col inside of row array
    var rowType = piece.col;

    if (piece.team1) {
        for (var down = 0; down < moveParams.down; down++) {
            if (piece.F_TURN) {
                moveParams.down = 3;
            }
            allMovesForPiece.push(row[rowType + down] + posX);
        }

        for (var up = 0; up < moveParams.up; up++) {
            allMovesForPiece.push(row[rowType - up] + posX);
        }

        for (var right = 0; right < moveParams.right; right++) {
            allMovesForPiece.push(row[rowType] + (posX + right));
        }

        for (var left = 0; left < moveParams.left; left++) {
            allMovesForPiece.push(row[rowType] + (posX - left));
        }

        for (var diag = 0; diag < moveParams.diag; diag++) {
            allMovesForPiece.push(row[rowType + diag] + (posX + diag));
            allMovesForPiece.push(row[rowType - diag] + (posX + diag));
            allMovesForPiece.push(row[rowType + diag] + (posX - diag));
            allMovesForPiece.push(row[rowType - diag] + (posX - diag));
        }
    }
    if (piece.team1 !== true) {
        for (var down = 0; down < moveParams.down; down++) {
            if (piece.F_TURN) {
                moveParams.down = 3;
            }
            allMovesForPiece.push(row[rowType - down] + posX);
        }

        for (var up = 0; up < moveParams.up; up++) {
            allMovesForPiece.push(row[rowType + up] + posX);
        }

        for (var right = 0; right < moveParams.right; right++) {
            allMovesForPiece.push(row[rowType] + (posX + right));
        }

        for (var left = 0; left < moveParams.left; left++) {
            allMovesForPiece.push(row[rowType] + (posX - left));
        }

        for (var diag = 0; diag < moveParams.diag; diag++) {
            allMovesForPiece.push(row[rowType + diag] + (posX + diag));
            allMovesForPiece.push(row[rowType - diag] + (posX + diag));
            allMovesForPiece.push(row[rowType + diag] + (posX - diag));
            allMovesForPiece.push(row[rowType - diag] + (posX - diag));
        }
    }
    return allMovesForPiece;
}

function getMovementParameters(piece){
    availableMoves = [];

    // filters out non available moves for piece
    availableMoves = addAllMovesForPieceToArray(piece).filter(function(value) {
        return gridStatus[value] !== true && gridStatus[value] !== undefined
    });

    verticalCheck(piece);
    horizontalCheck(piece);

    if (piece.type === "BISHOP" || piece.type === "QUEEN") {
        diagCheck(piece);
    }   
}

function verticalCheck(piece) {
    var colLoop = 0;
    for (var i = 0 - piece.col; colLoop < 8; i++) {
        colLoop++;
        // up check
        if (gridStatus[boardGridArray[piece.col + i][piece.row]])  {
            if (i < 0) {   
                for (var j = 0; j < piece.col + i + 1; j++) {
                    var index = availableMoves.indexOf(boardGridArray[j][piece.row]);
                    if (index > -1){
                        availableMoves.splice(index, 1);
                    }
                }
            }
            if (i > 0) {   
                for (var p = piece.col + i; p < 8; p++) {
                    var index = availableMoves.indexOf(boardGridArray[p][piece.row]);
                    if (index > -1) {
                        availableMoves.splice(index, 1);
                    }
                }
            }
        }
    }
}

function horizontalCheck(piece){
    var rowLoop = 0;

    for (var j = 0 - piece.row; rowLoop < 8; j++){
        rowLoop++;
        if (gridStatus[boardGridArray[piece.col][piece.row + j]]) {
            if (j < 0) {   
                for (var k = 0; k < piece.row + j + 1; k++) {
                    var index = availableMoves.indexOf(boardGridArray[piece.col][k]);

                    if (index > -1){
                        availableMoves.splice(index, 1);
                    }
                }
            }
            if (j > 0) {   
                for (var p =  piece.row + j; p < 8; p++) {
                    var index = availableMoves.indexOf(boardGridArray[piece.col][p]);

                    if (index > -1) {
                        availableMoves.splice(index, 1);
                    }
                }
            }
        }
    }
}

function diagCheck(piece) {

    for (var q = piece.col + 1; q < 8 - piece.col; q++) {
        if (gridStatus[boardGridArray[piece.col + q][piece.row + q]]) {
            for (var i = piece.col + q; i < 8; i++) {
                // Looks in front of piece that piecePos is referring to start removing
                var col = piece.col + i;
                var row = piece.row + i;

                if (col > 7) {
                    col = 8 - col;
                }

                if (row > 7) {
                    row = 8 - row;
                }
                // removal of piece
                var index = availableMoves.indexOf(boardGridArray[col][row]);

                if (index > -1) {
                    availableMoves.splice(index, 1);
                }
            }
            break;
        }
    }

    //if (gridStatus[boardGridArray[piece.col + q][piece.row - j]]) {
    //    for (var i = 0; i < availableMoves.length + 3; i++) {
    //        // Looks in front of piece that piecePos is referring to start removing
    //        var col = piece.col + (i + 1);
    //        var row = piece.row - (i + 1);

    //        if (col > 7) {
    //            col = col - (col - 7);
    //        }
    //        if (row > 7) {
    //            row = row - (row - 7);
    //        }

    //        // removal of piece
    //        var index = availableMoves.indexOf(boardGridArray[col][row]);

    //        if (index > -1) {
    //            availableMoves.splice(index, 1);
    //        }
    //    }
    //}
}
    


function highlightPlacesToMove() {
    ctx3.clearRect(0, 0, hightlightCanvas.width, hightlightCanvas.height) 
    for (var i = 0; i < availableMoves.length; i++) {        
        drawHighlight('rgba(0, 255, 0, 0.2)', availableMoves[i]);

        if (pieceClicked.team1 === true) {
            addTextToPage('availableMovesT1', availableMoves);
        } else {
            addTextToPage('availableMovesT2', availableMoves);
        }        
    }
}

function drawHighlight(colour, pos) {
    ctx3.fillStyle = colour;
    ctx3.fillRect(gridArrayX[pos], gridArrayY[pos], gridSquareSize, gridSquareSize);
}

function validateMove(pieceClicked, posX, posY) {
    posX = posX / gridSquareSize;
    posY = posY / gridSquareSize;

    var moveRow = row[posY];
    var index = availableMoves.indexOf(moveRow + posX);

    if (index > -1 && gridStatus[moveRow + posX] === false) {
        if (pieceClicked.type === 'PAWN') {
            pieceClicked.F_TURN = false;
        }
        return true;
    } else {
        return false;
    }
}

function movePiece(pieces, newCol, newRow) {
    if (validateMove(pieces, newCol, newRow) === true) {
        var oldCol = pieces.col;
        var oldRow = pieces.row;

        ctx2.clearRect(gridArrayX[boardGridArray[oldCol][oldRow]], gridArrayY[boardGridArray[oldCol][oldRow]], gridSquareSize, gridSquareSize);

        newCol = newCol / gridSquareSize;
        newRow = newRow / gridSquareSize

        pieces.col = newRow;
        pieces.row = newCol;
        
        gridStatus[boardGridArray[oldCol][oldRow]] = false;
        gridStatus[boardGridArray[newRow][newCol]] = true;

        newPiecesArray.push(pieces);

        for (var i = 0; i < newPiecesArray.length; i++) {
            if (newPiecesArray[i].IN_PLAY) {
                ctx2.fillStyle =  newPiecesArray[i].colour;
                ctx2.fillRect(gridArrayX[boardGridArray[newPiecesArray[i].col][newPiecesArray[i].row]] + 12.5, gridArrayY[boardGridArray[newPiecesArray[i].col][newPiecesArray[i].row]] + 12.5, 50, 50)
        
                ctx2.fillStyle = textColour;
                ctx2.font = "bold 10px Arial";
                ctx2.fillText(newPiecesArray[i].type, gridArrayX[boardGridArray[newPiecesArray[i].col][newPiecesArray[i].row]] + 15, gridArrayY[boardGridArray[newPiecesArray[i].col][newPiecesArray[i].row]] + 30);
            } 
        }  
    } 
}