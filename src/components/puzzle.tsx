"use client";
import React from "react";
import Piece from "./piece";
import {
  createSolvablePuzzleState,
  findXPiece,
  initializeGameState,
  swapWithXPiece,
} from "@/lib/setup";
import { isValidPlay } from "@/lib/piece";
import { checkForWin } from "@/lib/win";
import { puzzleProps } from "@/types/puzzleProps";

export default function Puzzle(props: puzzleProps) {
  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3];
  const [gameState, setGameState] = React.useState<number[][]>(
    initializeGameState()
  );
  React.useEffect(() => setGameState(createSolvablePuzzleState()), []);
  React.useEffect(() => props.setWin(checkForWin(gameState)), [gameState]);
  const [xLocation, setXLocation] = React.useState<number[]>(
    findXPiece(gameState)
  );
  React.useEffect(() => setXLocation(findXPiece(gameState)), [gameState]);

  function onSpaceClick(row: number, column: number) {
    const newState = swapWithXPiece(structuredClone(gameState), row, column);
    setGameState(newState);
  }

  return (
    <table id="puzzle">
      <tbody>
        {rows.map((row) => (
          <tr key={`row${row}`}>
            {cols.map((col) => (
              <Piece
                key={`piece${row}${col}`}
                isValidPlay={isValidPlay(xLocation, [row, col])}
                clickHandler={() => onSpaceClick(row, col)}
                value={gameState[row][col]}
              ></Piece>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
