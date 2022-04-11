import React, { useState } from "react";

export default function useSnake(startPosition) {
  const [snake, setSnake] = useState([startPosition]);

  const moveSnake = ({ x, y }, addPoint = false) => {
    const copy = [...snake];
    copy.unshift({ x, y });
    if (!addPoint) copy.pop();
    setSnake(copy);
  };

  return { snake, moveSnake };
}
