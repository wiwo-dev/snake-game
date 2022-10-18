import React, { useEffect, useRef, useState } from "react";
import useWindowWidth from "../../utils/useWindowWidth";
import { AppleSVG } from "./Icons/Apple";
import { PartBH } from "./Icons/PartBH";
import { PartBV } from "./Icons/PartBV";
import { PartCornerLeftBottom } from "./Icons/PartCornerLeftBottom";
import { PartCornerLeftTop } from "./Icons/PartCornerLeftTop";
import { PartCornerRightBottom } from "./Icons/PartCornerRightBottom";
import { PartCornerRightTop } from "./Icons/PartCornerRightTop";
import { PartHead } from "./Icons/PartHead";
import { StarSVG } from "./Icons/Star";

const Board = ({
  width,
  height,
  star,
  snakeArray,
  snakeParts,
  bonusPosition,
  bonusTimeRemaining,
  gameOver,
  headDirection,
  children,
}) => {
  const boardRef = useRef();
  const [oneCellSize, setOneCellSize] = useState(10);

  const { windowWidth } = useWindowWidth();

  useEffect(() => {
    const totalWidth = boardRef.current.getBoundingClientRect().width;
    const cellCount = width;
    //2*cellCount - borders inside
    //-4 borders outside
    //setOneCellSize((totalWidth - 2 * cellCount - 4) / cellCount);
    setOneCellSize((totalWidth - 4) / cellCount);
    return () => {};
  }, [width, windowWidth]);

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
              //color={ind % 2 ? "bg-[rgba(0,0,0,.6)]" : "bg-[rgba(0,0,0,.4)]"}
              fill={ind % 2 ? "rgba(0,0,0,.7)" : "rgba(0,0,0,.9)"}
              gameOverAnimation={gameOver && true}
              type={el.part}
              headDirection={headDirection}>
              {el.part}
            </BoardCellAbsolute>
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;

const BoardCellAbsolute = ({
  x,
  y,
  oneCellSize,
  color,
  fill,
  gameOverAnimation = false,
  type,
  headDirection,
  children,
}) => {
  const snakeFill = "#777777";
  return (
    <div
      className={`absolute ${color} ${gameOverAnimation && "animate-ping"} flex justify-center items-center`}
      style={{
        left: x * oneCellSize,
        top: y * oneCellSize,
        width: `${oneCellSize}px`,
        height: `${oneCellSize}px`,
      }}>
      {type === "star" && <StarSVG size={oneCellSize} fill="rgba(0,0,0,0.8)" />}
      {type === "bonus" && <AppleSVG size={oneCellSize} fill="#DB4E4E" stroke="rgba(0,0,0,.8)" />}
      {type === "H" && <PartHead size={oneCellSize} direction={headDirection} fill={fill} />}
      {type === "HL" && <PartHead size={oneCellSize} direction={"L"} fill={fill} />}
      {type === "HR" && <PartHead size={oneCellSize} direction={"R"} fill={fill} />}
      {type === "HU" && <PartHead size={oneCellSize} direction={"U"} fill={fill} />}
      {type === "HD" && <PartHead size={oneCellSize} direction={"D"} fill={fill} />}
      {type === "BH" && <PartBH size={oneCellSize} fill={fill} />}
      {type === "BV" && <PartBV size={oneCellSize} fill={fill} />}
      {type === "CLB" && <PartCornerLeftBottom size={oneCellSize} fill={fill} />}
      {type === "CLT" && <PartCornerLeftTop size={oneCellSize} fill={fill} />}
      {type === "CRB" && <PartCornerRightBottom size={oneCellSize} fill={fill} />}
      {type === "CRT" && <PartCornerRightTop size={oneCellSize} fill={fill} />}
      {/* {children} */}
    </div>
  );
};
