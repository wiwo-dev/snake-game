import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import JoyStick from "../components/JoyStick";
import { GameContext } from "../context/GameContext";

import Board from "../modules/snake-game/Board";
import Game from "../modules/snake-game/useSnakeGame";
import useKeyboardControl from "../modules/snake-game/useKeyboardControl";
import useInterval from "../utils/useInterval";
import ControlButton from "../components/ControlButton";
import Heading from "../components/Heading";
import SubpageHeader from "../components/SubpageHeader";

import SnakeAnimation from "../components/SnakeAnimation";
import useSnakeGame from "../modules/snake-game/useSnakeGame";

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 15;

export default function GamePage() {
  const { speed, score, setScore, gameStatus, setGameStatus } = useContext(GameContext);

  const { gameState, makeNextStep, changeDirection, togglePause, gameOver, bonusPosition, bonusTimeRemaining } =
    useSnakeGame({
      snakeHeadPosition: { x: 2, y: 5 },
      width: BOARD_WIDTH,
      height: BOARD_HEIGHT,
      speed,
    });

  useEffect(() => {
    setGameStatus(gameState.status);
    setScore(gameState.points);
    if (gameState.status === "GAMEOVER") handleGameOver();
  }, [gameState]);

  const { direction } = useKeyboardControl({ onChange: changeDirection });

  const handlePauseClick = () => {
    togglePause();
  };

  const [setActualDelay] = useInterval(() => {
    if (gameState.status !== "STOPPED") {
      makeNextStep();
    }
  }, 450 / speed);

  let navigate = useNavigate();

  const handleGameOver = () => {
    gameOver();
    setTimeout(() => {
      navigate("/gameover");
    }, 2000);
  };

  return (
    <>
      <section className="relative">
        <SubpageHeader>Game</SubpageHeader>
        <div className="px-5">
          <div className="flex justify-between">
            <p className="font-vt323">Score: {score}</p>
            <p className="font-vt323">{gameStatus}</p>
          </div>
          <div className="w-full h-2 border-t-2 border-black"></div>

          <Board
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
            star={gameState.starPosition}
            //snake={gameState.snakeHeadPosition}
            snakeArray={gameState.snakeArray}
            bonusPosition={bonusPosition}
            bonusTimeRemaining={bonusTimeRemaining}></Board>

          <div className="flex justify-around">
            <JoyStick direction={gameState.direction} onDirectionChange={(dir) => changeDirection(dir)} />
            <div className="flex flex-col">
              <ControlButton onClick={handlePauseClick}>PAUSE</ControlButton>
              <ControlButton onClick={handleGameOver}>STOP</ControlButton>
            </div>
          </div>
        </div>
        {gameStatus === "GAMEOVER" && (
          <div className="absolute top-0 left-0 right-0 h-24 bg-red-100">
            <Heading>GAME OVER</Heading>
          </div>
        )}
      </section>
    </>
  );
}
