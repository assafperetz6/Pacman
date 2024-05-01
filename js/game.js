'use strict'

const WALL = '#'
const FOOD = '.'
const CHERRY = '🍒'
const SUPER_FOOD = '🍬'
const EMPTY = ' '

const gGame = {
	score: 0,
	isOn: false,
}

var gBoard
getCherries()

function onInit() {
	document.querySelector(
		'.game-over-modal'
	).innerHTML = `<span class="restart-btn" onclick="onInit()">Restart</span>`

	elGhosts = [
		`<img class="ghost" src="img/Ghost1.png">`,
		`<img class="ghost" src="img/Ghost2.png">`,
		`<img class="ghost" src="img/Ghost3.png">`,
		`<img class="ghost" src="img/Ghost4.png">`,
		`<img class="ghost" src="img/Ghost5.png">`,
	]

	gBoard = buildBoard()
	createGhosts(gBoard)
	createPacman(gBoard)

	gGame.score = 0
	updateScore(0)

	renderBoard(gBoard)

	gGame.isOn = true
}

function buildBoard() {
	const size = 10
	const board = []

	for (var i = 0; i < size; i++) {
		board.push([])

		for (var j = 0; j < size; j++) {
			board[i][j] = FOOD

			if (
				i === 0 ||
				i === size - 1 ||
				j === 0 ||
				j === size - 1 ||
				(j === 3 && i > 4 && i < size - 2)
			) {
				board[i][j] = WALL
			}
			if (
				(i === 1 && j === 1) ||
				(i === 1 && j === size - 2) ||
				(i === size - 2 && j === 1) ||
				(i === size - 2 && j === size - 2)
			) {
				board[i][j] = SUPER_FOOD
			}
		}
	}
	return board
}

function renderBoard(board) {
	var strHTML = ''
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>'
		for (var j = 0; j < board[0].length; j++) {
			const cell = board[i][j]
			const className = `cell cell-${i}-${j}`

			strHTML += `<td class="${className}">${cell}</td>`
		}
		strHTML += '</tr>'
	}
	const elBoard = document.querySelector('.board')
	elBoard.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
	// Select the elCell and set the value
	const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
	elCell.innerHTML = value
}

function getCherries() {

	var getCherries = setInterval(() => {
		if(!gGame.isOn) {
			clearInterval(getCherries)
		}
		getCherry()
	}, 5000)
}

function getCherry() {
	var emptyCells = []

	for (var i = 1; i < gBoard.length - 2; i++) {
		for (var j = 1; j < gBoard[i].length - 2; j++) {
			var currCell = gBoard[i][j]
			if (currCell === EMPTY) emptyCells.push({ i, j })
		}
	}

	if(emptyCells.length === 0) return
	shuffleArr(emptyCells)
	
	gBoard[emptyCells[0].i][emptyCells[0].j] = CHERRY
	renderCell(emptyCells[0], CHERRY)
}

function updateScore(diff) {
	// DONE: update model
	if (!diff) {
		gGame.score = 0
	} else {
		gGame.score += diff
	}
	// DONE and dom
	document.querySelector('span.score').innerText = gGame.score
}

function isSuper() {
	const edibleGhosts = []

	gPacman.isSuper = true
	console.log('gPacman is super:', gPacman.isSuper)

	for (var i = 0; i < gGhosts.length; i++) {
	    edibleGhosts.push(gGhosts[i].img)
        gGhosts[i].img = '<img class="ghost blue" src="img/GhostBlue.png">'
	}

	setTimeout(() => {
		for (var i = 0; i < gGhosts.length; i++) {
		    gGhosts[i].img = edibleGhosts[i]
			gGhosts[i].isEaten = false
		}
		gPacman.isSuper = false
		console.log('gPacman is super:', gPacman.isSuper)
	}, 5000)
}

function checkWin() {
	const elGameOverModal = document.querySelector('.game-over-modal')

	for (var i = 1; i <= 8; i++) {
		for (var j = 1; j <= 8; j++) {
			if (gBoard[i][j] === FOOD) return
		}
	}
	clearInterval(gIntervalGhosts)
	renderCell(gPacman.location, '🥳')
	elGameOverModal.innerHTML = `<span>You won!</span><br /><span class="restart-btn" onclick="onInit()">Wanna play again?</span>`
	gGame.isOn = false
}

function gameOver() {
	const elGameOverModal = document.querySelector('.game-over-modal')

	console.log('Game Over')
	clearInterval(gIntervalGhosts)
	clearInterval(getCherries)
	renderCell(gPacman.location, '🪦')

	elGameOverModal.innerHTML = `<span>Game Over.</span><br /><span class="restart-btn" onclick="onInit()">Wanna play again?</span>`

	gGame.isOn = false
}
