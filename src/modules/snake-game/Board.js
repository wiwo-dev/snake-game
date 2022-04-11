import React, { useEffect, useRef, useState } from "react";

const Board = ({ width, height, star, snakeArray, bonusPosition, bonusTimeRemaining }) => {
  const checkIfSnake = ({ x, y }) => {
    let numer;
    snakeArray.forEach((sn, ind) => {
      if (sn && sn.x === x && sn.y === y) numer = ind + 1;
    });
    return numer;
  };

  const BoardCell = ({ x, y, oneCellSize }) => {
    let classString = ``;
    let insideText = ``;
    const num = checkIfSnake({ x, y });
    //snake
    if (num) {
      classString = `${classString} ${
        num % 2 ? "bg-green-200" : "bg-green-400"
      } flex flex-col justify-center items-center`;
      //insideText = num;
    }

    //star
    if (star.x === x && star.y === y) classString = `bg-yellow-400`;

    //bonus
    if (bonusPosition && bonusPosition.x === x && bonusPosition.y === y) {
      classString = `bg-red-400`;
      insideText = bonusTimeRemaining;
    }

    return (
      <div className={classString} style={{ width: `${oneCellSize}px`, height: `${oneCellSize}px` }}>
        <p>{insideText}</p>
        <p className="text-[10px]">{`${x}-${y}`}</p>
      </div>
    );
  };

  const boardRef = useRef();
  const [oneCellSize, setOneCellSize] = useState(10);

  useEffect(() => {
    const totalWidth = boardRef.current.getBoundingClientRect().width;
    const cellCount = width;
    //2*cellCount - borders inside
    //-4 borders outside
    setOneCellSize((totalWidth - 2 * cellCount - 4) / cellCount);
    return () => {};
  }, [width]);

  return (
    <>
      {/* ROWS */}
      <div ref={boardRef} className="flex flex-col w-full border-[2px] border-black overflow-hidden">
        {[...Array(height)].map((y, iy) => (
          <div key={iy} className={`flex border-0 border-yellow-800`} style={{ height: `${oneCellSize}px` }}>
            {/* COLS */}
            {[...Array(width)].map((x, ix) => (
              <div key={width * iy + ix} className="border-[1px] border-[#A0D600] text-xs transition-all">
                <BoardCell x={ix} y={iy} oneCellSize={oneCellSize} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
