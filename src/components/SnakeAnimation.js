import React from "react";
import snake from "./twemoji_snake.svg";

export default function SnakeAnimation() {
  return (
    <>
      <div className="p-8 mx-auto bg-gray-500 border-2 border-black rounded-full w-fit shadow-[0_10px_0px_-0px_rgba(0,0,0,0.5)]">
        <img className="mx-auto w-36" src={snake} alt="snake" />
      </div>
    </>
  );
}
