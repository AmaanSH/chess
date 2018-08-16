"use strict";

// BUGS
// Check mating checks don't work  -- IN PROGRESS
// Takeable spaces don't take into account blocking checks and check check -- PLANNED
// Didn't check if you moved the piece when selecting -- PLANNED

// FEATRUES TO ADD
// Timer -- PLANNED
// Move list -- PLANNED
// Graphical way to show pieces taken -- PLANNED
// Changes blocks to actual pieces -- PLANNED

// CORE FEATURES
// Promoting -- PLANNED

function checkMateCheck(piece) {
    // Things to add
    // Look around the king for pieces that can take
    // Check what type of piece it is and if it's on the same team
    // If it's not the same team and can take, alert user stop function
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

