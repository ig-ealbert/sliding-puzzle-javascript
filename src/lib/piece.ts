export function toDisplayValue(value: number) {
  if (value === 0) {
    return "X";
  }
  return value.toString();
}

export function isValidPlay(xLocation: number[], pieceLocation: number[]) {
  const above =
    xLocation[1] === pieceLocation[1] && xLocation[0] === pieceLocation[0] + 1;
  const below =
    xLocation[1] === pieceLocation[1] && xLocation[0] === pieceLocation[0] - 1;
  const left =
    xLocation[1] === pieceLocation[1] + 1 && xLocation[0] === pieceLocation[0];
  const right =
    xLocation[1] === pieceLocation[1] - 1 && xLocation[0] === pieceLocation[0];
  return above || below || left || right;
}
