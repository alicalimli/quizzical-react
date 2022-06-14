import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { difficulty, category } = useParams();

  const fetchQuestionsData = async (categoryNumber, difficultyLevel) => {
    try {
      setIsPending(true);
      setErrorMsg(null);

      const questionsData = await fetch(
        `https://opentdb.com/api.php?amount=5&category=${categoryNumber}&type=multiple&difficulty=${difficultyLevel}`
      );

      const questionDataResults = await questionsData.json();

      if (!questionDataResults.results.length) {
        throw new Error("Oops, something wen't wrong");
      }

      const newQuestionsObj = createNewQuestionObj(
        await questionDataResults.results
      );

      setQuestions(newQuestionsObj);

      return setIsPending(false);
    } catch (error) {
      setIsPending(false);
      console.error(error);
      setErrorMsg(error.message);
    }
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

  useEffect(() => {
    fetchQuestionsData(category, difficulty);
  }, []);

  const createNewQuestionObj = function (questionObj) {
    const newQuestionObj = questionObj.map((questionData, i) => {
      const answersArr = questionData.incorrect_answers.concat(
        questionData.correct_answer
      );
      return {
        [`questionNumber-${i + 1}`]: {
          questionText: questionData.question,
          correctAnswer: questionData.correct_answer,
          answers: answersArr,
        },
      };
    });

    return newQuestionObj;
  };

  const checkAnswers = function () {
    const quizzesContainer = document.querySelector(".quizzes-container");
    const chosenAnswers = document.querySelectorAll(".quiz-answer-btn.active");

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
      {isPending && <h1>Loading</h1>}
      {errorMsg && <h1>{errorMsg}</h1>}
      {questions.length && (
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
