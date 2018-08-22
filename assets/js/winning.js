"use strict";

// how many pieces left on board? -- DONE
// How many pieces have each team collected -- DONE
// Is the King still on the board? (is it in check?) -- DONE

// FEATRUES TO ADD
// Timer
// Move list
// Graphical way to show pieces taken
// Changes blocks to actual pieces

// CORE FEATURES
// Promoting

function checkMateCheck(piece) {


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
