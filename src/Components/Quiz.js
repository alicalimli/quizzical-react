import { useState, useEffect } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const answersBtnHandler = function (e) {
    const btnParent = e.target.closest(".quiz-container");
    const answerBtn = e.target.closest(".quiz-answer-btn");
    const answerBtns = btnParent.querySelectorAll(".quiz-answer-btn");
    const chosenAnswer = answerBtn.dataset.answerContent;
    const questionNum = btnParent.dataset.questionNumber;

    if (!btnParent) return;

    const answerObj = {
      [`${questionNum}`]: `${chosenAnswer}`,
    };

    answerBtns.forEach((btn) => btn.classList.remove("active"));

    answerBtn.classList.add("active");

    setAnswers(Object.assign(answers, answerObj));

    console.log(answers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const questionsData = await fetch(
        "https://opentdb.com/api.php?amount=5&category=18&type=multiple"
      );

      if (!questionsData.ok) return;

      const questionDataResults = await questionsData.json();

      setQuestions(questionDataResults.results);
      console.log(questions);
    } catch (error) {
      console.error(error);
    }
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
              data-answer-content="10"
              className="active quiz-answer-btn"
            >
              10
            </button>
          </li>
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="incorrect"
              data-answer-content="12"
              className="quiz-answer-btn"
            >
              12
            </button>
          </li>
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="incorrect"
              data-answer-content="18"
              className="quiz-answer-btn"
            >
              18
            </button>
          </li>
          <li className="quiz-answer">
            <button
              onClick={answersBtnHandler}
              data-answer-type="incorrect"
              data-answer-content="4"
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
