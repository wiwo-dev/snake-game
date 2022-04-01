import React, { useContext } from "react";
import Button from "../components/Button";
import Food from "../components/Food";
import Heading from "../components/Heading";
import HighScoresRow from "../components/HighScoresRow";

import { GameContext } from "../context/GameContext";

export default function NothingHere() {
  const { speed, setSpeed } = useContext(GameContext);
  return (
    <>
      <section className="bg-primary">
        <h1 className="text-6xl font-press-start">Snake Game</h1>
        <h1 className="text-8xl font-vt323">Snake Game</h1>
        <Button>test</Button>
        <br />
        <br />
        <Button variant="clear">test</Button>
        <p>test</p>
        <Heading>Select Speed</Heading>
        <section className="max-w-md">
          <Heading variant="h2">Select h2 Speed</Heading>
          <p>{speed}</p>
          <div className="flex justify-between mx-auto">
            <Button
              onClick={() => {
                setSpeed(1);
              }}>
              1
            </Button>
            <Button onClick={() => setSpeed(2)} variant="clear">
              2
            </Button>
            <Button onClick={() => setSpeed(3)}>3</Button>
          </div>
        </section>
        <p>test</p>
        <section className="max-w-md">
          <Heading variant="h2">Highscores</Heading>

          <div className="flex flex-col justify-between mx-auto">
            <ul>
              <li>
                <HighScoresRow index="1" name="Wiwo" score="123" />
              </li>
              <li>Jeden</li>
              <li>Jeden</li>
            </ul>
          </div>
        </section>

        <section className="max-w-md">
          <Heading variant="h1">Game</Heading>
          <div className="px-5">
            <p className="font-vt323">Score: 123</p>
            <div className="w-full h-2 border-t-2 border-black"></div>
            <div className="relative w-full h-24 border-2 border-black">
              <Food x={40} y={24} />
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
