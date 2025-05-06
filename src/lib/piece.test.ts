import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { isValidPlay, toDisplayValue } from "./piece";

describe("Piece helper functions", () => {
  it("Displays a value as a string", () => {
    const displayValue = toDisplayValue(1);
    assert.strictEqual(displayValue, "1");
  });

  it("Displays a zero as X", () => {
    const displayValue = toDisplayValue(0);
    assert.strictEqual(displayValue, "X");
  });

  it("Detects valid play on space above X", () => {
    const isValid = isValidPlay([1, 1], [0, 1]);
    assert.strictEqual(isValid, true);
  });

  it("Detects valid play on space below X", () => {
    const isValid = isValidPlay([1, 1], [2, 1]);
    assert.strictEqual(isValid, true);
  });

  it("Detects valid play on space right of X", () => {
    const isValid = isValidPlay([1, 1], [1, 2]);
    assert.strictEqual(isValid, true);
  });

  it("Detects valid play on space left of X", () => {
    const isValid = isValidPlay([1, 1], [1, 0]);
    assert.strictEqual(isValid, true);
  });

  it("Diagonals are not valid moves", () => {
    const isValid = isValidPlay([1, 1], [0, 0]);
    assert.strictEqual(isValid, false);
  });

  it("Non-adjacent spaces are not valid moves", () => {
    const isValid = isValidPlay([1, 1], [3, 3]);
    assert.strictEqual(isValid, false);
  });
});
