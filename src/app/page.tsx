"use client";
import Puzzle from "@/components/puzzle";
import React from "react";

export default function Home() {
  const [didWin, setDidWin] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  React.useEffect(() => {
    if (didWin) {
      setMessage("Puzzle successfully reordered.  You win!");
    } else {
      setMessage("");
    }
  }, [didWin]);

  return (
    <>
      <Puzzle setWin={setDidWin}></Puzzle>
      <div id="buttonsAndMessage">
        <input
          disabled={!didWin}
          id="restartGame"
          type="button"
          value="Reset"
          onClick={() => window.location.reload()}
        />
        <label id="message">{message}</label>
      </div>
    </>
  );
}
