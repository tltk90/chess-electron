exports.__esModule = true;

function getCellColor(item) {
    const classes = item.classList.values();
    let itemClass = classes.next();
    let color;
    while( !itemClass.done ) {
        if( itemClass.value !== 'cell') {
            color = itemClass.value;
        }
        itemClass = classes.next();
    }
    return color;
}

function boardToObject() {
    const board = document.getElementsByClassName('cell');
    const boardObj = {1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}};
    for(let cell of board) {
        boardObj[cell.dataset.row][cell.dataset.col] = cell;
    }
    return boardObj;
}

function isNotIntersect(from ,to) {
    const board = boardToObject();
    if(from.row === to.row) {
        const row = from.row;
        const factor = from.col < to.col ? 1 : -1;
        let col = from.col + factor;
        while(col !== to.col) {
            if(board[row][col].innerText !== '') return false;
            col += factor;
        }
    }else if(from.col === to.col) {
        const col = from.col;
        const factor = from.row < to.row ? 1 : -1;
        let row = from.row + factor;
        while(row !== to.row) {
            if(board[row][col].innerText !== '') return false;
            row += factor
        }
    }else {
        const colFactor = from.col < to.col ? 1 : -1;
        const rowFactor = from.row < to.row ? 1 : -1;
        let row = from.row + rowFactor;
        let col = from.col + colFactor;
        while( row !== to.row && col !== to.col) {
            if( board[row][col].innerText !== '') return false;
            row += rowFactor;
            col += rowFactor;
        }
    }
    return true;
}

exports.getCellColor = getCellColor;
exports.boardToObject = boardToObject;
exports.isNotIntersect = isNotIntersect;
