"use strict";

function currentTurn(piece) {
    if (piece.activeTurn && piece.team1) {
        for (var i = 0; i < piecesArray.length; i++) {
            piecesArray[i].activeTurn = false;
                      
            if (piecesArray[i].team1 !== true && piecesArray[i].activeTurn !== true) {
                piecesArray[i].activeTurn = true;
                player1Turn = false;
                player2Turn = true;
            }
        };       
        return true;
    }
               
    if (piece.activeTurn && piece.team1 !== true) {
        for (var i = 0; i < piecesArray.length; i++) {
            piecesArray[i].activeTurn = false;  
                      
            if (piecesArray[i].team1 && piecesArray[i].activeTurn !== true) {
                piecesArray[i].activeTurn = true;
                player1Turn = true;
                player2Turn = false;
            }
        };       
        return true; 
    }
}

function endGame() {
    document.getElementById('turn').textContent = "END OF GAME";
    document.querySelector("#endScreen").style.display = "block";
    
    endScreenCtx.fillStyle = "#736453";
    endScreenCtx.fillRect(0, 0, 600, 600);

    var titleFont = "bold 50px Arial";
    var textFont = "bold 20px Arial";
    var textFont2 = "20px Arial";

    endScreenCtx.fillStyle = textColour;
    endScreenCtx.font = titleFont;

    endScreenCtx.fillText("Game Over!", 155, 300);

    endScreenCtx.font = textFont;
    endScreenCtx.fillText("Game Results", 235, 335);

    endScreenCtx.font = textFont2;
    endScreenCtx.fillText("Pieces taken by Player 1: " + score1, 180, 370);
    endScreenCtx.fillText("Pieces taken by Player 2: " + score2, 180, 400);
}