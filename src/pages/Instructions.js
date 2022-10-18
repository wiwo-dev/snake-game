import React, { useEffect, useState, useContext } from "react";

import Button from "../components/Button";
import SubpageHeader from "../components/SubpageHeader";

import { useNavigate } from "react-router-dom";
import JoyStick from "../components/JoyStick";
import { GameContext } from "../context/GameContext";
import { AppleSVG } from "../modules/snake-game/Icons/Apple";
import { StarSVG } from "../modules/snake-game/Icons/Star";
import Heading from "../components/Heading";

export default function Instructions() {
  let navigate = useNavigate();
  const { speed, setSpeed } = useContext(GameContext);

  return (
    <>
      <section className="">
        <SubpageHeader>Instructions</SubpageHeader>
        <div className="px-7 py-5 font-vt323 flex flex-col gap-10">
          <section>
            <Heading>Controls</Heading>
            <div className="flex items-start flex-wrap">
              <div className="">
                <p className="text-lg">
                  Control the direction using arrows on your keyboard or if you're on mobile use the joystick on the
                  screen.
                </p>
                <p className="text-lg">
                  You can go up, right, down and left. You can go through the walls. If your snake eats himself you
                  loose.
                </p>
              </div>
              <div className="flex justify-center min-w-[110px] w-full pt-4">
                <JoyStick direction="R" size={120} onDirectionChange={() => {}} />
              </div>
            </div>
          </section>
          <section>
            <Heading>Level</Heading>
            <div className="flex gap-5 flex-col">
              <p className="text-lg">
                There are four levels. On higher levels snake moves faster and you get more points for each star.
              </p>
              <div className="flex gap-5 justify-center">
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
            </div>
          </section>
          <section>
            <Heading className="mt-4">Points</Heading>
            <div className="flex flex-col">
              <div>
                <p className="text-lg">You can earn points by eating stars and apples.</p>
                <p className="text-lg">Each star gives you 1 point on Level 1, 2 points on Level 2 and so on...</p>
                <p className="text-lg">
                  Apples are appearing randomly, the faster you eat it, the more points you get.
                </p>
              </div>

              <div className="flex gap-5 items-center p-5 justify-center">
                <StarSVG size={50} />
                <AppleSVG size={55} />
              </div>
            </div>
          </section>
          <section>
            <Heading>Highscores</Heading>
            <p className="text-lg">
              At the end of the game you can save you score in the database and see how good you are ;)
            </p>
          </section>
          <section>
            <h1 className="text-xl font-bold mt-8">Enjoy! :)</h1>
          </section>
          <div>
            <section className="flex flex-col items-center gap-5 pt-5 max-w-sm mx-auto">
              <Button fullWidth onClick={() => navigate("/game")}>
                START GAME
              </Button>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
