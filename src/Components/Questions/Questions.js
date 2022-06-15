const Questions = ({ questions, answersBtnHandler }) => {
  return questions.map((data, index) => {
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
  });
};

export default Questions;
