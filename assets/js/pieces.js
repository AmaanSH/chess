'use strict'

function Piece(type, colour, col, row, CAPTURED, id, team1, inTake, piecesTaken)
{
    this.type = type;
    this.colour = colour;
    this.col = col;
    this.row = row;
    this.CAPTURED = CAPTURED;
    this.id = id;
    this.team1 = team1;
    this.inTake = inTake;
    this.piecesTaken = 0;
}

Piece.prototype.movement = function()
{

    if (this.type === 'PAWN')
    {
        this.up = 0;
        this.down = 1;
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
        this.up = 1;
        this.down = 1;
        this.left = 2;
        this.right = 2;
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
        this.up = 1;
        this.down = 1;
        this.left = 1;
        this.right = 1;
        this.diag = 1;

        return { up: this.up, down: this.down, left: this.left, right: this.right, diag: this.diag }
    }

    if (this.type === 'QUEEN')
    {
        this.up = 7;
        this.down = 7;
        this.left = 7;
        this.right = 7;
        this.diag = 7;

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

    if (this.type === "BISHOP") {

        // refers too how many spaces the code should look through to check if taking requirements met
        this.TAKE_UP = 0;
        this.TAKE_DOWN = 0;
        this.TAKE_LEFT = 0;
        this.TAKE_RIGHT = 0;
        this.TAKE_DIAG = 7;

        return { UP: this.TAKE_UP, DOWN: this.TAKE_DOWN, LEFT: this.TAKE_LEFT, RIGHT: this.TAKE_RIGHT, DIAG: this.TAKE_DIAG };
    }

    if (this.type === "QUEEN") {

        // refers too how many spaces the code should look through to check if taking requirements met
        this.TAKE_UP = 7;
        this.TAKE_DOWN = 7;
        this.TAKE_LEFT = 7;
        this.TAKE_RIGHT = 7;
        this.TAKE_DIAG = 7;

        return { UP: this.TAKE_UP, DOWN: this.TAKE_DOWN, LEFT: this.TAKE_LEFT, RIGHT: this.TAKE_RIGHT, DIAG: this.TAKE_DIAG };
    }

    if (this.type === "KING") {

        // refers too how many spaces the code should look through to check if taking requirements met
        this.TAKE_UP = 1;
        this.TAKE_DOWN = 1;
        this.TAKE_LEFT = 1;
        this.TAKE_RIGHT = 1;
        this.TAKE_DIAG = 1;

        return { UP: this.TAKE_UP, DOWN: this.TAKE_DOWN, LEFT: this.TAKE_LEFT, RIGHT: this.TAKE_RIGHT, DIAG: this.TAKE_DIAG };
    }

    if (this.type === "CASTLE") {

        // refers too how many spaces the code should look through to check if taking requirements met
        this.TAKE_UP = 8;
        this.TAKE_DOWN = 8;
        this.TAKE_LEFT = 8;
        this.TAKE_RIGHT = 8;
        this.TAKE_DIAG = 0;

        return { UP: this.TAKE_UP, DOWN: this.TAKE_DOWN, LEFT: this.TAKE_LEFT, RIGHT: this.TAKE_RIGHT, DIAG: this.TAKE_DIAG };
    }

    if (this.type === "KNIGHT") {

        // refers too how many spaces the code should look through to check if taking requirements met
        this.TAKE_UP = 1;
        this.TAKE_DOWN = 1;
        this.TAKE_LEFT = 1;
        this.TAKE_RIGHT = 1;
        this.TAKE_DIAG = 0;

        return { UP: this.TAKE_UP, DOWN: this.TAKE_DOWN, LEFT: this.TAKE_LEFT, RIGHT: this.TAKE_RIGHT, DIAG: this.TAKE_DIAG };
    }
}

// Defines pawn pieces for black team 
var pawn1 = new Piece('PAWN', chessPieceColourA, 1, 0, false, 'pawn1', true, false);
var pawn2 = new Piece('PAWN', chessPieceColourA, 1, 1, false, 'pawn2', true, false); 
var pawn3 = new Piece('PAWN', chessPieceColourA, 1, 2, false, 'pawn3', true, false);
var pawn4 = new Piece('PAWN', chessPieceColourA, 1, 3, false, 'pawn4', true, false);
var pawn5 = new Piece('PAWN', chessPieceColourA, 1, 4, false, 'pawn5', true, false);
var pawn6 = new Piece('PAWN', chessPieceColourA, 1, 5, false, 'pawn6', true, false);
var pawn7 = new Piece('PAWN', chessPieceColourA, 1, 6, false, 'pawn7', true, false);
var pawn8 = new Piece('PAWN', chessPieceColourA, 1, 7, false, 'pawn8', true, false);

var castle1 = new Piece('CASTLE', chessPieceColourA, 0, 0, false, 'castle1', true, false);
var castle2 = new Piece('CASTLE', chessPieceColourA, 0, 7, false, 'castle2', true, false);

var knight1 = new Piece('KNIGHT', chessPieceColourA, 0, 1, false,'knight1', true, false);
var knight2 = new Piece('KNIGHT', chessPieceColourA, 0, 6, false, 'knight2', true, false);

var bishop1 = new Piece('BISHOP', chessPieceColourA, 0, 2, false, 'bishop1', true, false);
var bishop2 = new Piece('BISHOP', chessPieceColourA, 0, 5, false, 'bishop2', true, false);

var king1 = new Piece('KING', chessPieceColourA, 0, 3, false, 'king1', true, false);
var queen1 = new Piece('QUEEN', chessPieceColourA, 0, 4, false, 'queen1', true, false);

// Opposing team pieces

var pawn9 = new Piece('PAWN', chessPieceColourB, 6, 0, false, 'pawn9', false, false);
var pawn10 = new Piece('PAWN', chessPieceColourB, 6, 1, false, 'pawn10', false, false); 
var pawn11 = new Piece('PAWN', chessPieceColourB, 6, 2, false, 'pawn11', false, false);
var pawn12 = new Piece('PAWN', chessPieceColourB, 6, 3, false, 'pawn12', false, false);
var pawn13 = new Piece('PAWN', chessPieceColourB, 6, 4, false, 'pawn13', false, false);
var pawn14 = new Piece('PAWN', chessPieceColourB, 6, 5, false, 'pawn14', false, false);
var pawn15 = new Piece('PAWN', chessPieceColourB, 6, 6, false, 'pawn15', false, false);
var pawn16 = new Piece('PAWN', chessPieceColourB, 6, 7, false, 'pawn16', false, false);

var castle3 = new Piece('CASTLE', chessPieceColourB, 7, 0, false,  'castle3', false, false);
var castle4 = new Piece('CASTLE', chessPieceColourB, 7, 7, false,  'castle4', false, false);

var knight3 = new Piece('KNIGHT', chessPieceColourB, 7, 1, false,  'knight3', false, false);
var knight4 = new Piece('KNIGHT', chessPieceColourB, 7, 6, false,  'knight4', false, false);
                                                           false
var bishop3 = new Piece('BISHOP', chessPieceColourB, 7, 2, false,  'bishop3', false, false);
var bishop4 = new Piece('BISHOP', chessPieceColourB, 7, 5, false,  'bishop4', false, false);

var king2 = new Piece('KING', chessPieceColourB, 7, 3, false, 'king2', false, false);
var queen2 = new Piece('QUEEN', chessPieceColourB, 7, 4, false, 'queen2', false, false);

piecesArray.push(pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8, castle1, castle2, knight1, knight2, bishop1, bishop2, king1, queen1, pawn9, pawn10, pawn11, pawn12, pawn13, pawn14, pawn15, pawn16, castle3, castle4, knight3, knight4, bishop3, bishop4, king2, queen2)

// adding special flags
piecesArray.forEach(function (value) {
    if (value.type === "PAWN") {
        value.F_TURN = true;
        value.TAKE_FORWARD = true;
    }
});