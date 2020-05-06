const {getCellColor} = requireUtils;

const isValid = requireValidator;

class BoardConfig {
    constructor() {
        this.__player = 'white';
        this.dragableItem = undefined;
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
    const toCell = event.target;
    changeCell(fromCell, toCell);
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
    const piece = from.innerHTML;
    const fromCell = {row: Number(from.dataset.row), col: Number(from.dataset.col)};
    const toCell = {row: Number(to.dataset.row), col: Number(to.dataset.col)};
    if (isValid(fromCell, toCell)) { // TODO: check if this move is valid.
        to.classList.remove(getCellColor(to));
        to.innerHTML = piece;
        from.innerHTML = '';
        to.classList.add(color);
        from.classList.remove(color);
        boardConfig.togglePlayer();
    } else {
        showError(from);
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


