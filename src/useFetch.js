import { useEffect, useState } from "react";

const useFetch = (difficultyLevel, categoryNumber) => {
  const url = `https://opentdb.com/api.php?amount=5&category=${categoryNumber}&type=multiple&difficulty=${difficultyLevel}`;

  const [isPending, setIsPending] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    dataFetch(url)
      .then((data) => {
        const newQuestionsObj = createNewQuestionObj(data.results);

        setQuestions(newQuestionsObj);

        setIsPending(false);
      })
      .catch((error) => {
        console.log(error);
        setIsPending(false);
        setErrorMsg(error.message);
      });
  }, [url]);

  return { isPending, errorMsg, questions };
};

const dataFetch = async function (url) {
  const data = await fetch(url);

  const dataFetchResults = await data.json();

  console.log(dataFetchResults, url);

  if (!data.ok || !dataFetchResults.results.length) {
    throw new Error("Oops, Something wen't wrong");
  }

  return dataFetchResults;
};

const createNewQuestionObj = function (questionObj) {
  const newQuestionObj = questionObj.map((questionData, i) => {
    const answersArr = questionData.incorrect_answers
      .concat(questionData.correct_answer)
      .sort((a, b) => 0.5 - Math.random());

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

export default useFetch;
