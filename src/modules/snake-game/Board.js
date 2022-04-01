import React, { useEffect, useRef, useState } from "react";

const Board = ({ width, height, star, snakeArray }) => {
  const checkIfSnake = ({ x, y }) => {
    let numer;
    snakeArray.forEach((sn, ind) => {
      if (sn.x === x && sn.y === y) numer = ind + 1;
    });
    return numer;
  };

  const Point = ({ x, y, oneCellSize }) => {
    let classString = ``;
    const num = checkIfSnake({ x, y });
    //snake
    if (num) {
      classString = `${classString} ${num % 2 ? "bg-green-200" : "bg-green-400"} rounded-md`;
    }

    //star
    if (star.x === x && star.y === y) classString = `bg-yellow-400`;

    return (
      <div
        className={classString}
        style={{ display: "inline-block", width: `${oneCellSize}px`, height: `${oneCellSize}px` }}
      />
    );
  };

  const boardRef = useRef();

  const [oneCellSize, setOneCellSize] = useState(10);

  useEffect(() => {
    const totalWidth = boardRef.current.getBoundingClientRect().width;
    setOneCellSize((totalWidth - 2 * width - 4) / width);
    return () => {};
  }, [width]);

  return (
    <>
      {/* ROWS */}
      <div ref={boardRef} className="flex flex-col w-full border-[2px] border-black">
        {[...Array(height)].map((y, iy) => (
          <div key={iy} className={`flex border-0 border-yellow-800`} style={{ height: `${oneCellSize}px` }}>
            {/* COLS */}
            {[...Array(width)].map((x, ix) => (
              <div key={width * iy + ix} className="border-[1px] border-[#A0D600] text-xs transition-all">
                <Point x={ix} y={iy} oneCellSize={oneCellSize} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
