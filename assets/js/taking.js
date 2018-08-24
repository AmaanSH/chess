'use strict'

function allTakingParameters(piece) {
    var posX = clickPosX / gridSquareSize;
    var posY = clickPosY / gridSquareSize;

    var takeParams = piece.taking();
    var allTaking = {
        allLeftTaking: [],
        allRightTaking: [],
        allUpTaking: [],
        allDownTaking: [],

        allDiagLFTMoves: [],
        allDiagRGTMoves: [],
        allDiagRGTDWNMoves: [],
        allDiagLFTDWNMoves: []
    }

    // gets index of the piececlick col inside of row array
    var rowType = piece.col;

    if (piece.team1) {
        if (takeParams.DIAG > 0) {
            for (var diag = 0; diag <= takeParams.DIAG; diag++) {
                if (piece.TAKE_FORWARD) {
                    allTaking.allDiagRGTDWNMoves.push(row[rowType + diag] + (posX + diag));
                    allTaking.allDiagRGTMoves.push(row[rowType + diag] + (posX - diag));
                } else {
                    allTaking.allDiagRGTDWNMoves.push(row[rowType + diag] + (posX + diag));
                    allTaking.allDiagLFTDWNMoves.push(row[rowType - diag] + (posX + diag));
                    allTaking.allDiagRGTMoves.push(row[rowType + diag] + (posX - diag));
                    allTaking.allDiagLFTMoves.push(row[rowType - diag] + (posX - diag));
                }
            }
        }
        for (var down = 0; down <= takeParams.DOWN; down++) {
            if (piece.type === "KNIGHT") {
                // sides one down
                allTaking.allDownTaking.push(row[rowType + 1] + (posX - 2));
                allTaking.allDownTaking.push(row[rowType + 1] + (posX + 2));

                // bottom section take pos
                allTaking.allDownTaking.push(row[rowType + 2] + (posX + 1));
                allTaking.allDownTaking.push(row[rowType + 2] + (posX - 1));
            } else {
                allTaking.allDownTaking.push(row[rowType + down] + posX);
            }         
        }

        for (var up = 0; up <= takeParams.UP; up++) {
            if (piece.type === "KNIGHT") {
                allTaking.allUpTaking.push(row[rowType - 1] + (posX + 2));
                allTaking.allUpTaking.push(row[rowType - 1] + (posX - 2));

                // bottom section take pos
                allTaking.allUpTaking.push(row[rowType - 2] + (posX + 1));
                allTaking.allUpTaking.push(row[rowType - 2] + (posX - 1));

            } else {
                allTaking.allUpTaking.push(row[rowType - up] + posX);
            }           
        }

        for (var right = 0; right <= takeParams.RIGHT; right++) {
            allTaking.allRightTaking.push(row[rowType] + (posX + right));         
        }

        for (var left = 0; left <= takeParams.LEFT; left++) {
            allTaking.allLeftTaking.push(row[rowType] + (posX - left));          
        }
    } else {
        if (takeParams.DIAG > 0) {
            for (var diag = 0; diag <= takeParams.DIAG; diag++) {
                if (piece.TAKE_FORWARD) {
                    allTaking.allDiagRGTDWNMoves.push(row[rowType - diag] + (posX + diag));
                    allTaking.allDiagRGTMoves.push(row[rowType - diag] + (posX - diag));
                } else {
                    allTaking.allDiagRGTDWNMoves.push(row[rowType + diag] + (posX + diag));
                    allTaking.allDiagLFTDWNMoves.push(row[rowType - diag] + (posX + diag));
                    allTaking.allDiagRGTMoves.push(row[rowType + diag] + (posX - diag));
                    allTaking.allDiagLFTMoves.push(row[rowType - diag] + (posX - diag));
                }
            }
        }
        for (var down = 0; down <= takeParams.DOWN; down++) {
            if (piece.type === "KNIGHT") {
                // sides one down
                allTaking.allDownTaking.push(row[rowType - 1] + (posX - 2));
                allTaking.allDownTaking.push(row[rowType - 1] + (posX + 2));

                // bottom section take pos
                allTaking.allDownTaking.push(row[rowType - 2] + (posX + 1));
                allTaking.allDownTaking.push(row[rowType - 2] + (posX - 1));
            } else {
                allTaking.allDownTaking.push(row[rowType - down] + posX);
            }            
        }

        for (var up = 0; up <= takeParams.DOWN; up++) {
            if (piece.type === "KNIGHT") {
                allTaking.allUpTaking.push(row[rowType + 1] + (posX + 2));
                allTaking.allUpTaking.push(row[rowType + 1] + (posX - 2));

                // bottom section take pos
                allTaking.allUpTaking.push(row[rowType + 2] + (posX + 1));
                allTaking.allUpTaking.push(row[rowType + 2] + (posX - 1));

            } else {
                allTaking.allUpTaking.push(row[rowType + up] + posX)
            } 
        }

        for (var right = 0; right <= takeParams.RIGHT; right++) {
            allTaking.allRightTaking.push(row[rowType] + (posX + right));
        }

        for (var left = 0; left <= takeParams.LEFT; left++) {
            allTaking.allLeftTaking.push(row[rowType] + (posX - left));
        }
    }
    return allTaking;
}

function removeBadValuesFromArray(array, arrayToCheck, piece, taking) {
    array = arrayToCheck.filter(function (value) {
        return gridStatus[value] !== undefined && value !== boardGridArray[piece.col][piece.row] && gridStatus[value] !== false;
    });

    if (array.length > 0) {
        for (var j = 0; j < array.length; j++) {
            for (var i = 0; i < piecesArray.length; i++) {
                var spaceToCheck = boardGridArray[piecesArray[i].col][piecesArray[i].row];

                // same team check. if true, remove
                if (spaceToCheck === array[j]) {
                    if (piecesArray[i].team1 === piece.team1) {
                        array.splice(j, 1);
                        j = - 1;
                    }
                }
            }
        }
    }
    takingBlockingCheck(piece, array)

    for (var i = 0; i < array.length; i++) {
        taking.push(array[i]);
    }    
    return array
}

function getTakingParameters(piece) {
    var leftTaking = [];
    var rightTaking = [];
    var upTaking = [];
    var downTaking = [];

    var diagRightMovement = [];
    var diagLeftMovement = [];
    var diagRightDownMovement = [];
    var diagLeftDownMovement = [];

    var taking = [];

    leftTaking = removeBadValuesFromArray(leftTaking, allTakingParameters(piece).allLeftTaking, piece, taking);
    rightTaking = removeBadValuesFromArray(rightTaking, allTakingParameters(piece).allRightTaking, piece, taking);
    upTaking = removeBadValuesFromArray(upTaking, allTakingParameters(piece).allUpTaking, piece, taking);
    downTaking = removeBadValuesFromArray(downTaking, allTakingParameters(piece).allDownTaking, piece, taking);

    diagRightMovement = removeBadValuesFromArray(diagRightMovement, allTakingParameters(piece).allDiagRGTMoves, piece, taking);
    diagLeftMovement = removeBadValuesFromArray(diagLeftMovement, allTakingParameters(piece).allDiagLFTMoves, piece, taking);
    diagRightDownMovement = removeBadValuesFromArray(diagRightDownMovement, allTakingParameters(piece).allDiagRGTDWNMoves, piece, taking);
    diagLeftDownMovement = removeBadValuesFromArray(diagLeftDownMovement, allTakingParameters(piece).allDiagLFTDWNMoves, piece, taking);

    return taking;
}

function highlightTakeablePlaces(piece) {
    var takeArray = getTakingParameters(piece);

    if (takeArray.length > 0) {
        for (var i = 0; i <= takeArray.length; i++) {
            drawHighlight('rgba(255, 0, 0, 0.2)', takeArray[i]);
        }
    }
}

function checkIfPieceCanBeTaken(piece) {
    for (var i = 0; i < piecesArray.length; i++) {
        // checks to see if the mouseX position matches with the index stated in the piecesArray 
        if (mouse.x >= gridArrayX[boardGridArray[piecesArray[i].col][piecesArray[i].row]] && mouse.x <= gridArrayX[boardGridArray[piecesArray[i].col][piecesArray[i].row]]) {
            // checks to see if the mouseY position matches with the index in the pieces array
            if (mouse.y >= gridArrayY[boardGridArray[piecesArray[i].col][piecesArray[i].row]] && mouse.y <= gridArrayY[boardGridArray[piecesArray[i].col][piecesArray[i].row]]) {                        
                piecesArray[i].CAPTURED = true;
                piece.piecesTaken++    
                                 
                console.log(piecesArray[i].id + " (team1=" + piecesArray[i].team1 + ") has been captured by " + piece.id + " this piece has taken " + piece.piecesTaken + " pieces.")

                // remove piece from array
                piecesArray.splice(i, 1); 
                updatingScore(piece);
                return true;
            }
        }
    }
}