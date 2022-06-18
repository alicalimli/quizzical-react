import { useEffect } from "react";

const useKeyDown = (callback) => {
  //   Wraping the callback in a useEffect hook to avoid double firing
  useEffect(() => {
    // store the callback in a variable so it can be removed later
    const KeydownListener = addEventListener(
      "keydown",
      (e) => e.key === "Escape" && callback(), // if the key is Escape, call the callback
      console.log(e) // log the event
    );

    return () => {
      // remove the event listener on unmount
      removeEventListener("keydown", KeydownListener);
    };
  }, [callback]);
};

export default useKeyDown;
