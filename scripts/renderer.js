
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
        const newPlayer = this.__player === 'white' ? 'black' : 'white';
        this.__player = newPlayer;
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

function move(player) {
    const allPieces = document.getElementsByClassName('cell');
    const blackPieces = document.getElementsByClassName('black');
    const whitePieces = document.getElementsByClassName('white');
    for (let item of allPieces) {
        disableDraggable(item);
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
    if (true) { // TODO: check if this move is valid.
        disableDraggable(from);
        enableDragable(to);
        enableDropable(from);
        disableDropable(to);
        to.innerHTML = piece;
        from.innerHTML = '';
        to.classList.add(color);
        from.classList.remove(color);
        boardConfig.togglePlayer();
    }

}
