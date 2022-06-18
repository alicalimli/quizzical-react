/**
 * It's better to separate the functions that are vanilla JS (without any hooks or any react related stuff)
 * into Utils folder
 * */
const CreateQuestions = function (questionObj) {
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

export default CreateQuestions;
