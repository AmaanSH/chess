'use strict';

// Reference the taking prototype on piece -- DONE
// Need to look at all moves for piece -- DONE
// Need to see if there is a piece on any of those spots -- DONE
// If there is, look to see if it falls in the taking radius of the current piece -- DONE
// If true, highlight section red -- DONE
// Check to see if piece that is in taking parameters is not on the same team -- UNDERWAY


// If the team isn't the same, and no other issues, allow piece to be moved to taken pile
// Change Captured flag to true and in play false

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
        console.log(getTakingParameters(piece))
    }
}