import { possibleMoves } from "@/constants";

export function initializeGameState() {
  return [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ]; // 0 = x
}

export function createSolvablePuzzleState() {
  let puzzle = initializeGameState();
  for (let steps = 0; steps < 100; steps++) {
    puzzle = randomMove(puzzle);
  }
  return puzzle;
}

function chooseRandomOffsets() {
  const index = getRandomInt(0, possibleMoves.length - 1);
  return possibleMoves[index];
}

function randomMove(puzzle: number[][]) {
  let validMove = false;
  let xSwapLocation = 1,
    ySwapLocation = 1;
  const xPiece = findXPiece(puzzle);
  while (!validMove) {
    const offsets = chooseRandomOffsets();
    xSwapLocation = xPiece[0] + offsets[0];
    ySwapLocation = xPiece[1] + offsets[1];
    validMove = isOnBoard(xSwapLocation, ySwapLocation);
  }
  puzzle = swapWithXPiece(puzzle, xSwapLocation, ySwapLocation);
  return puzzle;
}

function isOnBoard(x: number, y: number) {
  return x >= 0 && x < 4 && y >= 0 && y < 4;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function findXPiece(puzzle: number[][]) {
  for (let i = 0; i < puzzle.length; i++) {
    if (puzzle[i].indexOf(0) !== -1) {
      return [i, puzzle[i].indexOf(0)];
    }
  }
  return [-1, -1];
}

export function swapWithXPiece(
  puzzle: number[][],
  clickedRow: number,
  clickedCol: number
) {
  const xPiece = findXPiece(puzzle);
  const temp = puzzle[clickedRow][clickedCol];
  puzzle[clickedRow][clickedCol] = 0;
  puzzle[xPiece[0]][xPiece[1]] = temp;
  return puzzle;
}
