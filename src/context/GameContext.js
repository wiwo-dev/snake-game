import React, { useState } from "react";

export const GameContext = React.createContext();

export function GameContextProvider({ children }) {
  const [userName, setUserName] = useState("Name and surname");
  const [speed, setSpeed] = useState(3);
  const [wallTeleport, setWallTeleport] = useState(true);
  const [lastSavedScore, setLastSavedScore] = useState(null);
  const [boardWidth, setBoardWidth] = useState(13);
  const [boardHeight, setBoardHeight] = useState(10);
  const [gameStatus, setGameStatus] = useState("RUNNING");
  //running
  //gameover
  //paused

  const [gameState, setGameState] = useState({
    points: 0,
    eatenElementsCount: 0,
    //starPosition: randomPosition(),
    starPosition: { x: 2, y: 3 },
    status: "RUNNING",
    direction: "R",
    speed: speed,
  });

  const value = {
    userName,
    setUserName,
    speed,
    setSpeed,
    wallTeleport,
    setWallTeleport,
    gameState,
    setGameState,
    gameStatus,
    setGameStatus,
    lastSavedScore,
    setLastSavedScore,
    boardWidth,
    setBoardWidth,
    boardHeight,
    setBoardHeight,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
