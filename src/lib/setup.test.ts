import { describe, it } from "@jest/globals";
import assert from "node:assert";
import {
  createSolvablePuzzleState,
  findXPiece,
  initializeGameState,
  swapWithXPiece,
} from "./setup";

describe("Setup helper functions", () => {
  it("Initializes solved game state", () => {
    const gameState = initializeGameState();
    assert.strictEqual(gameState.length, 4);
    assert.strictEqual(gameState[0].length, 4);
  });

  it("Randomizes the board", () => {
    const gameState = createSolvablePuzzleState();
    assert.strictEqual(gameState.length, 4);
    assert.strictEqual(gameState[0].length, 4);
    assert.notDeepStrictEqual(gameState, initializeGameState());
  });

  it("Finds X piece", () => {
    const xLocation = findXPiece(initializeGameState());
    assert.deepStrictEqual(xLocation, [3, 3]);
  });

  it("Returns dummy value if X piece not found", () => {
    const board = initializeGameState();
    board[3][3] = 100;
    const xLocation = findXPiece(board);
    assert.deepStrictEqual(xLocation, [-1, -1]);
  });

  it("Swaps with X piece", () => {
    const board = initializeGameState();
    board[3][2] = 0;
    board[3][3] = 15;
    const newState = swapWithXPiece(board, 3, 3);
    assert.deepStrictEqual(newState, initializeGameState());
  });
});
