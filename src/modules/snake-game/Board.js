import React, { useEffect, useRef, useState } from "react";

const Board = ({ width, height, star, snakeArray, bonusPosition, bonusTimeRemaining, gameOver, children }) => {
  const boardRef = useRef();
  const [oneCellSize, setOneCellSize] = useState(10);

  useEffect(() => {
    const totalWidth = boardRef.current.getBoundingClientRect().width;
    const cellCount = width;
    //2*cellCount - borders inside
    //-4 borders outside
    //setOneCellSize((totalWidth - 2 * cellCount - 4) / cellCount);
    setOneCellSize((totalWidth - 4) / cellCount);
    return () => {};
  }, [width]);

  return (
    <>
      {/* ROWS */}
      <div ref={boardRef} className="flex flex-col w-full border-[2px] border-black overflow-hidden">
        {[...Array(height)].map((y, iy) => (
          <div key={iy} className={`flex border-0`} style={{ height: `${oneCellSize}px` }}>
            {/* COLS */}
            {[...Array(width)].map((x, ix) => (
              <div
                key={width * iy + ix}
                className="border-[1px] border-[#A0D600] text-xs box-border"
                style={{ width: `${oneCellSize}px` }}></div>
            ))}
          </div>
        ))}
        <div className="absolute">
          <BoardCellAbsolute x={star.x} y={star.y} oneCellSize={oneCellSize} color="bg-yellow-400" />
          {bonusPosition && (
            <BoardCellAbsolute x={bonusPosition?.x} y={bonusPosition?.y} oneCellSize={oneCellSize} color="bg-red-400" />
          )}
          {snakeArray.map((el, ind) => (
            <BoardCellAbsolute
              key={ind}
              x={el.x}
              y={el.y}
              oneCellSize={oneCellSize}
              color={ind % 2 ? "bg-green-200" : "bg-green-400"}
              ping={gameOver && true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;

const BoardCellAbsolute = ({ x, y, oneCellSize, color, ping = false }) => {
  return (
    <div
      className={`absolute ${color} ${ping && "animate-ping"}`}
      style={{
        left: x * oneCellSize,
        top: y * oneCellSize,
        width: `${oneCellSize}px`,
        height: `${oneCellSize}px`,
      }}></div>
  );
};
