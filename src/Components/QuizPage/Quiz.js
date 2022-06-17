import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Questions from "../Questions/Questions";
import createQuestions from "../../Hooks/createQuestions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Error from "../Error/Error";
import Modal from "../Modal/Modal";

import "./Quiz.css";

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnTextContent, setBtnTextContent] = useState("Check Answers!");

  let { difficulty, categoryName, category } = useParams();
  const url = `https://opentdb.com/api.php?amount=5&category=${category}&type=multiple&difficulty=${difficulty}`;

  useEffect(() => {
    setIsPending(true);
    dataFetch(url);
  }, [url]);

  const dataFetch = function (url) {
    const data = fetch(url)
      .then((data) => data.json())
      .then((data) => {
        const newQuestionsObj = createQuestions(data.results);

        if (!data.results.length) throw new Error();

        setQuestions(newQuestionsObj);

        setIsPending(false);
      })
      .catch((error) => {
        console.log(error);
        setIsPending(false);
        setErrorMsg(error.message);
      });
  };

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

  const playAgainHandler = () => {
    if (!document.querySelector(".quizzes-container")) return;

    const quizAnswerBtns = document.querySelectorAll(".quiz-answer-btn");
    const quizzesContainer = document.querySelector(".quizzes-container");

    quizzesContainer.classList.remove("checked");

    quizAnswerBtns.forEach((btn) => {
      btn.classList.remove("incorrect", "correct", "active");
    });

    setIsModalOpen(false);
    setQuizScore(null);
    setAnswers({});
    setQuestions([]);
    setIsPending(true);
    dataFetch(url);
  };

  const checkAnswers = function () {
    console.log(questions);
    const checkAnswerBtn = document.querySelector(".btn-check-answers");
    if (!quizScore) {
      const quizzesContainer = document.querySelector(".quizzes-container");
      const chosenAnswers = document.querySelectorAll(
        ".quiz-answer-btn.active"
      );

      console.log(chosenAnswers);

      if (Object.keys(chosenAnswers).length < questions.length) {
        setBtnTextContent("Please answer every questions!");
        checkAnswerBtn.classList.add("warning!");
        setTimeout(() => setBtnTextContent("Check Answers"), 1500);
        return;
      }

      let score = 0;

      quizzesContainer.classList.add("checked");

      questions.map((questionsData, i) => {
        const questionData = questionsData[`questionNumber-${i + 1}`];
        const questionElement = document.querySelector(
          `[data-question-number="${i + 1}"]`
        );

        if (answers[i + 1] === questionData.correctAnswer) {
          score++;
          chosenAnswers[i].classList.add("correct");
        } else {
          chosenAnswers[i].classList.add("incorrect");
        }

        // Highlight all the correct answers
        const correctAnswerBtn = questionElement.querySelector(
          `[data-answer-content="${questionData.correctAnswer}"]`
        );

        correctAnswerBtn.classList.add("correct");
        console.log(correctAnswerBtn);

        setBtnTextContent("Play Again!");
      });

      setQuizScore(score);
      setIsModalOpen(true);
    } else {
      category = "asdsd";
      playAgainHandler();
      setBtnTextContent("Check Answers");
    }
  };

  return (
    <div className="quiz-page">
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <div className="play-again-modal">
            <button
              className="modal-back back-btn btn-hv btn-outline"
              onClick={() => setIsModalOpen(false)}
            >
              Back
            </button>
            <h2>
              {quizScore > 2 ? "Congratulations! 👏‍" : "Try again next time!"}
            </h2>
            <p>{`You Scored ${quizScore} / ${questions.length} correct answers.`}</p>
            <p>Category: {categoryName}</p>
            <p>Difficulty: {difficulty}</p>
            <div className="modal-btns">
              <button className="btn btn-hv" onClick={playAgainHandler}>
                Play Again!
              </button>
              <a
                className="btn btn-hv twitter-share-button"
                href="https://twitter.com/intent/tweet?text=I scored 5 / 5 correct answers on Quizzical, Come and try it out:
                https://quizzical.netlify.app/"
                data-size="large"
              >
                Tweet
              </a>
            </div>
          </div>
        </Modal>
      )}
      {errorMsg && <Error />}
      {isPending && <LoadingSpinner />}
      {questions.length ? (
        <div className="quizzes-container">
          <Link className="back-btn btn-hv btn-outline" to="/">
            Back
          </Link>
          {questions.length && (
            <Questions
              questions={questions}
              answersBtnHandler={answersBtnHandler}
            />
          )}
          {quizScore !== null ? (
            <h2 className="score-text">{`You scored ${quizScore} / ${questions.length} correct answers.`}</h2>
          ) : (
            ""
          )}
          <button
            className="btn btn-hv btn-check-answers"
            onClick={checkAnswers}
          >
            {btnTextContent}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
