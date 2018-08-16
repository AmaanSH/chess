'use strict';

// GLOABAL SPACE NEEDS SORTING OUT!! 

// --------------------------

var canvas = document.getElementById("chessBoard");
var ctx = canvas.getContext("2d");

var chessCanvas = document.getElementById("chessPieces");
var ctx2 = chessCanvas.getContext("2d");

var hightlightCanvas = document.getElementById("chessHighlight");
var ctx3 = hightlightCanvas.getContext('2d');

var endScreenCanvas = document.getElementById('endScreen');
var endScreenCtx = endScreenCanvas.getContext('2d');

document.querySelector("#endScreen").style.display = "none";

var player1Turn = true;
var player2Turn = false;
var beingBlocked = false;

// --------------------------

var chessBoardSquareA = 'black';
var chessBoardSquareB = 'white';

var chessPieceColourA = '#464A49';
var chessPieceColourB = 'black';

document.getElementById('turn-box').style.backgroundColor = chessPieceColourA;

var textColour = 'white';
var score1 = 0;
var score2 = 0;

const gridSquareSize = 75;

// --------------------------


var gridArrayX = []; 
var gridArrayY = [];
var piecesArray = [];
var newPiecesArray = [];
var availableMoves = [];
var takeArray = [];
var kingTakeableSpaces = [];

var row = ["A", "B", "C", "D", "E", "F", "G", "H"];

// 2d array
var boardGridArray = new Array(8)

for (var i = 0; i < 8; i++)
{
    boardGridArray[i] = new Array(8);
}

// --------------------------


var clickPosX;
var clickPosY;

var pieceClicked = false;
var taking = false;

var mouse = 
{
    x: undefined,
    y: undefined
}


// --------------------------

var gridStatus = 
{
    A0: false,
    A1: false,
    A2: false,
    A3: false,
    A4: false,
    A5: false,
    A6: false,
    A7: false,

    B0: false,
    B1: false,
    B2: false,
    B3: false,
    B4: false,
    B5: false,
    B6: false,
    B7: false,

    C0: false,
    C1: false,
    C2: false,
    C3: false,
    C4: false,
    C5: false,
    C6: false,
    C7: false,

    D0: false,
    D1: false,
    D2: false,
    D3: false,
    D4: false,
    D5: false,
    D6: false,
    D7: false,

    E0: false,
    E1: false,
    E2: false,
    E3: false,
    E4: false,
    E5: false,
    E6: false,
    E7: false,

    F0: false,
    F1: false,
    F2: false,
    F3: false,
    F4: false,
    F5: false,
    F6: false,
    F7: false,

    G0: false,
    G1: false,
    G2: false,
    G3: false,
    G4: false,
    G5: false,
    G6: false,
    G7: false,
}


// --------------------------