import { useState, useEffect } from "react";
import StartForm from "./StartForm";

const Start = () => {
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetcCategoryData();
  }, []);

  const fetcCategoryData = async () => {
    try {
      setIsPending(true);
      setErrorMsg("");
      const categories = await fetch("https://opentdb.com/api_category.php");
      const categoriesResults = await categories.json();
      setCategories(categoriesResults.trivia_categories);
      setIsPending(false);
      return;
    } catch (error) {
      setErrorMsg(error.message);
      setIsPending(false);
      console.error(error);
    }
  };

  return (
    <div className="start-page">
      {isPending && <h1>loading..</h1>}
      {errorMsg && <h1>{errorMsg}</h1>}
      {categories.length && <StartForm categories={categories} />}
    </div>
  );
};

export default Start;
