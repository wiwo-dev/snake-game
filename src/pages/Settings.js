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

export default function Settings() {
  let navigate = useNavigate();
  const { wallTeleport, setWallTeleport, boardWidth, setBoardWidth, boardHeight, setBoardHeight } =
    useContext(GameContext);

  const middleX = Math.floor(boardWidth / 2);
  const middleY = Math.floor(boardHeight / 2);

  return (
    <>
      <section className="">
        <SubpageHeader>Settings</SubpageHeader>
        <div className="px-7 py-5 font-vt323 flex flex-col gap-10">
          <div>
            <Heading>Wall teleport</Heading>
            <div className="flex flex-wrap"></div>
            <p className="text-lg">Change if the snake can go through the walls.</p>
            <div className="flex justify-center mt-3">
              <Button
                onClick={() => {
                  setWallTeleport(!wallTeleport);
                }}>
                {wallTeleport ? "ON" : "OFF"}
              </Button>
            </div>
          </div>
          <div>
            <Heading>Board size</Heading>
            <p className="text-lg">
              You can adjust the size of the game board. Size of each board cell will automatically adjust based on the
              width of your screen.
            </p>
          </div>
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
          <section>
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
