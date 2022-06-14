import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../useFetch";

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const { difficulty, category } = useParams();

  const { isPending, errorMsg, questions } = useFetch(difficulty, category);

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

  const checkAnswers = function () {
    const quizzesContainer = document.querySelector(".quizzes-container");
    const chosenAnswers = document.querySelectorAll(".quiz-answer-btn.active");

    console.log(Object.keys(chosenAnswers).length, questions.length);
    if (Object.keys(chosenAnswers).length < questions.length) return;

    let score = 0;

    quizzesContainer.classList.add("checked");

    questions.map((questionsData, i) => {
      const questionData = questionsData[`questionNumber-${i + 1}`];

      if (answers[i + 1] === questionData.correctAnswer) {
        score++;
        chosenAnswers[i].classList.add("correct");
      } else {
        chosenAnswers[i].classList.add("incorrect");
      }

      // Highlight all the correct answers
      const correctAnswerBtn = document.querySelector(
        `[data-answer-content="${questionData.correctAnswer}"]`
      );
      correctAnswerBtn.classList.add("correct");
    });
    console.log(score);
  };

  return (
    <div className="quiz-page">
      {console.log(isPending, questions)}
      {isPending && console.log("iunmdefsedf")}
      {errorMsg && <h1>{errorMsg}</h1>}
      {questions && (
        <div className="quizzes-container">
          <Link className="back-btn" to="/">
            Back
          </Link>
          {questions.length &&
            questions.map((data, index) => {
              const questionData = data[`questionNumber-${index + 1}`];
              return (
                <div
                  data-question-number={index + 1}
                  key={questionData.questionText}
                  className="quiz-container"
                >
                  <h1 className="quiz-question">{questionData.questionText}</h1>
                  <ul className="quiz-answers">
                    {questionData.answers.map((answer) => (
                      <li className="quiz-answer" key={answer}>
                        <button
                          onClick={answersBtnHandler}
                          data-answer-content={answer}
                          className={`quiz-answer-btn`}
                        >
                          {answer}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

          <button className="btn btn-check-answers" onClick={checkAnswers}>
            Check answers
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
