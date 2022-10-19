import React, { useContext } from "react";
import { Button, Heading, SnakeLogo } from "../components";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../modules/SnakeGame";

export default function StartScreen() {
  const { speed, setSpeed } = useContext(GameContext);
  const navigate = useNavigate();
  return (
    <>
      <section className="flex flex-col gap-5 px-5 mx-auto">
        <div className="flex flex-col">
          <h1 className="mx-auto text-5xl xs:text-7xl md:text-8xl font-vt323">Snake Game</h1>
          <p className="font-vt323 text-xl max-w-md mx-auto text-center">
            Do you remember playing Snake on Nokia 3210?
          </p>
        </div>
        <SnakeLogo />

        <section className="flex flex-col gap-2 mt-7">
          <Heading variant="h2">Select speed</Heading>
          <div className="flex gap-5 mx-auto">
            {[1, 2, 3, 4].map((el, ind) => (
              <Button
                key={ind}
                onClick={() => {
                  setSpeed(el);
                }}
                variant={speed === el ? "dark" : "ligth"}
                pressed={speed === el}
                disabled={speed === el}>
                {el}
              </Button>
            ))}
          </div>
        </section>
        <div>
          <section className="flex flex-col items-center gap-5 pt-5 max-w-sm mx-auto">
            <Button fullWidth onClick={() => navigate("/game")}>
              START GAME
            </Button>

            <Button fullWidth variant="light" onClick={() => navigate("/highscores")}>
              HIGHSCORES
            </Button>
            <Button fullWidth variant="light" onClick={() => navigate("/instructions-settings")}>
              INSTRUCTIONS & SETTINGS
            </Button>
          </section>
        </div>
      </section>
    </>
  );
}
