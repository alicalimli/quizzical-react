import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="start-container">
      <h1>Quizzical</h1>
      <p>Answer fun trivia questions! </p>
      <Link to="/quiz" className="btn start-btn">
        Start quiz
      </Link>
    </div>
  );
};

export default Start;
