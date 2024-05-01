'use strict'

var elGhosts = [`<img class="ghost" src="img/Ghost1.png">`, `<img class="ghost" src="img/Ghost2.png">`,
`<img class="ghost" src="img/Ghost3.png">`, `<img class="ghost" src="img/Ghost4.png">`,
`<img class="ghost" src="img/Ghost5.png">`]
var gGhosts = []

var gIntervalGhosts
var gIdx = 0

function createGhosts(board) {
    
    // DONE: 3 ghosts and an interval
    gGhosts = []
    shuffleArr(elGhosts)
    for (var i = 0; i < 3; i++) {
        createGhost(board, i)
    }

    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board, ghostIdx) {
    const img = elGhosts[ghostIdx]
    
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        isGhost: true,
        isEaten: false,
        img
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = ghost.img
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {

    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]


    // DONE: return if cannot move
    if (ghost.isEaten) {
        var spawnCell = { i: 8, j: getRandomIntInclusive(2, 7)}
        ghost.location = spawnCell
        ghost.currCellContent = gBoard[spawnCell.i][spawnCell.j]
        renderCell(ghost.location, ghost.currCellContent)
        return
    }
    if (nextCell === WALL) return
    if (nextCell.isGhost)  return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if(gPacman.isSuper) return
        else {
            gameOver()
            return
        }
    }
    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = ghost
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span>${ghost.img}</span>`
}

function eatGhost(eatenGhost) {

    eatenGhost.isEaten = true
}