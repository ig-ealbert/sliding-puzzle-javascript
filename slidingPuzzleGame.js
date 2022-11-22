const messageDiv = document.getElementById("message");
const resetButton = document.getElementById("restartGame");
const table = document.getElementById("puzzle");

let gameState = initializeGameState();
createSolvablePuzzleState(gameState);
addClickHandlers();

function initializeGameState() {
  return [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]]; // 0 = x
}

function createSolvablePuzzleState() {
  for (let steps = 0; steps < 100; steps++) {
    randomMove();
  }
  resetMessageAndButton();
}

function randomMove() {
  let validMove = false;
  let xOffset, yOffset, xSwapLocation, ySwapLocation;
  const xPiece = findXPiece();
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
  messageDiv.innerHTML = "";
  resetButton.classList.remove("greenBorder");
}

function addClickHandlers() {
  const cells = table.getElementsByTagName("td");
  for (const cell of cells) {
    cell.onclick = function() {
      swapWithXPiece(this.parentNode.rowIndex, this.cellIndex);
    };
  }
}

function findXPiece() {
  for (const [r, row] of gameState.entries()) {
    if (row.indexOf(0) !== -1) {
      return [r, row.indexOf(0)];
    }
  }
  return [-1, -1];
}

function swapWithXPiece(clickedRow, clickedCol) {
  if (isAdjacentToX(clickedRow, clickedCol)) {
    const xPiece = findXPiece();
    swapPiecesInUI([clickedRow, clickedCol], xPiece);
    const temp = gameState[clickedRow][clickedCol];
    gameState[clickedRow][clickedCol] = 0;
    gameState[xPiece[0]][xPiece[1]] = temp;
    updateUIIfGameWon();
  }
}

function isAdjacentToX(clickedRow, clickedCol) {
  const xPiece = findXPiece();
  const above = xPiece[1] === clickedCol && xPiece[0] === clickedRow + 1;
  const below = xPiece[1] === clickedCol && xPiece[0] === clickedRow - 1;
  const left = xPiece[1] === clickedCol + 1 && xPiece[0] === clickedRow;
  const right = xPiece[1] === clickedCol - 1 && xPiece[0] === clickedRow;
  return above || below || left || right;
}

function swapPiecesInUI(clickedPiece, xPiece) {
  const row = table.getElementsByTagName("tr")[clickedPiece[0]];
  const cell = row.getElementsByTagName("td")[clickedPiece[1]];
  const xRow = table.getElementsByTagName("tr")[xPiece[0]];
  const xCell = xRow.getElementsByTagName("td")[xPiece[1]];
  cell.innerHTML = "x";
  xCell.innerHTML = gameState[clickedPiece[0]][clickedPiece[1]];
}

function updateUIIfGameWon() {
  if (checkForWin()) {
    messageDiv.innerHTML = "You won the game!";
    resetButton.classList.add("greenBorder");
  }
}

function checkForWin() {
  const winState = initializeGameState();
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      if (gameState[i][j] !== winState[i][j]) {
        return false;
      }
    }
  }
  return true;
}
