import { useEffect } from "react";

const useKeyDown = (callback, key) => {
  useEffect(() => {
    const keyChecker = (event) => {
      if (event.key !== key) return;
      callback();
    };

    const keyDownEventListener = window.addEventListener("keydown", keyChecker);

    return () => {
      removeEventListener("keydown", keyDownEventListener);
    };
  }, [callback, key]);
};

export default useKeyDown;
