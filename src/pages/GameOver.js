import React, { useContext } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";

import { GameContext } from "../context/GameContext";

export default function GameOver() {
  const { userName, setUserName, speed, setSpeed, score } = useContext(GameContext);

  return (
    <>
      <section className="max-w-md">
        <Heading>Game Over</Heading>
        <section className="max-w-sm mx-auto">
          <section className="flex flex-col items-center gap-6">
            <div className="text-2xl font-vt323">SCORE: {score}</div>
            <p>{userName}</p>

            <form
              className="flex flex-col items-center gap-6"
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
                setUserName(e.target.value);
              }}
              onSubmit={(e) => {
                e.preventDefault();
                console.log("WYSLANO: " + userName);
              }}>
              <Input fullWidth />
              <Button fullWidth type="submit">
                SAVE SCORE
              </Button>
            </form>
          </section>
        </section>
      </section>
    </>
  );
}
