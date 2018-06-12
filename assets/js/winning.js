"use strict";

// TO DO
// how many pieces left on board? -- DONE
// How many pieces have each team collected -- DONE
// Is the King still on the board? (is it in check?) -- DONE

function checkMateCheck() {

    // check taking array of piece -- DONE
    // is a king piece in its path? -- DONE
    // if it is then alert user -- DONE

    takeArray.forEach(function (value) {
        if (value === boardGridArray[king1.col][king1.row]) {
            alert('Your king is currently in check. If you do not move you will lose the game');
            king1.IN_CHECK = true;
            return;
        }
        else if (value === boardGridArray[king2.col][king2.row]) {
            alert('Your king is currently in check. If you do not move you will lose the game');
            king2.IN_CHECK = true;
        }
    });
}

function hasKingMoved(oldColPos, oldRowPos, newColPos, newRowPos) {

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

