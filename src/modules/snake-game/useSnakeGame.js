import { useRef, useState } from "react";
import Snake from "./Snake";
import useBonusStar from "./useBonusStar";

export default function useSnakeGame({ snakeHeadPosition, width, height, speed }) {
  const randomPosition = () => {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  };

  const snake = useRef(new Snake({ startPosition: snakeHeadPosition }));

  const [gameState, setGameState] = useState({
    snakeHeadPosition: snake.current.getHeadPosition(),
    points: 0,
    starPosition: randomPosition(),
    snakeArray: snake.current.getSnakeArray(),
    status: "RUNNING",
    direction: "R",
    wallTeleport: true,
    speed: speed,
  });

  const { bonusPosition, bonusTimeRemaining, onBonusScore, bonusStarTick } = useBonusStar({ randomPosition });

  const changeDirection = (dir) => {
    setGameState({ ...gameState, direction: dir });
  };

  const togglePause = () => {
    if (gameState.status === "PAUSED") setGameState({ ...gameState, status: "RUNNING" });
    else setGameState({ ...gameState, status: "PAUSED" });
  };

  const gameOver = () => {
    setGameState({ ...gameState, status: "GAMEOVER" });
  };

  const getNextPosition = () => {
    let { x, y } = snake.current.getHeadPosition();
    if (gameState.direction === "L") x = x - 1;
    if (gameState.direction === "R") x = x + 1;
    if (gameState.direction === "D") y = y + 1;
    if (gameState.direction === "U") y = y - 1;
    return { x, y };
  };

  const makeNextStep = () => {
    if (gameState.status !== "RUNNING") return;

    bonusStarTick(gameState.speed);

    let { x, y } = getNextPosition();

    //check if move valid
    if (x < 0 || y < 0 || x >= width || y >= height) {
      if (gameState.wallTeleport) {
        if (x < 0) x = width + x;
        if (y < 0) y = height + y;
        if (x >= width) x = x - width;
        if (y >= height) y = y - height;
        snake.current.moveSnake({ x, y });
        setGameState({
          ...gameState,
          snakeHeadPosition: snake.current.getHeadPosition(),
          snakeArray: snake.current.getSnakeArray(),
        });
      } else {
        console.log("❌ GAME OVER 😔");
        return;
      }
    } else if (x === gameState.starPosition.x && y === gameState.starPosition.y) {
      //PUNKT
      snake.current.moveSnake({ x, y }, true);
      setGameState({
        ...gameState,
        points: gameState.points + gameState.speed,
        starPosition: randomPosition(),
        snakeHeadPosition: snake.current.getHeadPosition(),
        snakeArray: snake.current.getSnakeArray(),
      });
      console.log("yeah ⭐ punkty: " + gameState.points);
    } else if (x === bonusPosition?.x && y === bonusPosition?.y) {
      //PUNKT BONUS
      snake.current.moveSnake({ x, y }, true);
      setGameState({
        ...gameState,
        points: gameState.points + bonusTimeRemaining,
        snakeHeadPosition: snake.current.getHeadPosition(),
        snakeArray: snake.current.getSnakeArray(),
      });
      onBonusScore();
      console.log("yeah ✡️ punkty: " + gameState.points);
    } else if (snake.current.getSnakeArray().filter((sn) => (sn.x === x) & (sn.y === y)).length > 0) {
      console.log("❌ GAME OVER 🍰🍰🍰🍰 ZJADŁEM SIĘ 😔");
      setGameState({ ...gameState, status: "GAMEOVER" });
    } else {
      snake.current.moveSnake({ x, y });
      setGameState({
        ...gameState,
        snakeHeadPosition: snake.current.getHeadPosition(),
        snakeArray: snake.current.getSnakeArray(),
      });
    }
  };

  return { gameState, makeNextStep, changeDirection, togglePause, gameOver, bonusPosition, bonusTimeRemaining };
}
