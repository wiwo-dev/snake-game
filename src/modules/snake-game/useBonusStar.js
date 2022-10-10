import React, { useState } from "react";

export default function useBonusStar({ randomPosition }) {
  const [bonusPosition, setBonusPosition] = useState(randomPosition());
  const DEFAULT_BONUS_TIME = 60;
  const [bonusTimeRemaining, setBonusTimeRemaining] = useState(DEFAULT_BONUS_TIME);

  const bonusStarTick = (speed) => {
    if (bonusTimeRemaining <= speed) {
      const probability = Math.random() * 100;

      if (probability > 92) {
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
    setBonusPosition(randomPosition());
    setBonusTimeRemaining(DEFAULT_BONUS_TIME);
  };

  return { bonusPosition, bonusTimeRemaining, onBonusScore, bonusStarTick };
}
