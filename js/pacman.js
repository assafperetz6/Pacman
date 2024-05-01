'use strict'

var gPacman

function createPacman(board) {

    gPacman = {
        location: { i: 2, j: 3},
        isSuper: false,
        img: '<img class="pacman" src="img/PacmanPNG.png">'
    }

    board[gPacman.location.i][gPacman.location.j].splice(0, 1, gPacman.img)
}


function movePacman(ev) {
    if(!gGame.isOn) return

    var currLocation = { i: gPacman.location.i, j: gPacman.location.j }
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if(nextCell.at(-1) === WALL) return
    
    if(GHOST.test(nextCell.at(-1))) {
        if(gPacman.isSuper) {
            updateScore(15)
        }
        else {
            gameOver()
            return
        }
    }
    
   else if(nextCell.at(-1) === FOOD) {
        updateScore(1)
    }

    else if(nextCell.at(-1) === CHERRY) {
        updateScore(10)
    }

    else if(nextCell.at(-1) === SUPER_FOOD) {
        updateScore(1)
        isSuper()
    }

    gBoard[currLocation.i][currLocation.j].splice(0, gBoard[currLocation.i][currLocation.j].length, EMPTY)
    renderCell(currLocation)
    
    gPacman.location = nextLocation

    nextCell.splice(0, 1, gPacman.img)

    renderCell(nextLocation)

    flipPacman(ev)
    checkWin()
}

function getNextLocation(ev) {
    var nextLocation = { i: gPacman.location.i, j: gPacman.location.j } 

    switch (ev.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;

        case 'ArrowDown':
            nextLocation.i++
            break;
            
        case 'ArrowLeft':
            nextLocation.j--
            break;

        case 'ArrowRight':
            nextLocation.j++
            break;
    }
    return nextLocation
}

function flipPacman(ev) {
    const elPacman = document.querySelector('.pacman')
    elPacman.className = 'pacman'

	switch (ev.code) {
		case 'ArrowUp':
			elPacman.classList.add('pacman-up')
			break
		case 'ArrowDown':
			elPacman.classList.add('pacman-down')
			break
		case 'ArrowLeft':
			elPacman.classList.add('pacman-left')
			break
	}
}