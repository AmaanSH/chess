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

    updateTurnText();

    if (pieceClicked == false)  {
        pieceClicked = getPieceClicked();

        if (pieceClicked != null && currentTurn(pieceClicked)) {
            getMovementParameters(pieceClicked);
            getTakingParameters(pieceClicked);

            if (getMovementParameters(pieceClicked) !== null){
                highlightPlacesToMove(); 
            }

            if (getTakingParameters(pieceClicked) !== null) {
                takeArray = getTakingParameters(pieceClicked);
                highlightTakeablePlaces(pieceClicked);            
            }
        } else {
            pieceClicked = false;
        }
    } else {

        if (pieceClicked.type === "KING" && pieceClicked.IN_CHECK) {
            hasKingMoved(pieceClicked.col, pieceClicked.row, clickPosX, clickPosY);
        }
     
        movePiece(pieceClicked, clickPosX, clickPosY);

        ctx3.clearRect(0, 0, hightlightCanvas.width, hightlightCanvas.height)

        pieceClicked = false;
        beingBlocked = false;
        takeArray = [];
    }
}

function getPieceClicked() {
    for (var i = 0; i < piecesArray.length; i++) {
        // checks to see if the mouseX position matches with the index stated in the piecesArray 
        if (mouse.x >= gridArrayX[boardGridArray[piecesArray[i].col][piecesArray[i].row]] && mouse.x <= gridArrayX[boardGridArray[piecesArray[i].col][piecesArray[i].row]]) {

            // checks to see if the mouseY position matches with the index in the pieces array
            if (mouse.y >= gridArrayY[boardGridArray[piecesArray[i].col][piecesArray[i].row]] && mouse.y <= gridArrayY[boardGridArray[piecesArray[i].col][piecesArray[i].row]]) {

                //console.log('Piece: ' + piecesArray[i].id + ' Pos: ' + boardGridArray[piecesArray[i].col][piecesArray[i].row] + ' Team1: ' + piecesArray[i].team1)
                return piecesArray[i]
            }
        }
    }
}

function addAllMovesForPieceToArray(piece) {
    var posX = clickPosX / gridSquareSize;
    var posY = clickPosY / gridSquareSize;

    var moveParams = piece.movement();
 
    // gets index of the piececlick col inside of row array
    var rowType = piece.col;

    var allMovesForPiece = [];

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
                allMovesForPiece.push(row[rowType - down] + posX);

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

                allMovesForPiece.push(row[rowType + up] + posX);
                allMovesForPiece.push(row[rowType + (up + 1)] + posX);
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

    verticalCheck(piece, availableMoves, "moves");
    horizontalCheck(piece, availableMoves, "moves");

    if (piece.type === "BISHOP" || piece.type === "QUEEN") {
        diagCheck(piece, availableMoves);
    }
}

function verticalCheck(piece, array, type) {
    var colLoop = 0;

    for (var i = 0 - piece.col; colLoop < 8; i++) {
        colLoop++;
        if (gridStatus[boardGridArray[piece.col + i][piece.row]]) {
            // up check
            if (i < 0) {   
                for (var j = 0; j < piece.col + i + 1; j++) {
                    // where equal to true
                    var index = array.indexOf(boardGridArray[j][piece.row]);

                    if (index > -1 && type !== "take") {
                        array.splice(index, 1);
                    }
                    // if taking & index = taking piece
                    if (type === "take" && index > -1) {     
                        var colCheck = j - 1;
                        var rowCheck = piece.row
                        for (var check = 0; check < piecesArray.length; check++) {
                            if (piecesArray[check].col === colCheck && piecesArray[check].row === rowCheck) {
                                if (piecesArray[check].team1 === piece.team1) {
                                    console.log(piece.id + " is being blocked by own team piece: " + piecesArray[check].id + " no pieces can be taken")

                                    // remove all takeable spots in array
                                    array.splice(0, array.length)
                                    return
                                }
                                if (piecesArray[check].team1 !== piece.team1) {
                                    console.log(array);
                                    for (var w = 0; w < 8; w++) {
                                        var check1 = colCheck + w;
                                        for (var arrayCheck = 0; arrayCheck < piecesArray.length; arrayCheck++) {
                                            if (check1 > 0 && boardGridArray[check1][piece.row] === boardGridArray[piecesArray[arrayCheck].col][piecesArray[arrayCheck].row] && boardGridArray[piecesArray[arrayCheck].col][piecesArray[arrayCheck].row] !== boardGridArray[piece.col][piece.row]) {
                                                if (piecesArray[arrayCheck].team1 === piece.team1) {
                                                    if (piecesArray[arrayCheck].col < piece.col) {
                                                        console.log('NO BLOCK')
                                                        return
                                                    } else {
                                                        console.log("SAME TEAM NO TAKE. PIECE DETECTED: " + piecesArray[arrayCheck].team1 + " " + piecesArray[arrayCheck].id);
                                                        array.splice(0, array.length);
                                                        return;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (gridStatus[boardGridArray[colCheck][rowCheck]] == false) {
                                for (var e = 0; e < 8; e++) {
                                    var check1 = colCheck + e;
                                    for (var arrayCheck = 0; arrayCheck < piecesArray.length; arrayCheck++) {
                                        if (check1 > 0 && boardGridArray[check1][piece.row] === boardGridArray[piecesArray[arrayCheck].col][piecesArray[arrayCheck].row] && boardGridArray[piecesArray[arrayCheck].col][piecesArray[arrayCheck].row] !== boardGridArray[piece.col][piece.row]) {
                                            if (piecesArray[arrayCheck].team1 === piece.team1) {
                                                if (piecesArray[arrayCheck].col < piece.col) {
                                                    return
                                                } else {
                                                    console.log("SAME TEAM NO TAKE. PIECE DETECTED: " + piecesArray[arrayCheck].team1 + " " + piecesArray[arrayCheck].id);
                                                    array.splice(0, array.length);
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // down check
            if (i > 0) {   
                for (var p = piece.col + i; p < 8; p++) {
                    var index = array.indexOf(boardGridArray[p][piece.row]);
                    if (index > -1 && type !== "take") {
                        array.splice(index, 1);                       
                    }

                    var colCheck = p + 1;
                    var rowCheck = piece.row;
                    if (type === "take" && index > -1) {      
                        for (var check = 0; check < piecesArray.length; check++) {

                           /// console.log("Piece being checked: " + boardGridArray[p][piece.row])
                           // console.log("colCheck: " + colCheck)
                           // console.log("check: " + check)

                            // if the piece in the array equals the piece we're checking
                            if (piecesArray[check].col === colCheck && piecesArray[check].row === rowCheck) {
                                // same team?
                                if (piecesArray[check].team1 === piece.team1) {
                                    console.log(piece.id + " is being blocked by own team piece: " + piecesArray[check].id + " no pieces can be taken")
                                    array.splice(0, array.length)
                                    return
                                }

                                // not the same team?
                                if (piecesArray[check].team1 !== piece.team1) {
                                    console.log(array)
                                    for (var y = 0; y < 8; y++) {
                                        var check1 = colCheck - y;
                                        for (var arrayCheck = 0; arrayCheck < piecesArray.length; arrayCheck++) {
                                            if (check1 > 0 && boardGridArray[check1][piece.row] === boardGridArray[piecesArray[arrayCheck].col][piecesArray[arrayCheck].row] && boardGridArray[piecesArray[arrayCheck].col][piecesArray[arrayCheck].row] !== boardGridArray[piece.col][piece.row]) {
                                                if (piecesArray[arrayCheck].team1 === piece.team1) {
                                                    if (piecesArray[arrayCheck].col < piece.col) {
                                                        return
                                                    } else {
                                                        console.log("SAME TEAM NO TAKE. PIECE DETECTED: " + piecesArray[arrayCheck].id + " IS BLOCKING: " + piece.id);
                                                        array.splice(0, array.length);
                                                        return
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if (gridStatus[boardGridArray[colCheck][rowCheck]] == false) {
                                console.log(array);
                                for (var o = 0; o < 8; o++) {
                                    var check1 = colCheck - o;
                                    for (var arrayCheck = 0; arrayCheck < piecesArray.length; arrayCheck++) {
                                        if (check1 > 0 && boardGridArray[check1][piece.row] === boardGridArray[piecesArray[arrayCheck].col][piecesArray[arrayCheck].row] && boardGridArray[piecesArray[arrayCheck].col][piecesArray[arrayCheck].row] !== boardGridArray[piece.col][piece.row]) {
                                            if (piecesArray[arrayCheck].team1 === piece.team1) {
                                                if (piecesArray[arrayCheck].col < piece.col) {
                                                    return
                                                } else {
                                                    console.log("SAME TEAM NO TAKE. PIECE DETECTED: " + piecesArray[arrayCheck].team1 + " " + piecesArray[arrayCheck].id);
                                                    array.splice(0, array.length);
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }             
                    }
                }
            }
        }
    }
}

function horizontalCheck(piece, array, type){
    var rowLoop = 0;
    for (var j = 0 - piece.row; rowLoop < 8; j++){
        rowLoop++;
        if (gridStatus[boardGridArray[piece.col][piece.row + j]]) {
            if (j < 0) {   
                for (var k = 0; k < piece.row + j + 1; k++) {
                    var index = array.indexOf(boardGridArray[piece.col][k]);

                    if (index > -1 && type !== "check"){
                        array.splice(index, 1);
                    }
                }

                if (type === "take") {
                    //var pieceToCheck = getPieceClicked();

                    var colCheck = piece.col
                    var rowCheck = piece.row + j

                    for (var check = 0; check < piecesArray.length; check++) {
                        if (piecesArray[check].col === colCheck && piecesArray[check].row === rowCheck) {
                            if (piecesArray[check].team1 === piece.team1) {
                                // remove all takeable spots in array
                                array.splice(0, array.length);
                                return
                            }
                            if (piecesArray[check].team1 !== piece.team1) {
                                console.log(array)
                                var length = array.length - index;
                                array.splice(index + 1, length);
                                return
                            }
                        }
                    }
                }
            }           
            if (j > 0) {   
                for (var p =  piece.row + j; p < 8; p++) {
                    var index = array.indexOf(boardGridArray[piece.col][p]);

                    if (index > -1 && type !== "take") {
                        array.splice(index, 1);
                    }
                    if (type === "take") {
                        //var pieceToCheck = getPieceClicked();

                        var colCheck = piece.col;
                        var rowCheck = piece.row - j;

                        for (var check = 0; check < piecesArray.length; check++) {
                            if (piecesArray[check].col === colCheck && piecesArray[check].row === rowCheck) {
                                if (piecesArray[check].team1 === piece.team1) {
                                    console.log(piece.id + " is being blocked by own team piece: " + piecesArray[check].id + " no pieces can be taken")
                                    // remove all takeable spots in array
                                    array.splice(0, array.length)
                                    return
                                }
                                if (piecesArray[check].team1 !== piece.team1) {
                                    var length = array.length - index;
                                    array.splice(index + 1, length);
                                    return
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function diagCheck(piece, array) {
    for (var q = 1; q < 8; q++) {

        //BUGS
        // If piece is one spot down the blocking checks do not work on the left -- FIXED
        // Team2 pieces start on the other side of board, blocking checks do not work initially -- FIXED

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
                        var index = array.indexOf(boardGridArray[col][row]);

                        if (index > -1) {
                            array.splice(index, 1);
                        }
                    }
                }
            }
            // left down
            if (gridStatus[boardGridArray[piece.col + q][piece.row - q]]) {
                for (var i = 0; i < 8; i++) {
                    // Looks in front of piece that piecePos is referring to start removing
                    var col = piece.col + q + i;
                    var row = piece.row - q - i;

                    // no need to keep checking since we're at the end of the board so just return
                    if (col < 8 && row >= 0) {

                        // removal of piece
                        var index = array.indexOf(boardGridArray[col][row]);

                        if (index > -1) {
                            array.splice(index, 1);
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
                        var index = array.indexOf(boardGridArray[col][row]);

                        if (index > -1) {
                            array.splice(index, 1);
                        }
                    }
                }
            }

            if (gridStatus[boardGridArray[piece.col - q][piece.row + q]]) {
                for (var i = 0; i < 8; i++) {
                    // Looks in front of piece that piecePos is referring to start removing
                    var col = piece.col - q - i;
                    var row = piece.row + q + i;

                    // no need to keep checking since we're at the end of the board so just return
                    if (col >= 0 && row < 8) {

                        // removal of piece
                        var index = array.indexOf(boardGridArray[col][row]);

                        if (index > -1) {
                            array.splice(index, 1);
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
                        var index = array.indexOf(boardGridArray[col][row]);

                        if (index > -1) {
                            array.splice(index, 1);
                        }
                    }
                }
            }
        }
  
        if (q <= 7 - piece.col && q >= piece.col) {
            if (gridStatus[boardGridArray[piece.col + q][piece.row - q]]) {
                for (var i = 0; i < 8; i++) {
                    // Looks in front of piece that piecePos is referring to start removing
                    var col = piece.col + q + i;
                    var row = piece.row - q - i;

                    // no need to keep checking since we're at the end of the board so just return
                    if (col < 8 && row >= 0) {

                        // removal of piece
                        var index = array.indexOf(boardGridArray[col][row]);

                        if (index > -1) {
                            array.splice(index, 1);
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

    var checkMateChecked = false;

    // if takeable piece available
    if (takeArray.length > 0) {
        takeArray.forEach(function (takeableSpaces) {
            if (takeableSpaces == moveRow + posX && checkIfPieceCanBeTaken(pieceClicked)) {
                pieceClicked.inTake = true;
                ctx2.clearRect(gridArrayX[boardGridArray[posY][posX]], gridArrayY[boardGridArray[posY][posX]], gridSquareSize, gridSquareSize);
                gridStatus[boardGridArray[posY][posX]] = false;
            }
            // if king is inside of takeArray
            if (checkMateChecked === false) {
                checkMateCheck();
                checkMateChecked = true;
            }               
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