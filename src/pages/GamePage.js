import React, { useContext, useState, useRef, useEffect } from "react";
import Food from "../components/Food";
import Heading from "../components/Heading";
import controllerCenter from "../components/controller/controller-center.svg";
import controllerDown from "../components/controller/controller-down.svg";
import controller from "../components/controller/controller.svg";
import JoyStick from "../components/JoyStick";

import startButton from "../components/controller/start.svg";
import { GameContext } from "../context/GameContext";

import Board from "../modules/snake-game/Board";
import Game from "../modules/snake-game/Game";
import useKeyboardControl from "../modules/snake-game/useKeyboardControl";
import useInterval from "../utils/useInterval";

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 15;

export default function GamePage() {
  const [controllerPosition, setcontrollerPosition] = useState(controllerCenter);

  const { userName, setUserName, speed, setSpeed, score, gameStatus, setGameStatus } = useContext(GameContext);

  const game = useRef(new Game({ snakeHeadPosition: { x: 2, y: 5 }, width: BOARD_WIDTH, height: BOARD_HEIGHT }));

  const getRefreshedGameState = () => {
    return {
      snakeHeadPosition: game.current.snake.getHeadPosition(),
      points: game.current.points,
      starPosition: game.current.starPosition,
      snakeArray: game.current.snake.getSnakeArray(),
    };
  };

  const [gameState, setGameState] = useState(getRefreshedGameState());
  const [direction, setDirection] = useState("R");

  const handleDirectionChange = (dir) => {
    setDirection(dir);
    game.current.direction = dir;
  };

  useKeyboardControl({ onChangeDirection: handleDirectionChange });

  const handleStopGameClick = () => {
    if (gameState.status === "STOPPED") setGameState({ ...gameState, status: "RESUMED" });
    else setGameState({ ...gameState, status: "STOPPED" });
  };

  const handleResetGameClick = () => {
    game.current = new Game({ snakeHeadPosition: { x: 2, y: 5 }, width: BOARD_WIDTH, height: BOARD_HEIGHT });
    setGameState({ ...gameState, status: "RESTARTED" });
  };

  const makeOneMove = () => {
    game.current.makeNextStep();
    setGameState(getRefreshedGameState());
  };

  const [setActualDelay] = useInterval(() => {
    if (gameState.status !== "STOPPED") {
      makeOneMove();
    }
  }, 250);

  return (
    <>
      <section className="max-w-md">
        <Heading variant="h1">Game</Heading>
        <div className="px-5">
          <div className="flex justify-between">
            <p className="font-vt323">Score: 123</p>
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
            <img
              alt="start"
              src={startButton}
              onClick={() => {
                console.log("start click");
                handleStopGameClick();
                if (gameStatus === "RUNNING") {
                  setGameStatus("STOPPED");
                }
                if (gameStatus === "STOPPED") setGameStatus("RUNNING");
              }}
            />
          </div>
          {/* <img src={controller} /> */}
          {/* <img
            src={controllerPosition}
            onClick={() => {
              console.log("test");
              if (controllerPosition != controllerDown) setcontrollerPosition(controllerDown);
              if (controllerPosition != controllerCenter) setcontrollerPosition(controllerCenter);
            }}
          />
          <img src={controllerCenter} />
          <img src={controllerDown} /> */}
        </div>
      </section>
    </>
  );
}
