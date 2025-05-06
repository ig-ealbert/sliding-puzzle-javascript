import { initializeGameState } from "./setup";

export function checkForWin(gameState: number[][]) {
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
