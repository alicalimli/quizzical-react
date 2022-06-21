import { useState } from "react";

const useMakeQuestions = function (questionsObj) {
  const [questions, setQuestions] = useState([]);

  const setNewQuestions = (questionsObj) => {
    const newQuestionsObj = questionsObj.map((questionData, i) => {
      // Combines incorrect and correct answers and shuffles it.
      const answersArr = questionData.incorrect_answers
        .concat(questionData.correct_answer)
        .sort((a, b) => 0.5 - Math.random());

      // Returns a new modified object.
      return {
        [`questionNumber-${i + 1}`]: {
          correctAnswer: questionData.correct_answer,
          questionText: questionData.question,
          answers: answersArr,
        },
      };
    });

    setQuestions(newQuestionsObj);
  };

  return [questions, setNewQuestions];
};

export default useMakeQuestions;
