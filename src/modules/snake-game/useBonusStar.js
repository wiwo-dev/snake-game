import React, { useState } from "react";

const DEFAULT_BONUS_TIME = 60;
const PROBABILITY = 3;

export default function useBonusStar({ randomPosition, shouldCreateBonusStar }) {
  const [bonusPosition, setBonusPosition] = useState(randomPosition());
  const [bonusTimeRemaining, setBonusTimeRemaining] = useState(DEFAULT_BONUS_TIME);

  const bonusStarTick = (speed) => {
    if (bonusTimeRemaining <= speed) {
      const probability = Math.random() * 100;

      if (shouldCreateBonusStar) {
        setBonusPosition(randomPosition());
        setBonusTimeRemaining(DEFAULT_BONUS_TIME);
        return bonusPosition;
      }

      setBonusPosition(null);
      setBonusTimeRemaining(0);
      return null;
    }

    setBonusTimeRemaining((prev) => prev - speed);
  };

  const onBonusScore = () => {
    setBonusPosition(null);
    setBonusTimeRemaining(0);
  };

  return { bonusPosition, bonusTimeRemaining, onBonusScore, bonusStarTick };
}
