import React from "react";

export default function Input({ fullWidth, ...rest }) {
  const shadow = `shadow-[0_10px_0px_-0px_rgba(0,0,0,0.5)]`;

  return (
    <>
      <input
        className={`text-xl uppercase bg-primary border-4 border-black rounded-md text-black font-vt323 ${shadow} p-1 ${
          fullWidth ? "w-full" : ""
        }
          focus-visible:outline-none
          `}>
        {/* <div className="w-full h-full px-3 border-4 border-black rounded-md">{children}</div> */}
      </input>
    </>
  );
}
