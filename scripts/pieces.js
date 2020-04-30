exports.__esModule = true;
const PAWN = 'PAWN', ROCK = 'ROCK', BISHOP = 'BISHOP', KNIGHT = 'KNIGHT', QUEEN = 'QUEEN', KING = 'KING';
const piecesMap = {
    PAWN : {
        symbol: '♙',
        name: PAWN,

    },
    KNIGHT: {
        symbol: '♘',
        name: KNIGHT
    },
    BISHOP: {
        symbol: '♗',
        name: BISHOP
    },
    ROCK: {
        symbol: '♖',
        name: ROCK
    },
    QUEEN: {
        symbol: '♕',
        name: QUEEN
    },
    KING: {
        symbol: '♔',
        name: KING
    }
};
exports.piecesMap = piecesMap;
