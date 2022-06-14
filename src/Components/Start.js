import { Link, useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  const formActionHandler = (e) => {
    console.log("ss");
    e.preventDefault();
    navigate("/quiz");
  };

  return (
    <div className="start-container">
      <h1>Quizzical</h1>
      <p>Answer fun trivia questions! </p>
      <form onSubmit={formActionHandler} onBlur={formActionHandler}>
        <select>
          <option value="yeye">yeye</option>
        </select>
        <button className="btn start-btn">Start quiz</button>
      </form>
    </div>
  );
};

export default Start;
