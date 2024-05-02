'use strict'

var elGhosts = [`<img class="ghost" src="img/Ghost1.png">`, `<img class="ghost" src="img/Ghost2.png">`,
`<img class="ghost" src="img/Ghost3.png">`, `<img class="ghost" src="img/Ghost4.png">`,
`<img class="ghost" src="img/Ghost5.png">`]

var gGhosts = []
var gEatenGhosts = []

var gIntervalGhosts
var gIdx = 0

function createGhosts(board) {
    gGhosts = []
    shuffleArr(elGhosts)
    
    for (var i = 0; i < 3; i++) {
        createGhost(board, i)
    }

    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 300)
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
        // isEaten: false,
        img,
        id: ghostIdx
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = ghost.img
}

function moveGhosts() {

    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {

    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) {
        moveGhost(ghost)
        return
    }
    if (nextCell.isGhost) {
        moveGhost(ghost)
        return
    }

    if (nextCell === PACMAN) {
        if(gPacman.isSuper) return
        else {
            gameOver()
            return
        }
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    
    renderCell(ghost.location, ghost.currCellContent)

    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = ghost
    
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

function eatGhost(ghost) {

    gEatenGhosts.push(ghost)
    
    for (var i = 0; i < gGhosts.length; i++) {
        if(gGhosts[i] === ghost) gGhosts.splice(i, 1)
    }
}