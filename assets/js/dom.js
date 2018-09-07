"use strict";

// modifys the DOM (Document Object Model)
function addTextToPage(id, text) {
    var textOnPage = document.getElementById(id);
    textOnPage.textContent = text;
}

function changeElementColour(id, colour) {
    document.getElementById(id).style.backgroundColor = colour;
}

function updateTurnText() {
    if (player2Turn) {
        addTextToPage('turn', "PLAYER 1 TURN");
        addTextToPage('piecesTaken', "PIECES TAKEN: " + score2);
        changeElementColour('turn-box', chessPieceColourB)
    } else {
        addTextToPage('turn', "PLAYER 2 TURN");
        addTextToPage('piecesTaken', "PIECES TAKEN: " + score1);
        changeElementColour('turn-box', chessPieceColourA)
    }
}