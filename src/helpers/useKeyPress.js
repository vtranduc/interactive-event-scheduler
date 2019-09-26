import { useEffect, useState } from "react";

export default function useKeyPress(targetKey) {
  const [key, setKey] = useState(false);
  useEffect(() => {
    const downHandler = function({ key }) {
      if (targetKey === key) {
        setKey(true);
      }
    };
    const upHandler = function({ key }) {
      if (targetKey === key) {
        setKey(false);
      }
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);
  return key;
}
