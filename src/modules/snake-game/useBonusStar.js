import React, { useContext, useRef, useState } from "react";
import { GameContext } from "../../context/GameContext";

const DEFAULT_BONUS_TIME = 60;

export default function useBonusStar({ randomPosition }) {
  const [bonusPosition, setBonusPosition] = useState(null);
  const [bonusTimeRemaining, setBonusTimeRemaining] = useState(DEFAULT_BONUS_TIME);

  const { gameState } = useContext(GameContext);

  const shouldCreateBonusStar = () => {
    return gameState.eatenElementsCount % 5 === 0 && gameState.eatenElementsCount > 0;
  };

  const bonusStarCreated = useRef(false);

  const bonusStarTick = (speed) => {
    if (bonusTimeRemaining <= speed) {
      if (shouldCreateBonusStar) {
        setBonusPosition(randomPosition());
        setBonusTimeRemaining(DEFAULT_BONUS_TIME);
        bonusStarCreated.current = true;
        return bonusPosition;
      }
      setBonusPosition(null);
      setBonusTimeRemaining(0);
      return null;
    }
    setBonusTimeRemaining((prev) => prev - speed);
  };

  //when eating a bonus
  const onBonusScore = () => {
    setBonusPosition(null);
    setBonusTimeRemaining(0);
  };

  return { bonusPosition, bonusTimeRemaining, onBonusScore, bonusStarTick };
}
