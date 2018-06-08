"use strict";

// modifys the DOM (Document Object Model)
function addTextToPage(id, text) {
    var textOnPage = document.getElementById(id);
    textOnPage.textContent = text;
}

function showPieceInfo() {
    if (pieceClicked.team1 === true) {
        addTextToPage('pieceSelected', pieceClicked.type)
        addTextToPage('currentPos', boardGridArray[pieceClicked.col][pieceClicked.row])
    } else {
        addTextToPage('pieceSelectedT2', pieceClicked.type);
        addTextToPage('currentPosT2', boardGridArray[pieceClicked.col][pieceClicked.row]);
    }
}

function updateTakenPiecesText() {
    if (pieceClicked.team1) {
        addTextToPage('piecesTakenT1', score1);
    } else {
        addTextToPage('piecesTakenT2', score2);
    }   
}

function clearPieceInfoText() {
    pieceSelected.textContent = "";
    currentPos.textContent = "";
  
    pieceSelectedT2.textContent = "";
    currentPosT2.textContent = "";
}