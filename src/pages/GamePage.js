import React, { useContext, useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import JoyStick from "../components/JoyStick";
import { GameContext } from "../context/GameContext";
import Board from "../modules/snake-game/Board";
import useKeyboardControl from "../modules/snake-game/useKeyboardControl";
import useInterval from "../utils/useInterval";
import ControlButton from "../components/ControlButton";
import Heading from "../components/Heading";
import SubpageHeader from "../components/SubpageHeader";
import useSnakeGame from "../modules/snake-game/useSnakeGame";

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 15;

export default function GamePage() {
  const { speed, score, setScore, gameStatus, setGameStatus } = useContext(GameContext);

  const { snake, gameState, makeNextStep, changeDirection, togglePause, gameOver, bonusPosition, bonusTimeRemaining } =
    useSnakeGame({
      width: BOARD_WIDTH,
      height: BOARD_HEIGHT,
      speed,
    });

  const gameOverHandled = useRef(false);
  useEffect(() => {
    setGameStatus(gameState.status);
    setScore(gameState.points);
    console.log("useEffect on gameState change - every change");
    if (gameState.status === "GAMEOVER" && gameOverHandled.current === false) {
      console.log("useEffect on gameState change - GAME OVER");
      gameOverHandled.current = true;
      handleGameOver();
    }
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

  const handleGameOver = async () => {
    gameOver();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("navigating to gameover");
    navigate("/gameover");
  };

  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.3,
        //ease: "easeInOut",
      },
    });
  }, [score]);

  return (
    <>
      <section className="relative">
        <SubpageHeader>Game</SubpageHeader>
        <div className="px-5">
          <div className="flex justify-between">
            <motion.p animate={controls} className="font-vt323">
              Score: {score}
            </motion.p>
            <p className="font-vt323">{gameStatus}</p>
          </div>
          <div className="w-full h-2 border-t-2 border-black"></div>

          <Board
            width={BOARD_WIDTH}
            height={BOARD_HEIGHT}
            star={gameState.starPosition}
            snakeArray={snake}
            bonusPosition={bonusPosition}
            bonusTimeRemaining={bonusTimeRemaining}
            gameOver={gameState.status === "GAMEOVER"}></Board>

          <div className="flex justify-around">
            <JoyStick direction={gameState.direction} onDirectionChange={(dir) => changeDirection(dir)} />
            <div className="flex flex-col">
              <ControlButton onClick={handlePauseClick}>PAUSE</ControlButton>
              <ControlButton onClick={handleGameOver}>STOP</ControlButton>
            </div>
          </div>
        </div>
        {gameStatus === "GAMEOVER" && (
          <div className="absolute left-0 right-0 h-24 top-[300px]">
            <Heading>GAME OVER</Heading>
          </div>
        )}
      </section>
    </>
  );
}
