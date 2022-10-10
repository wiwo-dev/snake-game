import React, { useContext } from "react";
import Button from "../components/Button";

import Heading from "../components/Heading";

import SnakeAnimation from "../components/SnakeAnimation";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";

export default function StartScreen() {
  const { speed, setSpeed } = useContext(GameContext);
  const navigate = useNavigate();
  return (
    <>
      <section className="flex flex-col gap-5 px-5 mx-auto">
        <h1 className="mx-auto text-8xl font-vt323">Snake Game</h1>

        <SnakeAnimation />
        <section className="flex flex-col gap-2 mt-7">
          <Heading variant="h2">Select speed</Heading>
          <div className="flex gap-5 mx-auto">
            {[1, 2, 3, 4].map((el, ind) => (
              <Button
                key={ind}
                onClick={() => {
                  setSpeed(el);
                }}
                variant={speed === el ? "dark" : "ligth"}>
                {el}
              </Button>
            ))}
          </div>
        </section>
        <section className="mx-auto mt-7">
          <Button fullWidth onClick={() => navigate("/game")}>
            START GAME
          </Button>
        </section>

        <section className="flex flex-col gap-5 mx-auto w-44 mt-7">
          <Button fullWidth variant="light" onClick={() => navigate("/highscores")}>
            HIGHSCORES
          </Button>
        </section>
      </section>
    </>
  );
}
