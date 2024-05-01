'use strict'

const GHOST = /^<img class="ghost ghost\d+" src="img\/Ghost\d+\.png">$/

var gGhosts = []
var gIdx = 1

function createGhosts() {

    for (var i = 0; i < 3; i++) {
        var ghost = createGhost(gBoard)
        gGhosts.push(ghost)
    }
}
    
function createGhost(board) {
    const randNum = getRandomIntInclusive(1, 5)
    const randGhostImg = `<img class="ghost ghost${gIdx}" src="img/Ghost${randNum}.png">`

    var ghost = {
        location: { i: 2, j: 6 },
        isEaten: false,
        img: randGhostImg,
        id: gIdx++
    }

    board[ghost.location.i][ghost.location.j].push(ghost.img)

    return ghost
}

function moveGhosts() {
    
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
    }
}

function moveGhost(ghost) {


    var currCell = ghost.location
    var nextCell = getNextCell(ghost.location)
    
    if(gBoard[nextCell.i][nextCell.j].at(-1) === WALL) {
        moveGhost(ghost)
        return
    }
    
    if(GHOST.test(gBoard[nextCell.i][nextCell.j].at(-1))) {
        moveGhost(ghost)
        return
    }
    
    if(gBoard[nextCell.i][nextCell.j].at(-1) === gPacman.img) {
        if(gPacman.isSuper) return
        gameOver()
        return
    }
    
    gBoard[currCell.i][currCell.j].pop()
    renderCell(currCell)
    
    ghost.location = nextCell  
    
    gBoard[nextCell.i][nextCell.j].push(ghost.img)
    renderCell(nextCell)
}

function getNextCell(location) {
    
    const optCells = [
        { i: location.i + 1, j: location.j },
        { i: location.i - 1, j: location.j },
        { i: location.i, j: location.j + 1 },
        { i: location.i, j: location.j - 1 }]

    const nextCell = optCells[getRandomIntInclusive(0, 3)]
    return nextCell
}

function turnGhostsBlue() {
    var ghostImgs = []

    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        ghostImgs.push(ghost.img)
        ghost.img = `<img class="ghost ghost${ghost.id}" src="img/GhostBlue.png">`
    }

    setTimeout(() => {
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].img = ghostImgs[i]
        }
    }, 5000)
}