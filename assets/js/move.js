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
            //getTakingParameters(pieceClicked);

            if (getMovementParameters(pieceClicked) !== null){
                highlightPlacesToMove(); 
            }

            //if (getTakingParameters(pieceClicked) !== null) {
            //    highlightTakeablePlaces(pieceClicked);            
            //}
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
    var allMoveParams = {
        allLeftMoves: [],
        allRightMoves: [],
        allUpMoves: [],
        allDownMoves: [],

        allDiagLFTMoves: [],
        allDiagRGTMoves: [],
        allDiagRGTDWNMoves: [],
        allDiagLFTDWNMoves: []
    }
 
    var rowType = piece.col;

    if (piece.team1) {
        for (var down = 0; down <= moveParams.down; down++) {
            if (piece.F_TURN) {
                moveParams.down = 2;
            }
            // knight has special movement, needs to look more like an L
            if (piece.type === "KNIGHT") {

                // 2 movements on edge
                allMoveParams.allDownMoves.push(row[rowType + down] + (posX - 2));
                allMoveParams.allDownMoves.push(row[rowType + down] + (posX + 2));

                // 2 down movements
                allMoveParams.allDownMoves.push(row[rowType + (down + 1)] + posX);

                // 1 down movement on the edges
                allMoveParams.allDownMoves.push(row[rowType + 2] + (posX - 1));
                allMoveParams.allDownMoves.push(row[rowType + 2] + (posX + 1));
            } 
            else {
                allMoveParams.allDownMoves.push(row[rowType + down] + posX);
            }         
        }

        for (var up = 0; up <= moveParams.up; up++) {
            
            // knight has special movement, needs to look more like an L
            if (piece.type === "KNIGHT") {

                // 2 down movements on edge
                allMoveParams.allUpMoves.push(row[rowType - up] + (posX + 2));
                allMoveParams.allUpMoves.push(row[rowType - up] + (posX - 2));
                
                // 2 up movements connecting to 1 on each end
                allMoveParams.allUpMoves.push(row[rowType - (up + 1)] + posX);

                // right up movement on the edges
                allMoveParams.allUpMoves.push(row[rowType - 2] + (posX - 1));
                allMoveParams.allUpMoves.push(row[rowType - 2] + (posX + 1));
            } 
            else {
                allMoveParams.allUpMoves.push(row[rowType - up] + posX);
            }        
        }

        for (var right = 0; right <= moveParams.right; right++) {
            allMoveParams.allRightMoves.push(row[rowType] + (posX + right));
        }

        for (var left = 0; left <= moveParams.left; left++) {
            allMoveParams.allLeftMoves.push(row[rowType] + (posX - left));
        }

        for (var diag = 0; diag <= moveParams.diag; diag++) {
            allMoveParams.allDiagRGTDWNMoves.push(row[rowType + diag] + (posX + diag));
            allMoveParams.allDiagLFTDWNMoves.push(row[rowType - diag] + (posX + diag));
            allMoveParams.allDiagRGTMoves.push(row[rowType + diag] + (posX - diag));
            allMoveParams.allDiagLFTMoves.push(row[rowType - diag] + (posX - diag));
        }
    }
    if (piece.team1 !== true) {
        for (var down = 0; down <= moveParams.down; down++) {
            if (piece.F_TURN) {
                moveParams.down = 2;
            }

            if (piece.type === "KNIGHT") {

                // 2 movements on edge
                allMoveParams.allDownMoves.push(row[rowType - down] + (posX - 2));
                allMoveParams.allDownMoves.push(row[rowType - down] + (posX + 2));

                // 2 down movements
                allMoveParams.allDownMoves.push(row[rowType - down] + posX);

                // 1 down movement on the edges
                allMoveParams.allDownMoves.push(row[rowType - 2] + (posX - 1));
                allMoveParams.allDownMoves.push(row[rowType - 2] + (posX + 1));

            }
            else {
                allMoveParams.allDownMoves.push(row[rowType - down] + posX);
            }          
        }
        // Bug: Diaganol up movement issue when piece is in the last row
        for (var up = 0; up <= moveParams.up; up++) {
            // knight has special movement, needs to look more like an L
            if (piece.type === "KNIGHT") {

                // 2 down movements on edge
                allMoveParams.allUpMoves.push(row[rowType + up] + (posX + 2));
                allMoveParams.allUpMoves.push(row[rowType + up] + (posX - 2));

                // 2 up movements connecting to 1 on each end
                allMoveParams.allUpMoves.push(row[rowType - (up + 1)] + posX);

                // right up movement on the edges
                allMoveParams.allUpMoves.push(row[rowType + 2] + (posX - 1));
                allMoveParams.allUpMoves.push(row[rowType + 2] + (posX + 1));

                allMoveParams.allUpMoves.push(row[rowType + up] + posX);
                allMoveParams.allUpMoves.push(row[rowType + (up + 1)] + posX);
            }
            else {
                allMoveParams.allUpMoves.push(row[rowType + up] + posX);
            }        
        }

        for (var right = 0; right <= moveParams.right; right++) {
            allMoveParams.allRightMoves.push(row[rowType] + (posX + right));
        }

        for (var left = 0; left <= moveParams.left; left++) {
            allMoveParams.allLeftMoves.push(row[rowType] + (posX - left));
        }

        for (var diag = 0; diag <= moveParams.diag; diag++) {
            allMoveParams.allDiagRGTDWNMoves.push(row[rowType + diag] + (posX + diag));
            allMoveParams.allDiagLFTDWNMoves.push(row[rowType - diag] + (posX + diag));
            allMoveParams.allDiagRGTMoves.push(row[rowType + diag] + (posX - diag));
            allMoveParams.allDiagLFTMoves.push(row[rowType - diag] + (posX - diag));
        }
    }
    return allMoveParams;
}

function removeValues(array, arrayToCheck, piece){
    array = arrayToCheck.filter(function(value) {
        return gridStatus[value] !== undefined && value !== boardGridArray[piece.col][piece.row];
    });
    return array
}

function getMovementParameters(piece){
    var leftMovement = [];
    var rightMovement = [];
    var upMovement = [];
    var downMovement = [];

    var diagRightMovement = [];
    var diagLeftMovement = [];
    var diagRightDownMovement = [];
    var diagLeftDownMovement = [];

    availableMoves = [];

    // removes initial invalid moves (e.g. NaN, undefined) from the array
    leftMovement = removeValues(leftMovement, addAllMovesForPieceToArray(piece).allLeftMoves, piece);
    rightMovement = removeValues(rightMovement, addAllMovesForPieceToArray(piece).allRightMoves, piece);
    upMovement = removeValues(upMovement, addAllMovesForPieceToArray(piece).allUpMoves, piece);
    downMovement = removeValues(downMovement, addAllMovesForPieceToArray(piece).allDownMoves, piece);

    diagRightMovement = removeValues(diagRightMovement, addAllMovesForPieceToArray(piece).allDiagRGTMoves, piece);
    diagLeftMovement = removeValues(diagLeftMovement, addAllMovesForPieceToArray(piece).allDiagLFTMoves, piece);
    diagLeftDownMovement = removeValues(diagLeftDownMovement, addAllMovesForPieceToArray(piece).allDiagLFTDWNMoves, piece);
    diagRightDownMovement = removeValues(diagLeftDownMovement, addAllMovesForPieceToArray(piece).allDiagRGTDWNMoves, piece);

    // puts the movements from the array into availableMoves once blocking checks are taken into account
    addValidPiecesMovementsToArray(piece, leftMovement);
    addValidPiecesMovementsToArray(piece, rightMovement);
    addValidPiecesMovementsToArray(piece, upMovement);
    addValidPiecesMovementsToArray(piece, downMovement);

    addValidPiecesMovementsToArray(piece, diagRightMovement);
    addValidPiecesMovementsToArray(piece, diagLeftMovement);
    addValidPiecesMovementsToArray(piece, diagRightDownMovement);
    addValidPiecesMovementsToArray(piece, diagLeftDownMovement);
}

function blockingChecks(piece, array) {
    // Check the array being passed in
    // if a piece is on spot, remove from that piece downwards
    for (var i = 0; i < array.length; i++) {
        if (gridStatus[array[i]] == true) {
            var index = array.indexOf(array[i])
            array.splice(index, array.length - index)
        }
    }
    // BUGS - repro: select team2 queen piece, you'll see the up movements are broken if it's in the last row
}

function addValidPiecesMovementsToArray(piece, array) {
    if (array.length > 0) {
        blockingChecks(piece, array);

        for (var i = 0; i < array.length; i++) {
            availableMoves.push(array[i]);
        }
    }
}

function highlightPlacesToMove() {
    ctx3.clearRect(0, 0, hightlightCanvas.width, hightlightCanvas.height) 
    for (var i = 0; i < availableMoves.length; i++) {        
        drawHighlight('rgba(0, 255, 0, 0.2)', availableMoves[i]);
        
        // show grid square name
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