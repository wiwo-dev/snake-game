import React, { useEffect, useState } from "react";

export default function useSnake({ startPosition, boardWidth, boardHeight }) {
  const [snake, setSnake] = useState([startPosition]);

  const whatPart = (a, b, c) => {
    if ((a.x + 1) % boardWidth === b.x && (b.x + 1) % boardWidth === c.x) return "BH";
    if ((c.x + 1) % boardWidth === b.x && (b.x + 1) % boardWidth === a.x) return "BH";
    if ((a.y + 1) % boardHeight === b.y && (b.y + 1) % boardHeight === c.y) return "BV";
    if ((c.y + 1) % boardHeight === b.y && (b.y + 1) % boardHeight === a.y) return "BV";
    //corner left bottom
    if ((a.y + 1) % boardHeight === b.y && (b.x + 1) % boardWidth === c.x) return "CLB";
    if ((c.y + 1) % boardHeight === b.y && (b.x + 1) % boardWidth === a.x) return "CLB";
    //corner right bottom
    if ((a.y + 1) % boardHeight === b.y && b.x === (c.x + 1) % boardWidth) return "CRB";
    if ((c.y + 1) % boardHeight === b.y && b.x === (a.x + 1) % boardWidth) return "CRB";
    //corner right top
    if (a.y === (b.y + 1) % boardHeight && b.x === (c.x + 1) % boardWidth) return "CRT";
    if (c.y === (b.y + 1) % boardHeight && b.x === (a.x + 1) % boardWidth) return "CRT";
    //corner left top
    if (a.y === (b.y + 1) % boardHeight && (b.x + 1) % boardWidth === c.x) return "CLT";
    if (c.y === (b.y + 1) % boardHeight && (b.x + 1) % boardWidth === a.x) return "CLT";

    return "B?";
  };

  const headDirection = (head, second) => {
    if (head.y === second.y && head.x === (second.x + 1) % boardWidth) return "HR";
    if (head.y === second.y && (head.x + 1) % boardWidth === second.x) return "HL";
    if (head.x === second.x && head.y === (second.y + 1) % boardWidth) return "HD";
    if (head.x === second.x && (head.y + 1) % boardWidth === second.y) return "HU";
    return "H";
  };

  const secondElementDirection = (head, second) => {
    if (head.x === second.x) return "BV";
    if (head.y === second.y) return "BH";
  };

  const moveSnake = ({ x, y, addPoint = false }) => {
    const copy = [...snake];
    copy.unshift({ x, y });
    let popped;
    if (!addPoint) popped = copy.pop();

    copy[0] = { ...copy[0], part: "H" };
    if (popped) copy[0] = { ...copy[0], part: headDirection(copy[0], popped) };
    if (copy.length >= 2) copy[0] = { ...copy[0], part: headDirection(copy[0], copy[1]) };
    if (copy.length === 2) copy[1] = { ...copy[1], part: secondElementDirection(copy[0], copy[1]) };
    if (copy.length > 2) {
      for (let i = 1; i < copy.length - 1; i++) {
        const part = whatPart(copy[i - 1], copy[i], copy[i + 1]);
        copy[i] = { ...copy[i], part };
      }
    }

    setSnake(copy);
  };

  return { snake, moveSnake };
}
