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

// const BOARD_WIDTH = 20;
// const BOARD_HEIGHT = 15;

export default function GamePage() {
  const handleGameOver = async () => {
    console.log("handleGameOver");
    setGameState({ ...gameState, status: "GAMEOVER" });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("navigating to gameover");
    navigate("/gameover");
  };

  const { snake, makeNextStep, changeDirection, togglePause, bonusPosition, bonusTimeRemaining } = useSnakeGame({
    handleGameOver,
  });
  const { speed, gameState, setGameState, boardWidth, boardHeight } = useContext(GameContext);
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

  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.3,
        //ease: "easeInOut",
      },
    });
  }, [gameState.points]);

  return (
    <>
      <section className="relative">
        <SubpageHeader>Game</SubpageHeader>
        <div className="px-1 xs:px-2 sm:px-5 font-vt323">
          <div className="flex justify-between">
            <motion.p animate={controls} className="">
              Score: {gameState.points} ({gameState.eatenElementsCount})
            </motion.p>
            <p className="">{bonusTimeRemaining > 0 && bonusTimeRemaining}</p>
            <p className="">{gameState.status}</p>
          </div>
          <div className="w-full h-2 border-t-2 border-black"></div>

          <Board
            width={boardWidth}
            height={boardHeight}
            star={gameState.starPosition}
            snakeArray={snake}
            bonusPosition={bonusPosition}
            bonusTimeRemaining={bonusTimeRemaining}
            gameOver={gameState.status === "GAMEOVER"}
            headDirection={gameState.direction}></Board>

          <div className="flex justify-around mt-10 gap-6 xs:gap-3 flex-wrap">
            <div>
              <JoyStick direction={gameState.direction} onDirectionChange={(dir) => changeDirection(dir)} />
            </div>
            <div className="flex flex-row xs:flex-col gap-3 xs:gap-1">
              <ControlButton size="100" onClick={handlePauseClick}>
                PAUSE
              </ControlButton>
              <ControlButton size="100" onClick={handleGameOver}>
                STOP
              </ControlButton>
            </div>
          </div>
        </div>
        {gameState.status === "GAMEOVER" && (
          <div className="absolute left-0 right-0 h-24 top-[300px]">
            <Heading>GAME OVER</Heading>
          </div>
        )}
      </section>
    </>
  );
}
