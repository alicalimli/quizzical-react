const useMakeQuestions = function (questionObj) {
  const newQuestionObj = questionObj.map((questionData, i) => {
    // Combines incorrect and correct answers and shuffles it.
    const answersArr = questionData.incorrect_answers
      .concat(questionData.correct_answer)
      .sort((a, b) => 0.5 - Math.random());

    return {
      [`questionNumber-${i + 1}`]: {
        correctAnswer: questionData.correct_answer,
        questionText: questionData.question,
        answers: answersArr,
      },
    };
  });

  return newQuestionObj;
};

export default useMakeQuestions;
