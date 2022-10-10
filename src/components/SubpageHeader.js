import React from "react";
import { useNavigate } from "react-router-dom";

export default function SubpageHeader({ children, variant }) {
  let navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-around flex-grow">
        <div className="flex-auto h-1 bg-black "></div>
        <div className="px-2">
          <h1 className={`text-4xl text-black font-vt323`}>{children}</h1>
        </div>
        <div className="flex-auto h-1 bg-black "></div>
        <div
          className="px-4 hover:cursor-pointer"
          onClick={() => {
            navigate("/");
            console.log("CLICK");
          }}>
          X
        </div>
      </div>
    </>
  );
}

// <div className="flex items-center">
// <Heading variant="h1">Game</Heading>
// <div className="px-4 hover:cursor-pointer" onClick={() => navigate("/")}>
//   X
// </div>
// </div>
