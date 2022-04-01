import React, { useContext } from "react";
import Button from "../components/Button";

import Heading from "../components/Heading";

import SnakeAnimation from "../components/SnakeAnimation";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";

export default function StartScreen() {
  const { userName, setUserName, speed, setSpeed } = useContext(GameContext);
  const navigate = useNavigate();
  return (
    <>
      <section className="flex flex-col max-w-md gap-5 px-5 bg-primary">
        <h1 className="mx-auto text-8xl font-vt323">Snake Game</h1>

        <SnakeAnimation />

        <section className="flex flex-col gap-5 mx-auto w-44 mt-7">
          <Button fullWidth onClick={() => navigate("/game")}>
            START GAME
          </Button>
        </section>
        <section className="flex flex-col gap-2 mt-7">
          <Heading variant="h2">Select speed</Heading>
          <div className="flex gap-5 mx-auto">
            {[1, 2, 3].map((el, ind) => (
              <Button
                onClick={() => {
                  setSpeed(el);
                }}
                variant={speed === el ? "clear" : ""}>
                {el}
              </Button>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-5 mx-auto w-44 mt-7">
          <Button fullWidth>HIGHSCORES</Button>
        </section>
      </section>
    </>
  );
}
