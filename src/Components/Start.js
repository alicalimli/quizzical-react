import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Start = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("easy");

  const formActionHandler = (e) => {
    e.preventDefault();
    navigate(`/quiz/${difficulty}`);
  };

  return (
    <div className="start-container">
      <h1>Quizzical</h1>
      <p>Answer fun trivia questions! </p>
      <form className="quiz-form" onSubmit={formActionHandler}>
        <label htmlFor="select-difficulty">Difficulty</label>
        <select
          id="select-difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className="btn start-btn">Start quiz</button>
      </form>
    </div>
  );
};

export default Start;
