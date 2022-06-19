import ReactDOM from "react-dom";

import React, { useEffect, useState, StrictMode, createContext } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";

import useLocalStorage from "./Hooks/useLocalStorage";
import useGetLocalData from "./Hooks/useGetLocalData";

import Start from "./Pages/StartPage/Start";
import Quiz from "./Pages/QuizPage/Quiz";
import Error from "./Pages/Error/Error";

export const quizInfoContext = createContext({});

const App = () => {
  const { data: darkMode, setData: setDarkMode } = useGetLocalData("darkmode");

  const quizInfoState = useState({
    name: "",
    category: "",
    difficulty: "",
    categoryName: "",
  });

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
        <quizInfoContext.Provider value={quizInfoState}>
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
        </quizInfoContext.Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
