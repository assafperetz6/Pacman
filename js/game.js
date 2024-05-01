'use strict'
const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '🍬'
const CHERRY = '🍒'
const EMPTY = ''

var gGame = {
	score: 0,
	isOn: false,
}

var gBoard
var gGhostInterval
var gCherriesInterval

function init() {
	gGame.isOn = true

	gBoard = createBoard()
	createGhosts()
	createPacman(gBoard)
	console.table(gBoard)
	renderBoard(gBoard)

	gGhostInterval = setInterval(moveGhosts, 800)
	getCherries()

	document.body.addEventListener('keydown', movePacman)

	const resetBtn = document.querySelector('.reset-game')
	resetBtn.addEventListener('click', resetGame)
}

function createBoard() {
	var size = 10
	var board = []

	for (var i = 0; i < size; i++) {
		board[i] = []
		for (var j = 0; j < size; j++) {
			if (
				i === 0 ||
				i === size - 1 ||
				j === 0 ||
				j === size - 1 ||
				(i >= 5 && i < size - 2 && j === 3)
			)
				board[i][j] = WALL
			else if (
				i + j === 2 ||
				i + j === 16 ||
				(i + j === 9 && Math.abs(i - j) === 7)
			) {
				board[i][j] = []
				board[i][j].push(SUPER_FOOD)
			} else {
				board[i][j] = []
				board[i][j].push(FOOD)
			}
		}
	}

	return board
}

function renderBoard(board) {
	var elTable = document.querySelector('.board')
	var strHtml = ''

	for (var i = 0; i < board.length; i++) {
		strHtml += '<tr>'
		for (var j = 0; j < board[i].length; j++) {
			strHtml += `<td class="cell cell-${i}-${j}">${board[i][j].at(-1)}</td>`
		}
		strHtml += '</tr>'
	}
	elTable.innerHTML = strHtml
}

function renderCell(location) {
	// Select the elCell and set the value
	const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
	elCell.innerHTML = gBoard[location.i][location.j].at(-1)
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

function getCherries() {
	gCherriesInterval = setInterval(() => {
		if (!gGame.isOn) clearInterval(gCherriesInterval)
		else getCherry()
	}, 5000)
}

function getCherry() {
	var emptyCells = []

	for (var i = 1; i < gBoard.length - 2; i++) {
		for (var j = 1; j < gBoard[i].length - 2; j++) {
			var currCell = gBoard[i][j].at(-1)
			if (currCell === EMPTY) emptyCells.push({ i, j })
		}
	}

	if (emptyCells.length === 0) return

	shuffleArr(emptyCells)
	gBoard[emptyCells[0].i][emptyCells[0].j].splice(0, 1, CHERRY)
	renderCell(emptyCells[0])

	setTimeout(() => {
		var cherryCell = gBoard[emptyCells[0].i][emptyCells[0].j]
		if (cherryCell[0] !== gPacman.img) {
			gBoard[emptyCells[0].i][emptyCells[0].j].splice(0, 1, EMPTY)
			renderCell(emptyCells[0])
		}
	}, 3000)
}

function isSuper() {
	gPacman.isSuper = true
	turnGhostsBlue()

	setTimeout(() => {
		gPacman.isSuper = false
	}, 5000)
}

function checkWin() {
	const elModal = document.querySelector('.modal')

	for (var i = 1; i <= 8; i++) {
		for (var j = 1; j <= 8; j++) {
			if (gBoard[i][j].includes(FOOD)) return
		}
	}

	clearInterval(gGhostInterval)

	gBoard[gPacman.location.i][gPacman.location.j].push('🥳')
	renderCell(gPacman.location)

	elModal.innerHTML = `You won!!!`
	gGame.isOn = false
}

function gameOver() {
	const elModal = document.querySelector('.modal')

	gGame.isOn = false

	gBoard[gPacman.location.i][gPacman.location.j].push('🪦')
	renderCell(gPacman.location)

	clearInterval(gGhostInterval)

	elModal.innerHTML = 'You lost... 😞'
}

function resetGame() {
	const elModal = document.querySelector('.modal')

	gGame.score = 0
	clearInterval(gGhostInterval)
	gGhosts = []
	elModal.innerHTML = ''
	init()
}
