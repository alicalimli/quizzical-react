import "./Questions.css";

const Questions = ({ questions, answersBtnHandler, questionsElementsRef }) => {
  return questions.map((data, index) => {
    const questionData = data[`questionNumber-${index + 1}`];
    console.log(questionsElementsRef.current);
    return (
      <div
        data-question-number={index + 1}
        ref={questionsElementsRef}
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
                className={`quiz-answer-btn btn-hv btn-outline`}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  });
};

export default Questions;
