import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { difficulty, category } = useParams();

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
    console.log(difficulty, category);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsPending(true);
      setErrorMsg(null);

      const questionsData = await fetch(
        `https://opentdb.com/api.php?amount=5&category=${category}&type=multiple&difficulty=${difficulty}`
      );

      if (!questionsData.ok) throw new Error("Oops, something wen't wrong");

      const questionDataResults = await questionsData.json();

      console.log(questionDataResults);
      if (!questionDataResults.results.length)
        throw new Error("Oops, something wen't wrong");

      setQuestions(questionDataResults.results);

      return setIsPending(false);
    } catch (error) {
      setIsPending(false);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="quiz-page">
      {isPending && <h1>Loading</h1>}
      {errorMsg && <h1>{errorMsg}</h1>}
      {!questions.length ? (
        ""
      ) : (
        <div className="quizzes-container">
          <Link className="back-btn" to="/">
            Back
          </Link>
          {questions.map((data, index) => (
            <div
              data-question-number={index + 1}
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
      )}
    </div>
  );
};

export default Quiz;
