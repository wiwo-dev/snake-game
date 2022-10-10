import React from "react";
import { motion } from "framer-motion";

export default function Button({ children, variant = "dark", fullWidth, loading = false, disabled = false, ...rest }) {
  const setingsForButtons = `text-2xl uppercase border-4 rounded-md font-vt323 p-1`;
  const settingsForLightButton = `bg-primary border-black text-black`;
  const settingsForDarkButton = `bg-black border-black text-primary`;
  const shadow = `shadow-[0_10px_0px_-0px_rgba(0,0,0,0.5)] 
  ${
    !disabled &&
    `active:shadow-[0_3px_0px_-0px_rgba(0,0,0,0.5)] active:translate-y-1
    hover:shadow-[0px_8px_0px_-0px_rgba(0,0,0,0.5)] hover:translate-y-[2px]`
  }
  `;

  return (
    <>
      <button
        disabled={disabled}
        {...rest}
        className={`${variant === "dark" ? settingsForDarkButton : settingsForLightButton} ${shadow} ${
          fullWidth ? "w-full" : ""
        } ${setingsForButtons}`}>
        <div className="w-full h-full px-3 border-4 border-black rounded-md relative">
          {loading && (
            <>
              <motion.div
                className="absolute top-0 overflow-hidden h-full -translate-x-3 bg-[rgba(0,0,0,.5)]"
                animate={{ width: ["0%", "100%"] }}
                transition={{ repeat: Infinity, repeatType: "", duration: 1.3, ease: "easeOut" }}></motion.div>
              <span className="absolute top-0 left-0 px-3 w-full flex justify-center">{children}</span>
            </>
          )}
          {children}
        </div>
      </button>
    </>
  );
}
