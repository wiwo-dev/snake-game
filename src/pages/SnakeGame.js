import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Board from "../modules/snake-game/Board";

import Game from "../modules/snake-game/Game";
import { ShowDirection } from "../modules/snake-game/ShowDirection";
import useKeyboardControl from "../modules/snake-game/useKeyboardControl";
import MobileControl from "../modules/snake-game/MobileControl";
import useInterval from "../utils/useInterval";

const BOARD_WIDTH = 15;
const BOARD_HEIGHT = 15;

export default function SnakeGame() {
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
    setGameState({ ...gameState, status: "STOPPED" });
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
  }, 150);

  return (
    <div className="flex flex-col items-center pt-10 bg-gray-400 h-screen-js">
      <section className="flex justify-around gap-5">
        <button onClick={handleStopGameClick} className="p-2 bg-gray-300 rounded-md">
          STOP ❌
        </button>
        <button onClick={handleResetGameClick} className="p-2 bg-gray-300 rounded-md">
          RESET 🔁
        </button>
        <div className="p-2 bg-gray-300 rounded-md">
          <ShowDirection direction={direction} />
        </div>
        <div className="p-2 bg-gray-300 rounded-md">SCORE: {gameState.points}</div>
      </section>

      <section className="relative mt-5">
        <Board
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          star={game.current.starPosition}
          snake={gameState.snakeHeadPosition}
          snakeArray={gameState.snakeArray}
          nextPosition={game.current.getNextPosition()}></Board>
      </section>

      <section>
        <MobileControl
          onClickDirection={(dir) => {
            setDirection(dir);
          }}
        />
      </section>
      <section>
        <button onClick={() => setActualDelay(300)} className="p-2 bg-gray-300 rounded-md">
          300 🔥
        </button>
        <button onClick={() => setActualDelay(50)} className="p-2 bg-gray-300 rounded-md">
          50 🔥
        </button>
        <button onClick={() => setActualDelay(1000)} className="p-2 bg-gray-300 rounded-md">
          1000 🔥
        </button>
      </section>
    </div>
  );
}
