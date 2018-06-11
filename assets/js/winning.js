"use strict";

// TO DO
// how many pieces left on board?
// How many pieces have each team collected
// Is the King still on the board? (is it in check?)

function checkWinningParameters() {
    if (score1 === 16) {
        alert("Game is over. All the pieces have been collected.");
        document.location.reload();
    } else if (score2 === 16) {
        alert("Game is over. The other team collected all the pieces");
        document.location.reload();
    }
}

function checkMateCheck() {
    // check taking array of piece
    // is a king piece in its path?
    // if it is then alert user

    var kingIndex1 = piecesArray.indexOf(king1);
    var kingIndex2 = piecesArray.indexOf(king2);

    var currentKingPos1 = boardGridArray[piecesArray[kingIndex1].col][piecesArray[kingIndex1].row];
    var currentKingPos2 = boardGridArray[piecesArray[kingIndex2].col][piecesArray[kingIndex2].row];

    takeArray.forEach(function (value) {
        if (value === boardGridArray[piecesArray[kingIndex2].col][piecesArray[kingIndex2].row] || value === boardGridArray[piecesArray[kingIndex1].col][piecesArray[kingIndex1].row]) {
            alert('Your king is currently in check. If you do not move you will lose the game')
        }
    });
}

