'use strict';

// Reference the taking prototype on piece -- DONE
// Need to look at all moves for piece -- DONE
// Need to see if there is a piece on any of those spots -- DONE
// If there is, look to see if it falls in the taking radius of the current piece -- DONE
// If true, highlight section red -- DONE
// Check to see if piece that is in taking parameters is not on the same team -- DONE
// Change Captured flag to true and in play false -- DONE

// BUG LIST
// Other side blocking check issue -- DONE
// Knight turns on team 2 are missing bottom 2 movements -- DONE
// Check mate checks need adjusting -- IN PROGRESS

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
                // sides one down
                allTaking.push(row[rowType + 1] + (posX - 2));
                allTaking.push(row[rowType + 1] + (posX + 2));

                // bottom section take pos
                allTaking.push(row[rowType + 2] + (posX + 1));
                allTaking.push(row[rowType + 2] + (posX - 1));
            } else {
                allTaking.push(row[rowType + down] + posX);
            }         
        }

        for (var up = 0; up <= takeParams.UP; up++) {
            if (piece.type === "KNIGHT") {
                allTaking.push(row[rowType - 1] + (posX + 2));
                allTaking.push(row[rowType - 1] + (posX - 2));

                // bottom section take pos
                allTaking.push(row[rowType - 2] + (posX + 1));
                allTaking.push(row[rowType - 2] + (posX - 1));

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
            if (piece.type === "KNIGHT") {
                // sides one down
                allTaking.push(row[rowType - 1] + (posX - 2));
                allTaking.push(row[rowType - 1] + (posX + 2));

                // bottom section take pos
                allTaking.push(row[rowType - 2] + (posX + 1));
                allTaking.push(row[rowType - 2] + (posX - 1));
            } else {
                allTaking.push(row[rowType - down] + posX);
            }            
        }

        for (var up = 0; up <= takeParams.DOWN; up++) {
            if (piece.type === "KNIGHT") {
                allTaking.push(row[rowType + 1] + (posX + 2));
                allTaking.push(row[rowType + 1] + (posX - 2));

                // bottom section take pos
                allTaking.push(row[rowType + 2] + (posX + 1));
                allTaking.push(row[rowType + 2] + (posX - 1));

            } else {
                allTaking.push(row[rowType + up] + posX)
            } 
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

    // check the contents of the takearray -- DONE
    // find what pieces are at those spaces -- DONE
    // if the same team, remove from array -- DONE

    if (taking.length > 0) {
        for (var j = 0; j < taking.length; j++) {
            for (var i = 0; i < piecesArray.length; i++) {       
                var spaceToCheck = boardGridArray[piecesArray[i].col][piecesArray[i].row];

                // same team check. if true, remove
                if (spaceToCheck === taking[j]) {
                    if (piecesArray[i].team1 === piece.team1) {
                        taking.splice(j, 1);  
                        j =- 1;
                    }
                }
            }
        }
    }
    return taking;
}

function highlightTakeablePlaces(piece) {

    // BUGS
    // Your own pieces are being highlighted as takeable, but not possible -- FIXED (getTakingParameters)

    if (getTakingParameters(piece).length > 0) {
        for (var i = 0; i <= getTakingParameters(piece).length; i++) {
            drawHighlight('rgba(255, 0, 0, 0.2)', getTakingParameters(piece)[i]);
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

function updatingScore(piece) {
    if (piece.team1) {
        score1++
    }
    if (piece.team1 !== true) {
        score2++
    }
}