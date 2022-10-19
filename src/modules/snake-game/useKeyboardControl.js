import { useCallback, useEffect, useState } from "react";

const useKeyboardControl = ({ onChange }) => {
  const [direction, setDirection] = useState("R");

  const keyPress = useCallback(
    (e) => {
      if (e.keyCode === "38" || e.code === "ArrowUp") {
        setDirection("U");
        onChange("U");
      } else if (e.keyCode === "40" || e.code === "ArrowDown") {
        setDirection("D");
        onChange("D");
      } else if (e.keyCode === "37" || e.code === "ArrowLeft") {
        setDirection("L");
        onChange("L");
      } else if (e.keyCode === "39" || e.code === "ArrowRight") {
        setDirection("R");
        onChange("R");
      } else if (e.keyCode === "32" || e.code === " " || e.code === "Spacebar") {
        console.log("SPACJA");
      }
    },
    [setDirection, onChange]
  );

  useEffect(() => {
    const listener = document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [keyPress]);

  return { direction };
};

export default useKeyboardControl;
