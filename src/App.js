import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Pages/StartPage";
import Quiz from "./Pages/QuizPage";
import Error from "./Pages/Error";
import { StrictMode } from "react";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/quiz/:difficulty/:categoryName/:category"
            element={<Quiz />}
          />
          <Route path="/" element={<Start />} />
          <Route path="*" element={<Error error404="true" />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
