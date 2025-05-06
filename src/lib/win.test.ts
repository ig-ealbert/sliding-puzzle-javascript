import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { checkForWin } from "./win";
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
});
