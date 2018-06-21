"use strict";

// how many pieces left on board? -- DONE
// How many pieces have each team collected -- DONE
// Is the King still on the board? (is it in check?) -- DONE

// BUGS
// Check mating checks don't work  
// Takeable spaces don't take into account blocking checks and check check
// Didn't check if you moved the piece when selecting

// FEATRUES TO ADD
// Timer
// Move list
// Graphical way to show pieces taken
// Changes blocks to actual pieces

// CORE FEATURES
// Promoting

function checkMateCheck(piece) {

    for (var i = 0; i < 8; i++) {
        if (king1.IN_CHECK !== true) {
            // diag down right
            var posXKing1RD = king1.col + (i + 1);
            var posYKing1RD = king1.row + (i + 1);

            // diag down left
            var posXKing1LD = king1.col + i;
            var posYKing1LD = king1.row - i;

            if (posXKing1RD < 8 && posYKing1RD < 8) {
                for (var j = 0; j < piecesArray.length; j++) {
                    if (gridStatus[boardGridArray[posXKing1RD][posYKing1RD]]) {
                        if (boardGridArray[piecesArray[j].col][piecesArray[j].row] === boardGridArray[posXKing1RD][posYKing1RD]) {
                            if (king1.team1 !== piecesArray[j].team1 && piecesArray[j].movement().diag > 0) {
                                alert('King in check by: ' + piecesArray[j].id);
                                king1.IN_CHECK = true;
                            }
                        }
                    }
                }
            }

            if (posXKing1LD < 8 && posYKing1LD > 0) {
                for (var a = 0; a < piecesArray.length; a++) {
                    if (gridStatus[boardGridArray[posXKing1LD][posYKing1LD]]) {
                        if (boardGridArray[piecesArray[a].col][piecesArray[a].row] === boardGridArray[posXKing1LD][posYKing1LD]) {
                            if (king1.team1 !== piecesArray[a].team1 && piecesArray[a].movement().diag > 0) {
                                alert('King in check by: ' + piecesArray[a].id);
                                king1.IN_CHECK = true;
                            }
                        }
                    }
                }
            }

            // right and left check
            var posXKing1R = king1.row + (i + 1);
            var posXKing1L = king1.row - (1 - 1);

            if (posXKing1R < 8) {
                for (var x = 0; x < piecesArray.length; x++) {
                    if (gridStatus[boardGridArray[king1.col][posXKing1R]]) {
                        if (boardGridArray[piecesArray[x].col][piecesArray[x].row] === boardGridArray[king1.col][posXKing1R]) {
                            if (king1.team1 !== piecesArray[x].team1 && piecesArray[x].movement().right > 0) {
                                alert("King in check by: " + piecesArray[x].id);
                                king1.IN_CHECK = true;
                            }                       
                        }
                    }
                }
            }

            if (posXKing1L < 8) {
                for (var b = 0; b < piecesArray.length; b++) {
                    if (gridStatus[boardGridArray[king1.col][posXKing1L]]) {
                        if (boardGridArray[piecesArray[b].col][piecesArray[b].row] === boardGridArray[king1.col][posXKing1L]) {
                            if (king1.team1 !== piecesArray[b].team1 && piecesArray[x].movement().left > 0) {
                                alert("King in check by: " + piecesArray[b].id);
                                king1.IN_CHECK = true;
                            }                       
                        }
                    }
                }
            }
        }
    }
}

function hasKingMoved(currnentPieceClicked, oldColPos, oldRowPos, newColPos, newRowPos) {
    if (currnentPieceClicked.type !== "KING") {
        alert("Game Over. The King has been Check Mated");
        endGame();
    }

    if (currnentPieceClicked.type === "KING") {

        newColPos = newColPos / gridSquareSize;
        newRowPos = newRowPos / gridSquareSize;
    
        if (king1.IN_CHECK) {
            if (boardGridArray[oldColPos][oldRowPos] === boardGridArray[newRowPos][newColPos]) {
                alert("Game Over. Team 1's king has been check mated. Team 2 has won");
                endGame();
            }
            else {
                king1.IN_CHECK = false;
            }
        }
        else if (king2.IN_CHECK) {
            if (boardGridArray[oldColPos][oldRowPos] === boardGridArray[newRowPos][newColPos]) {
                alert("Game Over. Team 2's king has been check mated. Team 1 has won")
                endGame();
            }
            else {
                king2.IN_CHECK = false;
            }
        }  
    } 
}

