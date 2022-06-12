import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Components/Start";
import Quiz from "./Components/Quiz";
import { StrictMode } from "react";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/" element={<Start />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
