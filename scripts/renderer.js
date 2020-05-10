const {getCellColor, boardToObject, ENPASSANTABLE_CLASS,getPieceSpan, getCell } = requireUtils;
const { piecesMap } = requirePieces;
const isValid = requireValidator;

class BoardConfig {
    constructor() {
        this.__player = 'white';
        this.dragableItem = undefined;
        buildNewBoard();
        this.move();
        this.setPlayerTitle()
    }

    move() {
        move(this.__player)
    }
    togglePlayer(){
        this.__player = this.__player === 'white' ? 'black' : 'white';
        this.move();
        this.setPlayerTitle()
    }

    setDragableItem(value) {
        this.dragableItem = value;
    }

    getDragableItem() {
        return this.dragableItem;
    }

    setPlayerTitle() {
        document.getElementById('player').innerHTML = this.__player;
    }
}

const boardConfig = new BoardConfig();
let errorTimeouts = [];
function move(player) {
    const allPieces = document.getElementsByClassName('cell');
    const blackPieces = document.getElementsByClassName('black');
    const whitePieces = document.getElementsByClassName('white');
    for (let item of allPieces) {
        disableDraggable(item);
        disableDropable(item);
    }

    if (player === 'white') {
        for (let item of whitePieces) {
            enableDragable(item)
        }
    }else {
        for (let item of blackPieces) {
            enableDragable(item)
        }
    }
    for (let item of allPieces) {
        enableDropable(item);
    }
}


function enableDragable(item) {
    item.draggable = true;
    item.ondragstart = onDragStart
}

function disableDraggable(item) {
    item.draggable = false;
    item.ondragstart = onDragStart
}

function enableDropable(item) {
    item.ondragover = allowDrop;
    item.ondrop = drop;
}

function disableDropable(item) {
    item.ondragover = undefined;
    item.ondrop = undefined;
}

function drop(event) {
    event.preventDefault();
    const fromCell = boardConfig.getDragableItem();
    const toCell = event.target.classList.contains('cell') ? event.target : event.target.parentElement;
    if(changeCell(fromCell, toCell)) {
        checkForEnpassant(fromCell, toCell);
    }
    boardConfig.setDragableItem();
}

function onDragStart(event) {
    boardConfig.setDragableItem(event.target);
}

function allowDrop(ev) {
    ev.preventDefault();
}


function changeCell(from, to) {
    const color = from.classList.contains('white') ? 'white' : 'black';
    const fromSpan = getPieceSpan(from);
    const fromCell = getDataFromCell(from);
    const toCell = getDataFromCell(to);
    if( _.isEqual(fromCell, toCell)) {
        return false;
    }
    if (isValid(fromCell, toCell)) { // TODO: check if this move is valid.
        if(to.classList.contains(ENPASSANTABLE_CLASS)){
            const enemyPiece = getCell(fromCell.row, toCell.col);
            const pieceSpan = getPieceSpan(enemyPiece);
            pieceSpan.innerText = '';
            enemyPiece.classList.remove(getCellColor(enemyPiece));
        }
        to.classList.remove(getCellColor(to));
        getPieceSpan(to).innerText = fromSpan.innerText;
        fromSpan.innerText = '';
        to.classList.add(color);
        from.classList.remove(color);
        boardConfig.togglePlayer();
        return true;
    } else {
        showError(from);
    }

}

function checkForEnpassant(from, to) {
    const board = boardToObject();
    clearAllEnpassant();
    const fromCell = getDataFromCell(from);
    const toCell = getDataFromCell(to);
    const piece = getPieceSpan(to);
    if( piece.innerText === piecesMap.PAWN.symbol && ((fromCell.row === 2 && toCell.row === 4) || (fromCell.row === 7 && toCell.row === 5)) ) {
        const enpassantRow = (fromCell.row + toCell.row) / 2;
        board[enpassantRow][fromCell.col].classList.add(ENPASSANTABLE_CLASS);
    }

    function clearAllEnpassant() {
        board["3"].forEach( cell => cell.classList.remove(ENPASSANTABLE_CLASS));
        board["6"].forEach( cell => cell.classList.remove(ENPASSANTABLE_CLASS));
    }
}

function showError(cell) {
    const addError = () => cell.classList.add('error');
    const removeError = () => cell.classList.remove('error');
    errorTimeouts.forEach( timeout => clearTimeout(timeout));
    errorTimeouts.push(setTimeout(addError , 0));
    errorTimeouts.push(setTimeout(removeError , 100));
    errorTimeouts.push(setTimeout(addError , 150));
    errorTimeouts.push(setTimeout(removeError , 250));
    errorTimeouts.push(setTimeout(addError , 300));
    errorTimeouts.push(setTimeout(removeError , 400));
}

function getDataFromCell(cell) {
    return {row: Number(cell.dataset.row), col: Number(cell.dataset.col)}
}


