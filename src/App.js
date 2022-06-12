import React from "react";
import ReactDOM from "react-dom";
const App = () => {
  return (
    <div className="start-container">
      <h1>Quizzical</h1>
      <p>Answer fun trivia questions! </p>
      <button className="start-btn">Start quiz</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
