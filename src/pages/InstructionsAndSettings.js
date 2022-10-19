import React, { useEffect, useState, useContext } from "react";

import Button from "../components/Button";
import SubpageHeader from "../components/SubpageHeader";

import { useNavigate } from "react-router-dom";
import JoyStick from "../components/JoyStick";
import { GameContext } from "../context/GameContext";
import { AppleSVG } from "../modules/snake-game/Icons/Apple";
import { StarSVG } from "../modules/snake-game/Icons/Star";
import Heading from "../components/Heading";
import Board from "../modules/snake-game/Board";

const SIZE_LIMITS = {
  MAX_WIDTH: 100,
  MIN_WIDTH: 10,
  MAX_HEIGHT: 100,
  MIN_HEIGHT: 7,
};

export default function InstructionsAndSettings() {
  let navigate = useNavigate();
  const { speed, setSpeed, wallTeleport, setWallTeleport, boardWidth, setBoardWidth, boardHeight, setBoardHeight } =
    useContext(GameContext);

  const middleX = Math.floor(boardWidth / 2);
  const middleY = Math.floor(boardHeight / 2);

  return (
    <>
      <section className="">
        <SubpageHeader>Instructions & Settings</SubpageHeader>
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
                    variant={speed === el ? "dark" : "ligth"}
                    pressed={speed === el}
                    disabled={speed === el}>
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
                  Apples (bonuses) are appearing after you eat 5 stars in a random position, the faster you eat it, the
                  more points you get. Bonus timer is displayed at the top of the board.
                </p>
              </div>

              <div className="flex gap-5 items-center p-5 justify-center">
                <StarSVG size={50} />
                <AppleSVG size={55} />
              </div>
            </div>
          </section>
          <section>
            <Heading>Wall teleport</Heading>
            <div className="flex flex-wrap"></div>
            <p className="text-lg">By default snake can go through the walls. You can change this behaviour here.</p>
            <div className="flex justify-center mt-3 gap-3">
              <Button
                variant={wallTeleport ? "dark" : "light"}
                onClick={() => {
                  setWallTeleport(true);
                }}
                pressed={wallTeleport}
                disabled={wallTeleport}
                className="w-[80px]">
                ON
              </Button>
              <Button
                variant={!wallTeleport ? "dark" : "light"}
                onClick={() => {
                  setWallTeleport(false);
                }}
                pressed={!wallTeleport}
                disabled={!wallTeleport}
                className="w-[80px]">
                OFF
              </Button>
            </div>
          </section>
          <div></div>
          <section>
            <Heading>Board size</Heading>
            <p className="text-lg">
              You can adjust the size of the game board. Size of each board cell will automatically adjust based on the
              width of your screen.
            </p>
            <section className="flex flex-wrap">
              <section className="flex justify-between items-center max-w-md mx-auto gap-6 p-5">
                <div className="text-xl w-[80px]">BOARD WIDTH</div>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => {
                      setBoardWidth(boardWidth - 1);
                    }}
                    disabled={boardWidth <= SIZE_LIMITS.MIN_WIDTH}>
                    -
                  </Button>
                  <p className="w-[50px] flex justify-center text-2xl">{boardWidth}</p>
                  <Button
                    onClick={() => {
                      setBoardWidth(boardWidth + 1);
                    }}
                    disabled={boardWidth >= SIZE_LIMITS.MAX_WIDTH}>
                    +
                  </Button>
                </div>
              </section>
              <section className="flex justify-between items-center max-w-md mx-auto gap-6 p-5">
                <div className="text-xl w-[80px]">BOARD HEIGHT</div>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => {
                      setBoardHeight(boardHeight - 1);
                    }}
                    disabled={boardHeight <= SIZE_LIMITS.MIN_HEIGHT}>
                    -
                  </Button>
                  <p className="w-[50px] flex justify-center text-2xl">{boardHeight}</p>
                  <Button
                    onClick={() => {
                      setBoardHeight(boardHeight + 1);
                    }}
                    disabled={boardHeight >= SIZE_LIMITS.MAX_HEIGHT}>
                    +
                  </Button>
                </div>
              </section>
            </section>
            <Heading>Preview</Heading>
            <div className="flex gap-5 flex-col">
              <Board
                width={boardWidth}
                height={boardHeight}
                star={{ x: middleX - 2, y: middleY - 3 }}
                snakeArray={[
                  { x: 6, y: middleY + 2, part: "HR" },
                  { x: 5, y: middleY + 2, part: "BH" },
                  { x: 4, y: middleY + 2, part: "BH" },
                  { x: 3, y: middleY + 2, part: "BH" },
                  { x: 2, y: middleY + 2, part: "BH" },
                  { x: 1, y: middleY + 2, part: "CLB" },
                  { x: 1, y: middleY + 1, part: "BV" },
                ]}
                bonusPosition={{ x: middleX + 2, y: middleY - 1 }}
                bonusTimeRemaining={222}
                gameOver={false}></Board>
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
