import React, { useState } from "react";

export const GameContext = React.createContext();

export function GameContextProvider({ children }) {
  const [userName, setUserName] = useState("Jon Smith");
  const [speed, setSpeed] = useState(0);
  const [score, setScore] = useState(0);

  const [gameStatus, setGameStatus] = useState("RUNNING");
  //running
  //gameover
  //paused

  const value = { userName, setUserName, speed, setSpeed, score, setScore, gameStatus, setGameStatus };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
