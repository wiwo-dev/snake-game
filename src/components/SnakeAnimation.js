import React from "react";
//import snake from "./twemoji_snake.svg";
import snake from "./snake2.svg";

export default function SnakeAnimation() {
  return (
    <>
      <div className="p-4 xs:p-6 md:p-10 mx-auto w-fit">
        <img className="mx-auto w-32 md:w-44" src={snake} alt="snake game logo" />
      </div>
    </>
  );
}
