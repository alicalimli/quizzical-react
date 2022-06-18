const useCreateQuestions = function (questionObj) {
  const newQuestionObj = questionObj.map((questionData, i) => {
    const answersArr = questionData.incorrect_answers
      .concat(questionData.correct_answer)
      .sort(() => 0.5 - Math.random());

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

export default useCreateQuestions;
