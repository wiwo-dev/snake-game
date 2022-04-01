import React from "react";

export default function Button({ children, variant, fullWidth, ...rest }) {
  const shadow = `shadow-[0_10px_0px_-0px_rgba(0,0,0,0.5)] active:shadow-[0_3px_0px_-0px_rgba(0,0,0,0.5)] active:translate-y-1`;

  if (variant === "clear") {
    return (
      <>
        <button
          {...rest}
          className={`text-xl uppercase bg-primary border-4 border-black rounded-md text-black font-vt323 ${shadow} p-1 ${
            fullWidth ? "w-full" : ""
          }`}>
          <div className="w-full h-full px-3 border-4 border-black rounded-md">{children}</div>
        </button>
      </>
    );
  }

  return (
    <>
      <button
        {...rest}
        className={`text-xl uppercase bg-black border-4 border-black rounded-md text-primary font-vt323 ${shadow} p-1 ${
          fullWidth ? "w-full" : ""
        }`}>
        <div className="w-full h-full px-3 border-4 rounded-md border-primary">{children}</div>
      </button>
    </>
  );
}
