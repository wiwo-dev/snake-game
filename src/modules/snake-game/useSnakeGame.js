import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";
import useBonusStar from "./useBonusStar";
import useSnake from "./useSnake";

export default function useSnakeGame({ handleGameOver }) {
  const { wallTeleport, gameState, setGameState, boardWidth, boardHeight } = useContext(GameContext);

  //init
  useEffect(() => {
    setGameState({
      ...gameState,
      points: 0,
      eatenElementsCount: 0,
      starPosition: randomPosition(),
      status: "RUNNING",
      direction: "R",
    });
  }, []);

  const midX = Math.floor(boardWidth / 2);
  const midY = Math.floor(boardHeight / 2);

  const { snake, moveSnake } = useSnake({
    startPosition: { x: midX, y: midY },
    boardWidth: boardWidth,
    boardHeight: boardHeight,
  });

  const randomPosition = (toCheck = { x: 1, y: 1 }) => {
    let x;
    let y;
    const setRandom = () => {
      x = Math.floor(Math.random() * boardWidth);
      y = Math.floor(Math.random() * boardHeight);
    };
    setRandom();
    const checkIfInSnake = () => {
      return snake.filter((el) => el.x === x && el.y === y).length > 0;
    };
    const chekIfOnStar = () => {
      return x === gameState.starPosition.x && y === gameState.starPosition.y;
    };
    //used to check if not creating a new star on already existing apple
    const checkPassedPoint = () => {
      if (!toCheck) return false;
      return x === toCheck.x && y === toCheck.y;
    };

    while (checkIfInSnake() || chekIfOnStar() || checkPassedPoint()) {
      console.log("while loop when generating");
      setRandom();
    }
    return { x, y };
  };

  const shouldCreateBonusStar = () => {
    return gameState.eatenElementsCount % 5 === 0 && gameState.eatenElementsCount > 0;
  };

  const { bonusPosition, bonusTimeRemaining, onBonusScore, bonusStarTick } = useBonusStar({
    randomPosition,
    shouldCreateBonusStar: shouldCreateBonusStar(),
  });

  const changeDirection = (dir) => {
    if (gameState.direction === "R" && dir === "L") return;
    if (gameState.direction === "L" && dir === "R") return;
    if (gameState.direction === "U" && dir === "D") return;
    if (gameState.direction === "D" && dir === "U") return;
    setGameState({ ...gameState, direction: dir });
  };

  const togglePause = () => {
    if (gameState.status === "PAUSED") setGameState({ ...gameState, status: "RUNNING" });
    else setGameState({ ...gameState, status: "PAUSED" });
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
    if (x < 0 || y < 0 || x >= boardWidth || y >= boardHeight) {
      if (wallTeleport) {
        if (x < 0) x = boardWidth + x;
        if (y < 0) y = boardHeight + y;
        if (x >= boardWidth) x = x - boardWidth;
        if (y >= boardHeight) y = y - boardHeight;
        moveSnake({ x, y });
      } else {
        console.log("❌ GAME OVER 😔");
        handleGameOver();
        return;
      }
    } else if (x === gameState.starPosition.x && y === gameState.starPosition.y) {
      //POINT!
      moveSnake({ x, y, addPoint: true });
      setGameState({
        ...gameState,
        points: gameState.points + gameState.speed,
        eatenElementsCount: gameState.eatenElementsCount + 1,
        starPosition: randomPosition(bonusPosition),
      });
      console.log("yeah ⭐ points: " + gameState.points);
    } else if (x === bonusPosition?.x && y === bonusPosition?.y) {
      //BONUS POINT
      moveSnake({ x, y, addPoint: true });
      setGameState({
        ...gameState,
        points: gameState.points + bonusTimeRemaining,
        eatenElementsCount: gameState.eatenElementsCount + 1,
      });
      onBonusScore();
      console.log("yeah 🍎 points: " + gameState.points);
    } else if (snake.filter((sn) => sn.x === x && sn.y === y).length > 0) {
      console.log("❌ GAME OVER 🍰🍰🍰🍰 SNAKE EAT HIMSELF 😔");
      handleGameOver();
    } else {
      moveSnake({ x, y });
    }
  };

  return {
    snake,
    gameState,
    makeNextStep,
    changeDirection,
    togglePause,

    bonusPosition,
    bonusTimeRemaining,
    randomPosition,
  };
}
