"use strict";

// modifys the DOM (Document Object Model)
function addTextToPage(id, text) {
    var textOnPage = document.getElementById(id);
    textOnPage.textContent = text;
}

function updateTurnText() {
    if (player1Turn) {
        addTextToPage('turn', "PLAYER 1 TURN");
        addTextToPage('piecesTaken', "PIECES TAKEN: " + score1);

        document.getElementById('turn-box').style.backgroundColor = chessPieceColourA; 
        return;
    }
    if (player2Turn) {
        addTextToPage('turn', "PLAYER 2 TURN");
        addTextToPage('piecesTaken', "PIECES TAKEN: " + score2);

        document.getElementById('turn-box').style.backgroundColor = chessPieceColourB; 
        return;
    }
}

/* function clearPieceInfoText() {
    pieceSelected.textContent = "";
    currentPos.textContent = "";
  
    pieceSelectedT2.textContent = "";
    currentPosT2.textContent = "";
} */