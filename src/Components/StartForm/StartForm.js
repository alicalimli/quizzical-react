import "./StartForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartForm = ({ categories }) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState();

  const navigate = useNavigate();

  const formActionHandler = (e) => {
    e.preventDefault();
    navigate(`/quiz/${difficulty}/${category}`);
  };

  return (
    <div className="start-container">
      {" "}
      <h1>Quizzical</h1>
      <p>Answer fun trivia questions! </p>
      <form className="quiz-form" onSubmit={formActionHandler}>
        <label htmlFor="select-category">
          Category
          <select
            required
            id="select-category"
            onChange={(e) => setCategory(e.target.value)}
            onBlur={(e) => setCategory(e.target.value)}
          >
            <option
              value=""
              style={{ display: "none" }}
              default
              selected
              disabled
            >
              Please select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="select-difficulty">
          Difficulty
          <select
            id="select-difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
            onBlur={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <button className="btn start-btn">Start quiz</button>
      </form>
    </div>
  );
};

export default StartForm;
