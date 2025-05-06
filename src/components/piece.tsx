"use client";
import { pieceProps } from "@/types/pieceProps";
import { toDisplayValue } from "@/lib/piece";

export default function Piece(props: pieceProps) {
  return (
    <td>
      <button disabled={!props.isValidPlay} onClick={props.clickHandler}>
        {toDisplayValue(props.value)}
      </button>
    </td>
  );
}
