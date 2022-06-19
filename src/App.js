import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Components/StartPage/Start";
import Quiz from "./Components/QuizPage/Quiz";
import Error from "./Components/Error/Error";
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";

import { StrictMode } from "react";
import useLocalStorage from "./Hooks/useLocalStorage";
import useGetLocalData from "./Hooks/useGetLocalData";

const App = () => {
  const { data: darkMode, setData: setDarkMode } = useGetLocalData("darkmode");

  const toggleDarkMode = () => {
    const body = document.body;
    const darkmodeBtn = body.querySelector(".darkmode-btn");

    if (darkMode) {
      darkmodeBtn.classList.add("active");
      body.classList.add("darkmode");
    } else {
      darkmodeBtn.classList.remove("active");
      body.classList.remove("darkmode");
    }
  };

  useEffect(() => {
    toggleDarkMode();

    return useLocalStorage("darkmode", darkMode || false);
  }, [darkMode, setDarkMode]);

  return (
    <StrictMode>
      <BrowserRouter>
        <div className="App">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
            className="darkmode-btn"
          >
            <FaMoon className="moon-icon" />
            <BsFillSunFill className="sun-icon" />
          </button>
          <div className="content">
            <Routes>
              <Route
                path="/quiz/:difficulty/:categoryName/:category"
                element={<Quiz />}
              />
              <Route path="/" element={<Start />} />
              <Route path="*" element={<Error error404="true" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
