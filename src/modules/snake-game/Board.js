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
          <BoardCellAbsolute x={star.x} y={star.y} oneCellSize={oneCellSize} color="" type="star" />
          {bonusPosition && (
            <BoardCellAbsolute
              x={bonusPosition?.x}
              y={bonusPosition?.y}
              oneCellSize={oneCellSize}
              color=""
              type="bonus"
            />
          )}
          {snakeArray.map((el, ind) => (
            <BoardCellAbsolute
              key={ind}
              x={el.x}
              y={el.y}
              oneCellSize={oneCellSize}
              color={ind % 2 ? "bg-[rgba(0,0,0,.6)]" : "bg-[rgba(0,0,0,.4)]"}
              gameOverAnimation={gameOver && true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;

const BoardCellAbsolute = ({ x, y, oneCellSize, color, gameOverAnimation = false, type }) => {
  return (
    <div
      className={`absolute ${color} ${gameOverAnimation && "animate-ping"}`}
      style={{
        left: x * oneCellSize,
        top: y * oneCellSize,
        width: `${oneCellSize}px`,
        height: `${oneCellSize}px`,
      }}>
      {type === "star" && <StarSVG size={oneCellSize} fill="rgba(0,0,0,0.8)" />}
      {type === "bonus" && <AppleSVG size={oneCellSize} fill="#DB4E4E" stroke="rgba(0,0,0,.8)" />}
    </div>
  );
};

const StarSVG = ({ size, fill = "black" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="{fill}" xmlns="http://www.w3.org/2000/svg">
      <rect y={7} width={6} height={6} />
      <rect x={14} y={7} width={6} height={6} />
      <rect x={7} width={6} height={6} />
      <rect x={7} y={14} width={6} height={6} />
    </svg>
  );
};

const AppleSVG = ({ size, fill = "#DB4E4E", stroke = "rgba(0,0,0,.8)" }) => {
  return (
    <svg width={36} height={36} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_101_34)">
        <path
          d="M18 28.728C19.8 28.728 21.3 30 22.8 30C26.4 30 30 20.4 30 15.336C29.9591 13.7817 29.3055 12.3065 28.1816 11.2321C27.0577 10.1576 25.5546 9.57098 24 9.60002C21.336 9.60002 19.2 11.328 18 12C16.8 11.328 14.664 9.60002 12 9.60002C10.4445 9.56781 8.93964 10.1534 7.81504 11.2285C6.69043 12.3036 6.03777 13.7806 6 15.336C6 20.4 9.6 30 13.2 30C14.7 30 16.2 28.728 18 28.728Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.6001 6C16.8001 6.6 18.0001 8.4 18.0001 12"
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_101_34">
          <rect width={36} height={36} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
