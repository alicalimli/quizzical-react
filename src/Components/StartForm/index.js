import "./StartForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartForm = ({ categories }) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [categoryName, setCategoryName] = useState();
  const [category, setCategory] = useState();

  const navigate = useNavigate();

  const formActionHandler = (e) => {
    e.preventDefault();
    navigate(`/quiz/${difficulty}/${categoryName}/${category}`);
  };

  const handleControlledInputs = (e) => {
    // Takes the text of whatever is the content of the selected option
    const categoryText = e.target.options[e.target.selectedIndex].text;
    const newCategoryText =
      categoryText.replace(/\s/g, "").split(":")[1] || categoryText;

    setCategory(e.target.value);
    setCategoryName(newCategoryText);
  };

  return (
    <div className="start-container">
      <div className="title">
        <h1>Quizzical</h1>
        <p>Answer fun trivia questions! </p>
      </div>
      <form className="quiz-form" onSubmit={formActionHandler}>
        <label htmlFor="select-category">
          Category
          <select
            required
            id="select-category"
            onChange={handleControlledInputs}
            onBlur={handleControlledInputs}
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
        <button className="btn btn-hv start-btn">Start quiz</button>
      </form>
    </div>
  );
};

export default StartForm;
