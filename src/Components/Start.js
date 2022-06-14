import { Link, useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  const formActionHandler = (e) => {
    e.preventDefault();
    navigate("/quiz");
  };

  return (
    <div className="start-container">
      <h1>Quizzical</h1>
      <p>Answer fun trivia questions! </p>
      <form className="quiz-form" onSubmit={formActionHandler}>
        <label htmlFor="select-difficulty">Difficulty</label>
        <select id="select-difficulty">
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
