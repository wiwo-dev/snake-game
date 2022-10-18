import React from "react";

export default function Heading({ children, variant, className }) {
  return (
    <>
      <div className={`flex items-center justify-around flex-grow ${className}`}>
        <div className="flex-auto h-1 bg-black "></div>
        <div className="px-2">
          {variant === "h2" ? (
            <h2 className={`text-2xl text-black font-vt323`}>{children}</h2>
          ) : (
            <h1 className={`text-4xl text-black font-vt323`}>{children}</h1>
          )}
        </div>
        <div className="flex-auto h-1 bg-black "></div>
        <hr />
      </div>
    </>
  );
}
