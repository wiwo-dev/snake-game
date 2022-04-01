import React from "react";

export default function Food({ x, y }) {
  return <div className={`absolute w-3 h-3 bg-black`} style={{ transform: `translate(${x}px, ${y}px)` }}></div>;
}
