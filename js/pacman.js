'use strict'
// 😁

const PACMAN = '<img class="pacman" src="img/PacmanPNG.png">'

var gPacman
function createPacman(board) {
	// DONE: initialize gPacman...
	gPacman = {
		location: {
			i: 2,
			j: 2,
		},
		isSuper: false,
		currCellContent: EMPTY,
	}
	board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
	if (!gGame.isOn) return
	
	// DONE: use getNextLocation(), nextCell
	const nextLocation = getNextLocation(ev.key)
	const nextCell = gBoard[nextLocation.i][nextLocation.j]
	let keepSuperfoodForLater = false
	
	// DONE: return if cannot move
	if (nextCell === WALL) return

	else if (nextCell === FOOD) updateScore(1)
	else if (nextCell === CHERRY) {
		updateScore(10)
	}

	else if (nextCell.isGhost) {
		if (gPacman.isSuper) {
			updateScore(25)
            eatGhost(nextCell)
		} else {
            gameOver()
            return
        }
	}

	else if (nextCell === SUPER_FOOD) {
		if (gPacman.isSuper)
			keepSuperfoodForLater = true
		else {
			updateScore(1)
			isSuper()
		}
	}

	// DONE: moving from current location:

    // todo: CAN'T MAKE PACMAN SKIP SUPERFOOD WHEN IN SUPER MODE
	// DONE: update the model

	gBoard[gPacman.location.i][gPacman.location.j] = gPacman.currCellContent

	// DONE: update the DOM
	renderCell(gPacman.location, gPacman.currCellContent)

	// DONE: Move the pacman to new location:
	// DONE: update the model
	gPacman.location = nextLocation

	gBoard[nextLocation.i][nextLocation.j] = PACMAN
	// gPacman.currCellContent = EMPTY
	// DONE: update the DOM
	renderCell(gPacman.location, PACMAN)

	gPacman.currCellContent = EMPTY
	if (keepSuperfoodForLater) {
		gPacman.currCellContent = SUPER_FOOD
	}

	flipPacman(ev.key)

	checkWin()
}

function getNextLocation(eventKeyboard) {
	// console.log('eventKeyboard:', eventKeyboard)
	const nextLocation = {
		i: gPacman.location.i,
		j: gPacman.location.j,
	}
	// DONE: figure out nextLocation
	switch (eventKeyboard) {
		case 'ArrowUp':
			nextLocation.i--
			break
		case 'ArrowRight':
			nextLocation.j++
			break
		case 'ArrowDown':
			nextLocation.i++
			break
		case 'ArrowLeft':
			nextLocation.j--
			break
	}
	return nextLocation
}

function flipPacman(eventKeyboard) {
	const elPacman = document.querySelector('.pacman')

	switch (eventKeyboard) {
		case 'ArrowUp':
			elPacman.classList.add('pacman-up')
			break
		case 'ArrowRight':
			elPacman.classList.add('pacman-right')
			break
		case 'ArrowDown':
			elPacman.classList.add('pacman-down')
			break
		case 'ArrowLeft':
			elPacman.classList.add('pacman-left')
			break
	}
}
