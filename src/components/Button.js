import React from "react";

export default function Button({ children, variant, fullWidth, ...rest }) {
  const setingsForButtons = `text-2xl uppercase border-4 rounded-md font-vt323 p-1`;
  const shadow = `shadow-[0_10px_0px_-0px_rgba(0,0,0,0.5)] active:shadow-[0_3px_0px_-0px_rgba(0,0,0,0.5)] active:translate-y-1`;

  if (variant === "clear" || variant === "light") {
    return (
      <>
        <button
          {...rest}
          className={`bg-primary border-black text-black ${shadow} ${fullWidth ? "w-full" : ""} ${setingsForButtons}`}>
          <div className="w-full h-full px-3 border-4 border-black rounded-md">{children}</div>
        </button>
      </>
    );
  }

  return (
    <>
      <button
        {...rest}
        className={` bg-black  border-black text-primary ${shadow} ${fullWidth ? "w-full" : ""} ${setingsForButtons}`}>
        <div className="w-full h-full px-3 border-4 rounded-md border-primary">{children}</div>
      </button>
    </>
  );
}
