'use strict';

// Reference the taking prototype on piece -- DONE
// Need to look at all moves for piece -- DONE
// Need to see if there is a piece on any of those spots -- DONE
// If there is, look to see if it falls in the taking radius of the current piece -- DONE
// If true, highlight section red -- DONE
// Check to see if piece that is in taking parameters is not on the same team -- DONE
// Change Captured flag to true and in play false -- DONE


function allTakingParameters(piece) {
    var posX = clickPosX / gridSquareSize;
    var posY = clickPosY / gridSquareSize;

    var takeParams = piece.taking();
    var allTaking = [];
    var taking = [];

    // gets index of the piececlick col inside of row array
    var rowType = piece.col;

    if (piece.team1) {
        if (takeParams.DIAG > 0) {
            for (var diag = 0; diag <= takeParams.DIAG; diag++) {
                if (piece.TAKE_FORWARD) {
                    allTaking.push(row[rowType + diag] + (posX + diag));
                    allTaking.push(row[rowType + diag] + (posX - diag));
                } else {
                    allTaking.push(row[rowType + diag] + (posX + diag));
                    allTaking.push(row[rowType - diag] + (posX + diag));
                    allTaking.push(row[rowType + diag] + (posX - diag));
                    allTaking.push(row[rowType - diag] + (posX - diag));
                }
            }
        }
        for (var down = 0; down <= takeParams.DOWN; down++) {
            if (piece.type === "KNIGHT") {
                allTaking.push(row[rowType + down] + (posX - 2));
                allTaking.push(row[rowType + down] + (posX + 2));
            } else {
                allTaking.push(row[rowType + down] + posX);
            }         
        }

        for (var up = 0; up <= takeParams.UP; up++) {
            if (piece.type === "KNIGHT") {
                allTaking.push(row[rowType - up] + (posX + 2));
                allTaking.push(row[rowType - up] + (posX - 2));
            } else {
                allTaking.push(row[rowType - up] + posX);
            }           
        }

        for (var right = 0; right <= takeParams.RIGHT; right++) {
            allTaking.push(row[rowType] + (posX + right));
        }

        for (var left = 0; left <= takeParams.LEFT; left++) {
            allTaking.push(row[rowType] + (posX - left));
        }
    } else {
        if (takeParams.DIAG > 0) {
            for (var diag = 0; diag <= takeParams.DIAG; diag++) {
                if (piece.TAKE_FORWARD) {
                    allTaking.push(row[rowType - diag] + (posX + diag));
                    allTaking.push(row[rowType - diag] + (posX - diag));
                } else {
                    allTaking.push(row[rowType + diag] + (posX + diag));
                    allTaking.push(row[rowType - diag] + (posX + diag));
                    allTaking.push(row[rowType + diag] + (posX - diag));
                    allTaking.push(row[rowType - diag] + (posX - diag));
                }
            }
        }
        for (var down = 0; down <= takeParams.DOWN; down++) {
            allTaking.push(row[rowType - down] + posX);
        }

        for (var up = 0; up <= takeParams.DOWN; up++) {
            allTaking.push(row[rowType + up] + posX);
        }

        for (var right = 0; right <= takeParams.RIGHT; right++) {
            allTaking.push(row[rowType] + (posX + right));
        }

        for (var left = 0; left <= takeParams.LEFT; left++) {
            allTaking.push(row[rowType] + (posX - left));
        }
    }
    return allTaking;
}

function getTakingParameters(piece) {
    var taking = [];
    
    taking = allTakingParameters(piece).filter(function (value) {
        return gridStatus[value] !== undefined && value !== boardGridArray[piece.col][piece.row] && gridStatus[value] !== false;
    });

    return taking;
}

function highlightTakeablePlaces(piece) {
    for (var i = 0; i < getTakingParameters(piece).length; i++) {
        drawHighlight('rgba(255, 0, 0, 0.2)', getTakingParameters(piece)[i]);
    }
}

function checkIfPieceCanBeTaken(piece) {
    for (var i = 0; i < piecesArray.length; i++) {
        // checks to see if the mouseX position matches with the index stated in the piecesArray 
        if (mouse.x >= gridArrayX[boardGridArray[piecesArray[i].col][piecesArray[i].row]] && mouse.x <= gridArrayX[boardGridArray[piecesArray[i].col][piecesArray[i].row]]) {
            // checks to see if the mouseY position matches with the index in the pieces array
            if (mouse.y >= gridArrayY[boardGridArray[piecesArray[i].col][piecesArray[i].row]] && mouse.y <= gridArrayY[boardGridArray[piecesArray[i].col][piecesArray[i].row]]) {
                // if both teams same can't take
                if (piece.team1 === piecesArray[i].team1) {                 
                    return false;
                } else {

                    if (piece.team1) {
                        score1++

                        if (score1 === 16) {
                            checkWinningParameters();
                        }
                    }
                    if (piece.team1 !== true) {
                        score2++

                        if (score1 === 16) {
                            checkWinningParameters();
                        }
                    }

                    piecesArray[i].CAPTURED = true;
                    piece.piecesTaken++    
                                 
                    console.log(piecesArray[i].id + " (team1=" + piecesArray[i].team1 + ") has been captured by " + piece.id + " this piece has taken " + piece.piecesTaken + " pieces.")

                    // remove piece from array
                    piecesArray.splice(i, 1);            
                    return true;
                }
            }
        }
    }
}