exports.__esModule = true;
const numberToLetterMap = ['A','B','C','D','E','F','G','H'];
const defaultCellOptions = (row) =>  ({piece: '', color: null, caption: row});
function buildBoard(flip = false) {
    const board = document.getElementById('board');
    let rows = [8, 7, 6, 5, 4, 3, 2, 1];
    rows = flip ? rows.reverse() : rows;
    rows.forEach( row => {
        const color = row === 8 || row === 7 ? 'black' : row === 1 || row === 2 ? 'white' : undefined;
        const boardRow = buildRank(color, row);
        flip && boardRow.classList.add('flip');
        board.appendChild(boardRow);
    })

}

exports.buildBoard = buildBoard;

// ♗  ♘ ♕ ♔ ♖
function buildRank(color, rankNum) {
    const row = document.createElement('div');
    row.classList.add('row');
    let p;
    switch( rankNum) {
        case 8:
        case 1:
            ['♖','♘','♗','♕','♔','♗','♘','♖'].forEach( (piece, index) => {
                const caption = rankNum === 1 ? rankNum + numberToLetterMap[index] : rankNum;
                p = buildCell(rankNum, index +1, {piece,color, caption});
                row.appendChild(p);
            });
            break;
        case 2:
        case 7:
            ['♙','♙','♙','♙','♙','♙','♙','♙'].forEach( (piece, index) => {
                p = buildCell(rankNum, index + 1, {piece, color});
                row.appendChild(p);
            });
            break;
        default:
            [1,2,3,4,5,6,7,8].forEach(col => {
                p = buildCell(rankNum, col );
                row.appendChild(p);
            })
    }
    return row;
}


function buildCell(row, col, cellOptions) {
    const {piece, color, caption} = cellOptions ? {...defaultCellOptions(row), ...cellOptions} : defaultCellOptions(row);
    const p = document.createElement('p');
    p.classList.add('cell');
    p.dataset.row = row;
    p.dataset.col = col;
    color && p.classList.add(color);
    if( col === 1 || row === 1) {
        const captionSpan = document.createElement('span');
        captionSpan.classList.add('caption');
        captionSpan.innerText = caption;
        p.appendChild(captionSpan);
    }
    const pieceSpan = document.createElement('span');
    pieceSpan.classList.add('piece');
    pieceSpan.innerText = piece;
    p.appendChild(pieceSpan);
    return p;
}
