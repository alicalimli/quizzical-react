import "./StartForm.css";

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { quizInfoContext } from "../../App";
import useLocalStorage from "../../Hooks/useLocalStorage";
import useGetLocalData from "../../Hooks/useGetLocalData";

const StartForm = ({ categories }) => {
  const [categoryName, setCategoryName] = useState();
  const { data: name, setData: setName } = useGetLocalData("name");
  const { data: category, setData: setCategory } = useGetLocalData("category");
  const { data: difficulty, setData: setDifficulty } =
    useGetLocalData("difficulty");

  const [quizInfo, setQuizInfo] = useState(useContext(quizInfoContext));

  const navigate = useNavigate();

  const formActionHandler = (e) => {
    e.preventDefault();

    setQuizInfo(
      Object.assign(quizInfo, {
        name: name,
        difficulty: difficulty,
        category: category,
        categoryName: categoryName,
      })
    );

    navigate(`/quiz`);
  };

  useEffect(() => {
    useLocalStorage({
      name: name,
      difficulty: difficulty,
      category: category,
    });
  }, [category, name, difficulty]);

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
      {" "}
      <div className="title">
        <h1>Quizzical</h1>
        <p>Answer fun trivia questions! </p>
      </div>
      <form
        className="quiz-form"
        autoComplete="off"
        onSubmit={formActionHandler}
      >
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            value={name}
            required
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="select-category">
          Category
          <select
            required
            value={category}
            id="select-category"
            onChange={handleControlledInputs}
            onBlur={handleControlledInputs}
          >
            <option value="" default>
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
            value={difficulty}
            required
            onChange={(e) => setDifficulty(e.target.value)}
            onBlur={(e) => setDifficulty(e.target.value)}
          >
            <option value="" default>
              Please select a difficulty
            </option>
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
