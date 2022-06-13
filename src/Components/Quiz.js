import { useState, useEffect } from "react";

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const answersBtnHandler = function (e) {
    const btnParent = e.target.closest(".quiz-container");
    const btn = e.target.closest(".quiz-answer-btn");
    const chosenAnswer = btn.textContent;
    const questionNum = btnParent.dataset.questionNumber;

    const answerObj = {
      [`${questionNum}`]: `${chosenAnswer}`,
    };

    setAnswers(Object.assign(answers, answerObj));

    console.log(answers);
  };

  return (
    <div className="quizzes-container">
      <div data-question-number="1" className="quiz-container">
        <h1 className="quiz-question">
          How many cores does the Intel i7-6950X have?
        </h1>
        <ul className="quiz-answers">
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="correct"
              className="active quiz-answer-btn"
            >
              10
            </button>
          </li>
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="incorrect"
              className="quiz-answer-btn"
            >
              12
            </button>
          </li>
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="incorrect"
              className="quiz-answer-btn"
            >
              18
            </button>
          </li>
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="incorrect"
              className="quiz-answer-btn"
            >
              4
            </button>
          </li>
        </ul>
      </div>
      <div data-question-number="2" className="quiz-container">
        <h1 className="quiz-question">
          How many cores does the Intel i7-6950X have?
        </h1>
        <ul className="quiz-answers">
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="correct"
              className="active quiz-answer-btn"
            >
              10
            </button>
          </li>
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="incorrect"
              className="quiz-answer-btn"
            >
              12
            </button>
          </li>
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="incorrect"
              className="quiz-answer-btn"
            >
              18
            </button>
          </li>
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="incorrect"
              className="quiz-answer-btn"
            >
              4
            </button>
          </li>
        </ul>
      </div>
      <button className="btn btn-check-answers">Check answers</button>
    </div>
  );
};

export default Quiz;
