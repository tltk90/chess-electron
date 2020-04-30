const { piecesMap } = require('./pieces');
const {getCellColor, boardToObject, isNotIntersect} = require('./utils');
exports.__esModule = true;

function isValid(from ,to) {
    const boardAsObj = boardToObject();
    const fromPiece = boardAsObj[from.row][from.col];
    const toPiece = boardAsObj[to.row][to.col];
    const fromColor = getCellColor(fromPiece);
    const toColor = getCellColor(toPiece);
    if(toColor && fromColor === toColor) {
        return false;
    }
    switch(fromPiece.innerText) {
        case piecesMap.PAWN.symbol:
            const moveFactor = fromColor === 'black' ? -1 : 1;
            if(from.row === to.row) return false;
            if(Math.abs(from.col - to.col) === 1) {
                return toPiece.innerText !== '';
            }
            return from.col === to.col &&
                toPiece.innerText === '' &&
                (((from.row === 2 || from.row === 7) && to.row - from.row === 2 * moveFactor) || to.row - from.row === 1 * moveFactor);
            break;
        case piecesMap.KNIGHT.symbol:
            return (Math.abs(from.row - to.row) === 2 && Math.abs(from.col - to.col) === 1) ||
                (Math.abs(from.col - to.col) === 2 && Math.abs(from.row - to.row) === 1);
            break;
        case piecesMap.ROCK.symbol:
            return isNotIntersect(from, to) && ((from.row === to.row && from.col !== to.col) || (from.col === to.col && from.row !== to.row));
            break;
        case piecesMap.BISHOP.symbol:
                return isNotIntersect(from, to) && Math.abs(from.row - to.row) === Math.abs(from.col - to.col)
            break;
        case piecesMap.QUEEN.symbol:
            return isNotIntersect(from, to);
            break;
        case piecesMap.KING.symbol:
                return (Math.abs(from.row - to.row) <= 1 && Math.abs(to.col - to.col) <= 1) &&isNotIntersect(from, to)
            break;
        default:
            return false;
    }
}

exports.default = isValid;
