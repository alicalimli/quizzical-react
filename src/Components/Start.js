import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Start = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("easy");
  const [pending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
      setCategories(categoriesResults.trivia_categories);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="start-container">
      {console.log(categories.length)}
      {categories.length !== 0 ? (
        <div>
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
      ) : (
        ""
      )}
    </div>
  );
};

export default Start;
