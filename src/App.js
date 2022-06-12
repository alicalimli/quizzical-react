import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter></BrowserRouter>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
