import { useState, useEffect } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

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
      {questions &&
        questions.map((data) => (
          <div
            data-question-number="1"
            key={data.question}
            className="quiz-container"
          >
            <h1 className="quiz-question">{data.question}</h1>
            <ul className="quiz-answers">
              {data.incorrect_answers.map((answer) => (
                <li className="quiz-answer" key={answer}>
                  <button
                    onClick={answersBtnHandler}
                    data-answer-content={answer}
                    className="quiz-answer-btn"
                  >
                    {answer}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      <button className="btn btn-check-answers">Check answers</button>
    </div>
  );
};

export default Quiz;
