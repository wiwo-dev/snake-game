import { useRef, useState } from "react";
import useBonusStar from "./useBonusStar";
import useSnake from "./useSnake";

export default function useSnakeGame({ width, height, speed }) {
  const randomPosition = () => {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  };

  const { snake, moveSnake } = useSnake(randomPosition());

  const [gameState, setGameState] = useState({
    points: 0,
    starPosition: randomPosition(),
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
    let { x, y } = snake[0];
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
        moveSnake({ x, y });
      } else {
        console.log("❌ GAME OVER 😔");
        return;
      }
    } else if (x === gameState.starPosition.x && y === gameState.starPosition.y) {
      //PUNKT
      moveSnake({ x, y }, true);
      setGameState({
        ...gameState,
        points: gameState.points + gameState.speed,
        starPosition: randomPosition(),
      });
      console.log("yeah ⭐ punkty: " + gameState.points);
    } else if (x === bonusPosition?.x && y === bonusPosition?.y) {
      //PUNKT BONUS
      moveSnake({ x, y }, true);
      setGameState({
        ...gameState,
        points: gameState.points + bonusTimeRemaining,
      });
      onBonusScore();
      console.log("yeah ✡️ punkty: " + gameState.points);
    } else if (snake.filter((sn) => (sn.x === x) & (sn.y === y)).length > 0) {
      console.log("❌ GAME OVER 🍰🍰🍰🍰 ZJADŁEM SIĘ 😔");
      setGameState({ ...gameState, status: "GAMEOVER" });
    } else {
      moveSnake({ x, y });
    }
  };

  return { snake, gameState, makeNextStep, changeDirection, togglePause, gameOver, bonusPosition, bonusTimeRemaining };
}
