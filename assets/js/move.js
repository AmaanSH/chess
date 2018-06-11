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

    if (pieceClicked == false && taking == false)  {
        pieceClicked = getPieceClicked();

        if (pieceClicked != null) {
            showPieceInfo();
            getMovementParameters(pieceClicked);
            getTakingParameters(pieceClicked);

            if (getMovementParameters(pieceClicked) !== null){
                highlightPlacesToMove(); 
            }

            if (getTakingParameters(pieceClicked) !== null) {
                highlightTakeablePlaces(pieceClicked);
                takeArray = getTakingParameters(pieceClicked);
            }
        } else {
            pieceClicked = false;
        }
    } else {
        movePiece(pieceClicked, clickPosX, clickPosY);

        ctx3.clearRect(0, 0, hightlightCanvas.width, hightlightCanvas.height)

        pieceClicked = false;
        takeArray = [];
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
        for (var down = 0; down <= moveParams.down; down++) {
            if (piece.F_TURN) {
                moveParams.down = 2;
            }

            // knight has special movement, needs to look more like an L
            if (piece.type === "KNIGHT") {

                // 2 movements on edge
                allMovesForPiece.push(row[rowType + down] + (posX - 2));
                allMovesForPiece.push(row[rowType + down] + (posX + 2));

                // 2 down movements
                allMovesForPiece.push(row[rowType + (down + 1)] + posX);

                // 1 down movement on the edges
                allMovesForPiece.push(row[rowType + 2] + (posX - 1));
                allMovesForPiece.push(row[rowType + 2] + (posX + 1));
            } 
            else {
                allMovesForPiece.push(row[rowType + down] + posX);
            }         
        }

        for (var up = 0; up <= moveParams.up; up++) {
            
            // knight has special movement, needs to look more like an L
            if (piece.type === "KNIGHT") {

                // 2 down movements on edge
                allMovesForPiece.push(row[rowType - up] + (posX + 2));
                allMovesForPiece.push(row[rowType - up] + (posX - 2));
                
                // 2 up movements connecting to 1 on each end
                allMovesForPiece.push(row[rowType - (up + 1)] + posX);

                // right up movement on the edges
                allMovesForPiece.push(row[rowType - 2] + (posX - 1));
                allMovesForPiece.push(row[rowType - 2] + (posX + 1));
            } 
            else {
                allMovesForPiece.push(row[rowType - up] + posX);
            }        
        }

        for (var right = 0; right <= moveParams.right; right++) {
            allMovesForPiece.push(row[rowType] + (posX + right));
        }

        for (var left = 0; left <= moveParams.left; left++) {
            allMovesForPiece.push(row[rowType] + (posX - left));
        }

        for (var diag = 0; diag <= moveParams.diag; diag++) {
            allMovesForPiece.push(row[rowType + diag] + (posX + diag));
            allMovesForPiece.push(row[rowType - diag] + (posX + diag));
            allMovesForPiece.push(row[rowType + diag] + (posX - diag));
            allMovesForPiece.push(row[rowType - diag] + (posX - diag));
        }
    }
    if (piece.team1 !== true) {
        for (var down = 0; down <= moveParams.down; down++) {
            if (piece.F_TURN) {
                moveParams.down = 2;
            }

            if (piece.type === "KNIGHT") {

                // 2 movements on edge
                allMovesForPiece.push(row[rowType - down] + (posX - 2));
                allMovesForPiece.push(row[rowType - down] + (posX + 2));

                // 2 down movements
                allMovesForPiece.push(row[rowType - (down + 1)] + posX);

                // 1 down movement on the edges
                allMovesForPiece.push(row[rowType - 2] + (posX - 1));
                allMovesForPiece.push(row[rowType - 2] + (posX + 1));

            }
            else {
                allMovesForPiece.push(row[rowType - down] + posX);
            }          
        }

        for (var up = 0; up <= moveParams.up; up++) {
            // knight has special movement, needs to look more like an L
            if (piece.type === "KNIGHT") {

                // 2 down movements on edge
                allMovesForPiece.push(row[rowType + up] + (posX + 2));
                allMovesForPiece.push(row[rowType + up] + (posX - 2));

                // 2 up movements connecting to 1 on each end
                allMovesForPiece.push(row[rowType - (up + 1)] + posX);

                // right up movement on the edges
                allMovesForPiece.push(row[rowType + 2] + (posX - 1));
                allMovesForPiece.push(row[rowType + 2] + (posX + 1));
            }
            else {
                allMovesForPiece.push(row[rowType + up] + posX);
            }        
        }

        for (var right = 0; right <= moveParams.right; right++) {
            allMovesForPiece.push(row[rowType] + (posX + right));
        }

        for (var left = 0; left <= moveParams.left; left++) {
            allMovesForPiece.push(row[rowType] + (posX - left));
        }

        for (var diag = 0; diag <= moveParams.diag; diag++) {
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
    for (var q = 1; q < 8; q++) {
        // right down
        if (q < 7 - piece.row && q <= 7 - piece.col) {
            if (gridStatus[boardGridArray[piece.col + q][piece.row + q]]) {
                for (var i = 0; i < 8; i++) {
                    // Looks in front of piece that piecePos is referring to start removing
                    var col = piece.col + q + i;
                    var row = piece.row + q + i;

                    // no need to keep checking since we're at the end of the board so just return
                    if (col < 8 && row < 8) {
                        // removal of piece
                        var index = availableMoves.indexOf(boardGridArray[col][row]);

                        if (index > -1) {
                            availableMoves.splice(index, 1);
                        }
                    }
                }
            }
        }

        // left up
        if (q <= piece.col && q <= piece.row) {
            if (gridStatus[boardGridArray[piece.col - q][piece.row - q]]) {
                for (var i = 0; i < 8; i++) {
                    // Looks in front of piece that piecePos is referring to start removing
                    var col = piece.col - q - i;
                    var row = piece.row - q - i;

                    // no need to keep checking since we're at the end of the board
                    if (col >= 0 && row >= 0) {

                        // removal of piece
                        var index = availableMoves.indexOf(boardGridArray[col][row]);

                        if (index > -1) {
                            availableMoves.splice(index, 1);
                        }
                    }
                }
            }
        }

        // right up
        if (q <= piece.col && q <= 7 - piece.col) {
            if (gridStatus[boardGridArray[piece.col - q][piece.row + q]]) {
                for (var i = 0; i < 8; i++) {
                    // Looks in front of piece that piecePos is referring to start removing
                    var col = piece.col - q - i;
                    var row = piece.row + q + i;

                    // no need to keep checking since we're at the end of the board so just return
                    if (col >= 0 && row < 8) {

                        // removal of piece
                        var index = availableMoves.indexOf(boardGridArray[col][row]);

                        if (index > -1) {
                            availableMoves.splice(index, 1);
                        }
                    }
                }
            }
        }

        // left down
        if (q <= 7 - piece.col && q >= piece.col) {
            if (gridStatus[boardGridArray[piece.col + q][piece.row - q]]) {
                for (var i = 0; i < 8; i++) {
                    // Looks in front of piece that piecePos is referring to start removing
                    var col = piece.col + q + i;
                    var row = piece.row - q - i;

                    // no need to keep checking since we're at the end of the board so just return
                    if (col < 8 && row >= 0) {

                        // removal of piece
                        var index = availableMoves.indexOf(boardGridArray[col][row]);

                        if (index > -1) {
                            availableMoves.splice(index, 1);
                        }
                    }
                }
            }
        }
    }
}

function highlightPlacesToMove() {
    ctx3.clearRect(0, 0, hightlightCanvas.width, hightlightCanvas.height) 
    for (var i = 0; i < availableMoves.length; i++) {        
        drawHighlight('rgba(0, 255, 0, 0.2)', availableMoves[i]);
        
        // show grid square
        ctx3.font = "30px Arial";
        ctx3.fillStyle = "white";
        ctx3.fillText(availableMoves[i], gridArrayX[availableMoves[i]] + (37.5 / 2), gridArrayY[availableMoves[i]] + (gridSquareSize / 2));      
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

    // if takeable piece available
    if (takeArray.length > 0) {
        takeArray.forEach(function (takeableSpaces) {
            if (takeableSpaces == moveRow + posX && checkIfPieceCanBeTaken(pieceClicked)) {
                pieceClicked.inTake = true;
                ctx2.clearRect(gridArrayX[boardGridArray[posY][posX]], gridArrayY[boardGridArray[posY][posX]], gridSquareSize, gridSquareSize);

                gridStatus[boardGridArray[posY][posX]] = false;
                updateTakenPiecesText();
            }
            checkMateCheck();
        });
    } 
    
    if (index > -1 && gridStatus[moveRow + posX] === false && pieceClicked.inTake !== true) {
        if (pieceClicked.type === 'PAWN' && pieceClicked.F_TURN) {
            pieceClicked.F_TURN = false;
        }
        return true;
    }

    if (pieceClicked.inTake) {
        if (pieceClicked.type === 'PAWN' && pieceClicked.F_TURN) {
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
            if (newPiecesArray[i].CAPTURED !== true) {
                ctx2.fillStyle = newPiecesArray[i].colour;
                ctx2.fillRect(gridArrayX[boardGridArray[newPiecesArray[i].col][newPiecesArray[i].row]] + 12.5, gridArrayY[boardGridArray[newPiecesArray[i].col][newPiecesArray[i].row]] + 12.5, 50, 50)

                ctx2.fillStyle = textColour;
                ctx2.font = "bold 10px Arial";
                ctx2.fillText(newPiecesArray[i].type, gridArrayX[boardGridArray[newPiecesArray[i].col][newPiecesArray[i].row]] + 15, gridArrayY[boardGridArray[newPiecesArray[i].col][newPiecesArray[i].row]] + 30);
            }
        }

        if (pieces.inTake) {
            pieces.inTake = false;
        }
    } 
}