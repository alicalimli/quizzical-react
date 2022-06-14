import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Start = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("easy");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();

  const formActionHandler = (e) => {
    e.preventDefault();
    navigate(`/quiz/${difficulty}/${category}`);
  };

  useEffect(() => {
    fetcCategoryData();
  }, []);

  const fetcCategoryData = async () => {
    try {
      const categories = await fetch("https://opentdb.com/api_category.php");
      const categoriesResults = await categories.json();
      const categorySelection = document.querySelector("#select-category");
      setCategories(categoriesResults.trivia_categories);

      return setCategory(categorySelection.firstChild.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="start-container">
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
            {categories.length !== 0
              ? categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              : ""}
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

export default Start;
