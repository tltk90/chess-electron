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

exports.getCellColor = getCellColor;
exports.boardToObject = boardToObject;
