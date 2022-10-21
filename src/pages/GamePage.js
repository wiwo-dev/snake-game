import React, { useContext, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GameContext, Board, useKeyboardControl, JoyStick, ControlButton, useSnakeGame } from "../modules/SnakeGame";
import { SubpageHeader, Heading } from "../components";
import useInterval from "../utils/useInterval";

export default function GamePage() {
  const handleGameOver = async () => {
    setGameState({ ...gameState, status: "GAMEOVER" });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("navigating to gameover");
    navigate("/gameover");
  };

  const { snake, makeNextStep, changeDirection, togglePause, bonusPosition, bonusTimeRemaining } = useSnakeGame({
    handleGameOver,
  });
  const handlePauseClick = () => {
    togglePause();
  };
  const { speed, gameState, setGameState, boardWidth, boardHeight } = useContext(GameContext);
  useKeyboardControl({ onChange: changeDirection, onSpace: handlePauseClick, onEscape: handleGameOver });

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

          <div className="flex justify-around mt-3 xs:mt-10 gap-3 xs:gap-3 flex-wrap flex-wrap-reverse">
            <div>
              <JoyStick direction={gameState.direction} onDirectionChange={(dir) => changeDirection(dir)} />
            </div>
            <div className="flex flex-row xs:flex-col gap-14 xs:gap-1 justify-between">
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
