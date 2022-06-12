const Quiz = () => {
  return (
    <div className="quizzes-container">
      <div className="quiz-container">
        <h1 className="quiz-question">
          How many cores does the Intel i7-6950X have?
        </h1>
        <ul className="quiz-answers">
          <li className="quiz-answer">
            <button
              data-answer-type="correct"
              className="active quiz-answer-btn"
            >
              10
            </button>
          </li>
          <li className="quiz-answer">
            <button data-answer-type="incorrect" className="quiz-answer-btn">
              12
            </button>
          </li>
          <li className="quiz-answer">
            <button data-answer-type="incorrect" className="quiz-answer-btn">
              18
            </button>
          </li>
          <li className="quiz-answer">
            <button data-answer-type="incorrect" className="quiz-answer-btn">
              4
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
