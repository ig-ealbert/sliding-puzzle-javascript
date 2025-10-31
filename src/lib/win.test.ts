import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { checkForWin, getWinMessage } from "./win";
import { initializeGameState } from "./setup";

describe("Detect win", () => {
  it("Detects a win", () => {
    const didWin = checkForWin(initializeGameState());
    assert.strictEqual(didWin, true);
  });

  it("Does not give a false postive", () => {
    const board = initializeGameState();
    board[0][0] = 1;
    board[0][1] = 0;
    const didWin = checkForWin(board);
    assert.strictEqual(didWin, false);
  });

  it("Gives a message for a win", () => {
    const message = getWinMessage(true);
    assert.strictEqual(message, "Puzzle successfully reordered.  You win!");
  });

  it("Gives no message if the puzzle is not solved", () => {
    const message = getWinMessage(false);
    assert.strictEqual(message, "");
  });
});
