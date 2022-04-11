import React, { useState } from "react";

export default function useBonusStar({ randomPosition }) {
  const [bonusPosition, setBonusPosition] = useState(randomPosition());
  const [bonusTimeRemaining, setBonusTimeRemaining] = useState(30);

  const bonusStarTick = (speed) => {
    if (bonusTimeRemaining <= speed) {
      const number = Math.random() * 100;

      if (number > 92) {
        setBonusPosition(randomPosition());
        setBonusTimeRemaining(30);
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
    setBonusTimeRemaining(30);
  };

  return { bonusPosition, bonusTimeRemaining, onBonusScore, bonusStarTick };
}
