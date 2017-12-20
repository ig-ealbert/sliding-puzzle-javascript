var gameState = initializeGameState();
gameState = createSolvablePuzzleState(gameState);
addClickHandlers();

function initializeGameState() {
	var board = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]]; // 0 = x
	return board;
}

function createSolvablePuzzleState(board) {
	for (var steps = 0; steps < 100; steps++) {
		randomMove();
	}
	resetMessageAndButton();
	return board;
}

function randomMove() {
	var validMove = false;
	var xOffset, yOffset, xSwapLocation, ySwapLocation;
	var xPiece = findXPiece();
	while (!validMove) {
		xOffset = getRandomInt(-1, 1);
		yOffset = getRandomInt(-1, 1);
		xSwapLocation = xPiece[0] + xOffset;
		ySwapLocation = xPiece[1] + yOffset;
		validMove = isAdjacentToX(xSwapLocation, ySwapLocation) && 
					isOnBoard(xSwapLocation, ySwapLocation)
	}
	swapWithXPiece(xSwapLocation, ySwapLocation);
}

function isOnBoard(x, y) {
	return x >= 0 && x < 4 && y >= 0 && y < 4;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetMessageAndButton() {
	var messageDiv = document.getElementById("message");
	messageDiv.innerHTML = "";
	var resetButton = document.getElementById("restartGame");
	resetButton.classList.remove("greenBorder");
}

function addClickHandlers() {
	var table = document.getElementById("puzzle");
	var cells = table.getElementsByTagName("td");
	for (var cell of cells) {
		cell.onclick = function() {
			swapWithXPiece(this.parentNode.rowIndex, this.cellIndex);
		};
	}
}

function findXPiece() {
	for (var r = 0; r < gameState.length; r++) {
		if (gameState[r].indexOf(0) !== -1) {
			return [r, gameState[r].indexOf(0)];
		}
	}
	return [-1, -1];
}

function swapWithXPiece(clickedRow, clickedCol) {
	if (isAdjacentToX(clickedRow, clickedCol)) {
		var xPiece = findXPiece();
		swapPiecesInUI([clickedRow, clickedCol], xPiece);
		var temp = gameState[clickedRow][clickedCol];
		gameState[clickedRow][clickedCol] = 0;
		gameState[xPiece[0]][xPiece[1]] = temp;
		updateUIIfGameWon();
	}
}

function isAdjacentToX(clickedRow, clickedCol) {
	var xPiece = findXPiece();
	var above = xPiece[1] === clickedCol && xPiece[0] === clickedRow + 1;
	var below = xPiece[1] === clickedCol && xPiece[0] === clickedRow - 1;
	var left = xPiece[1] === clickedCol + 1 && xPiece[0] === clickedRow;
	var right = xPiece[1] === clickedCol - 1 && xPiece[0] === clickedRow;
	return above || below || left || right;
}

function swapPiecesInUI(clickedPiece, xPiece) {
	var table = document.getElementById("puzzle");
	var row = table.getElementsByTagName("tr")[clickedPiece[0]];
	var cell = row.getElementsByTagName("td")[clickedPiece[1]];
	var xRow = table.getElementsByTagName("tr")[xPiece[0]];
	var xCell = xRow.getElementsByTagName("td")[xPiece[1]];
	cell.innerHTML = "x";
	xCell.innerHTML = gameState[clickedPiece[0]][clickedPiece[1]];
}

function updateUIIfGameWon() {
	if (checkForWin()) {
		var messageDiv = document.getElementById("message");
		messageDiv.innerHTML = "You won the game!";
		var resetButton = document.getElementById("restartGame");
		resetButton.classList.add("greenBorder");
	}
}

function checkForWin() {
	var winState = initializeGameState();
	for (var i = 0; i < gameState.length; i++) {
		for (var j = 0; j < gameState[i].length; j++) {
			if (gameState[i][j] !== winState[i][j]) {
				return false;
			}
		}
	}
	return true;
}
