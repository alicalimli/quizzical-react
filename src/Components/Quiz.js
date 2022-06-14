import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Questions from "./Questions";

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);

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
    setQuizScore(score);
    console.log(quizScore, score);
  };

  return (
    <div className="quiz-page">
      {errorMsg && <h1>{errorMsg}</h1>}
      {isPending && <h1>loading...</h1>}
      {questions.length ? (
        <div className="quizzes-container">
          <Link className="back-btn" to="/">
            Back
          </Link>
          {questions.length && (
            <Questions
              questions={questions}
              answersBtnHandler={answersBtnHandler}
            />
          )}

          <button className="btn btn-check-answers" onClick={checkAnswers}>
            Check answers
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
