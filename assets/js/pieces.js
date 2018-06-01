'use strict'

function Piece(type, colour, col, row, IN_PLAY, CAPTURED, id, team1)
{
    this.type = type;
    this.colour = colour;
    this.col = col;
    this.row = row;
    this.IN_PLAY = IN_PLAY;
    this.CAPTURED = CAPTURED;
    this.id = id;
    this.team1 = team1;
}

Piece.prototype.movement = function()
{

    if (this.type === 'PAWN')
    {
        this.up = 0;
        this.down = 2;
        this.left = 0;
        this.right = 0;
        this.diag = 0;

        return { up: this.up, down: this.down, left: this.left, right: this.right, diag: this.diag }
    }

    if (this.type === 'CASTLE')
    {
        this.up = 8;
        this.down = 8;
        this.left = 8;
        this.right = 8;
        this.diag = 0;

        return { up: this.up, down: this.down, left: this.left, right: this.right, diag: this.diag }
    }

    if (this.type === 'KNIGHT')
    {
        this.up = 2;
        this.down = 2;
        this.left = 3;
        this.right = 3;
        this.diag = 0;

        return { up: this.up, down: this.down, left: this.left, right: this.right, diag: this.diag }
    }

    if (this.type === 'BISHOP')
    {
        this.up = 0;
        this.down = 0;
        this.left = 0;
        this.right = 0;
        this.diag = 8;

        return { up: this.up, down: this.down, left: this.left, right: this.right, diag: this.diag }
    }

    if (this.type === 'KING')
    {
        this.up = 2;
        this.down = 2;
        this.left = 2;
        this.right = 2;
        this.diag = 2;

        return { up: this.up, down: this.down, left: this.left, right: this.right, diag: this.diag }
    }

    if (this.type === 'QUEEN')
    {
        this.up = 8;
        this.down = 8;
        this.left = 8;
        this.right = 8;
        this.diag = 8;

        return { up: this.up, down: this.down, left: this.left, right: this.right, diag: this.diag }
    }
}

Piece.prototype.taking = function () {
    if (this.type === "PAWN") {

        // refers too how many spaces the code should look through to check if taking requirements met
        this.TAKE_UP = 0;
        this.TAKE_DOWN = 0;
        this.TAKE_LEFT = 0;
        this.TAKE_RIGHT = 0;
        this.TAKE_DIAG = 1;

        return { UP: this.TAKE_UP, DOWN: this.TAKE_DOWN, LEFT: this.TAKE_LEFT, RIGHT: this.TAKE_RIGHT, DIAG: this.TAKE_DIAG };
    }
}

// Defines pawn pieces for black team 
var pawn1 = new Piece('PAWN', chessPieceColourA, 1, 0, true, false, 'pawn1', true);
var pawn2 = new Piece('PAWN', chessPieceColourA, 1, 1, true, false, 'pawn2', true); 
var pawn3 = new Piece('PAWN', chessPieceColourA, 1, 2, true, false, 'pawn3', true);
var pawn4 = new Piece('PAWN', chessPieceColourA, 1, 3, true, false, 'pawn4', true);
var pawn5 = new Piece('PAWN', chessPieceColourA, 1, 4, true, false, 'pawn5', true);
var pawn6 = new Piece('PAWN', chessPieceColourA, 1, 5, true, false, 'pawn6', true);
var pawn7 = new Piece('PAWN', chessPieceColourA, 1, 6, true, false, 'pawn7', true);
var pawn8 = new Piece('PAWN', chessPieceColourA, 1, 7, true, false, 'pawn8', true);

var castle1 = new Piece('CASTLE', chessPieceColourA, 0, 0, true, false, 'castle1', true);
var castle2 = new Piece('CASTLE', chessPieceColourA, 0, 7, true, false, 'castle2', true);

var knight1 = new Piece('KNIGHT', chessPieceColourA, 0, 1, true, false, 'knight1', true);
var knight2 = new Piece('KNIGHT', chessPieceColourA, 0, 6, true, false, 'knight2', true);

var bishop1 = new Piece('BISHOP', chessPieceColourA, 0, 2, true, false, 'bishop1', true);
var bishop2 = new Piece('BISHOP', chessPieceColourA, 0, 5, true, false, 'bishop2', true);

var king1 = new Piece('KING', chessPieceColourA, 0, 3, true, false, 'king1', true);
var queen1 = new Piece('QUEEN', chessPieceColourA, 0, 4, true, false, 'queen1', true);

// Opposing team pieces

var pawn9 = new Piece('PAWN', chessPieceColourB, 6, 0, true, false, 'pawn9', false);
var pawn10 = new Piece('PAWN', chessPieceColourB, 6, 1, true, false, 'pawn10', false); 
var pawn11 = new Piece('PAWN', chessPieceColourB, 6, 2, true, false, 'pawn11', false);
var pawn12 = new Piece('PAWN', chessPieceColourB, 6, 3, true, false, 'pawn12', false);
var pawn13 = new Piece('PAWN', chessPieceColourB, 6, 4, true, false, 'pawn13', false);
var pawn14 = new Piece('PAWN', chessPieceColourB, 6, 5, true, false, 'pawn14', false);
var pawn15 = new Piece('PAWN', chessPieceColourB, 6, 6, true, false, 'pawn15', false);
var pawn16 = new Piece('PAWN', chessPieceColourB, 6, 7, true, false, 'pawn16', false);

var castle3 = new Piece('CASTLE', chessPieceColourB, 7, 0, true, false, 'castle3', false);
var castle4 = new Piece('CASTLE', chessPieceColourB, 7, 7, true, false, 'castle4', false);

var knight3 = new Piece('KNIGHT', chessPieceColourB, 7, 1, true, false, 'knight3', false);
var knight4 = new Piece('KNIGHT', chessPieceColourB, 7, 6, true, false, 'knight4', false);

var bishop3 = new Piece('BISHOP', chessPieceColourB, 7, 2, true, false, 'bishop3', false);
var bishop4 = new Piece('BISHOP', chessPieceColourB, 7, 5, true, false, 'bishop4', false);

var king2 = new Piece('KING', chessPieceColourB, 7, 3, true, false, 'king2', false);
var queen2 = new Piece('QUEEN', chessPieceColourB, 7, 4, true, false, 'queen2', false);

piecesArray.push(pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8, castle1, castle2, knight1, knight2, bishop1, bishop2, king1, queen1, pawn9, pawn10, pawn11, pawn12, pawn13, pawn14, pawn15, pawn16, castle3, castle4, knight3, knight4, bishop3, bishop4, king2, queen2)

// adding special flags
piecesArray.forEach(function (value) {
    if (value.type === "PAWN") {
        value.F_TURN = true;
        value.TAKE_FORWARD = true;
    }
})