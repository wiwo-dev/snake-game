import { useEffect, useRef, useState } from "react";

//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  const [actualDelay, setActualDelay] = useState(delay);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      setActualDelay(delay);
      let id = setInterval(tick, actualDelay);
      return () => clearInterval(id);
    }
  }, [delay, actualDelay]);

  return [setActualDelay];
}
