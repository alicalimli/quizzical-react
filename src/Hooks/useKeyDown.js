/**
 * For Example:
 * The following code function uses useEffect which is a React Hook.
 * That's why it's we separate save it into /hooks/folder
 * and starting its name with the term "use" as useKeyDown
 * so it's easier to find it and acknowledge that it's a hook.
 * */

import { useEffect } from "react";

const useKeyDown = (callback) => {
  //   Wraping the callback in a useEffect hook to avoid double firing
  useEffect(() => {
    // store the callback in a variable so it can be removed later
    const KeydownListener = addEventListener("keydown", (e) => {
      // if the key pressed is the "Enter" key, call the callback function
      if (e.key === "Escape") callback();
      console.log(e);
    });

    return () => {
      // remove the event listener on unmount
      removeEventListener("keydown", KeydownListener);
    };
  }, [callback]);
};

export default useKeyDown;
