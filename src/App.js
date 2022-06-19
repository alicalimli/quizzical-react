import ReactDOM from "react-dom";

import React, { useState, StrictMode, createContext } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from "./Pages/StartPage/Start";
import Quiz from "./Pages/QuizPage/Quiz";
import Header from "./Components/Header/Header";
import Error from "./Pages/Error/Error";

export const quizInfoContext = createContext({});

const App = () => {
  const quizInfoState = useState({
    name: "",
    category: "",
    difficulty: "",
    categoryName: "",
  });

  return (
    <StrictMode>
      <BrowserRouter>
        <quizInfoContext.Provider value={quizInfoState}>
          <div className="App">
            <Header />
            <div className="content">
              <Routes>
                <Route path="/quiz" element={<Quiz />} />
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
