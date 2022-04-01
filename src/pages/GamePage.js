import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import JoyStick from "../components/JoyStick";
import { GameContext } from "../context/GameContext";

import Board from "../modules/snake-game/Board";
import Game from "../modules/snake-game/Game";
import useKeyboardControl from "../modules/snake-game/useKeyboardControl";
import useInterval from "../utils/useInterval";
import ControlButton from "../components/ControlButton";
import SubpageHeader from "../components/SubpageHeader";

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 15;

export default function GamePage() {
  const { speed, score, setScore, gameStatus, setGameStatus } = useContext(GameContext);

  const game = useRef(new Game({ snakeHeadPosition: { x: 2, y: 5 }, width: BOARD_WIDTH, height: BOARD_HEIGHT }));

  const getRefreshedGameState = () => {
    return {
      snakeHeadPosition: game.current.snake.getHeadPosition(),
      points: game.current.points,
      starPosition: game.current.starPosition,
      snakeArray: game.current.snake.getSnakeArray(),
      status: game.current.gameStatus,
    };
  };

  const [gameState, setGameState] = useState(getRefreshedGameState());
  const [direction, setDirection] = useState("R");

  useEffect(() => {
    setGameStatus(gameState.status);
    setScore(gameState.points);
    setGameStatus(gameState.gameStatus);

    if (gameState.status === "GAMEOVER") handleGameOver();
  }, [gameState]);

  const handleDirectionChange = (dir) => {
    setDirection(dir);
    game.current.direction = dir;
  };

  useKeyboardControl({ onChangeDirection: handleDirectionChange });

  const handleStopGameClick = () => {
    if (gameState.status === "STOPPED") setGameState({ ...gameState, status: "RESUMED" });
    else setGameState({ ...gameState, status: "STOPPED" });
  };

  // const handleResetGameClick = () => {
  //   game.current = new Game({ snakeHeadPosition: { x: 2, y: 5 }, width: BOARD_WIDTH, height: BOARD_HEIGHT });
  //   setGameState({ ...gameState, status: "RESTARTED" });
  // };

  const makeOneMove = () => {
    game.current.makeNextStep();
    setGameState(getRefreshedGameState());
  };

  const [setActualDelay] = useInterval(() => {
    if (gameState.status !== "STOPPED") {
      makeOneMove();
    }
  }, 450 / speed);

  const handlePauseClick = () => {
    handleStopGameClick();
    if (gameStatus === "RUNNING") {
      setGameStatus("STOPPED");
    }
    if (gameStatus === "STOPPED") setGameStatus("RUNNING");
  };

  let navigate = useNavigate();
  const handleGameOver = () => {
    navigate("/gameover");
  };

  return (
    <>
      <section className="">
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
            star={game.current.starPosition}
            snake={gameState.snakeHeadPosition}
            snakeArray={gameState.snakeArray}></Board>

          <div className="flex justify-around">
            <JoyStick direction={direction} onDirectionChange={handleDirectionChange} />
            <div className="flex flex-col">
              <ControlButton onClick={handlePauseClick}>PAUSE</ControlButton>
              <ControlButton onClick={handleGameOver}>STOP</ControlButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
