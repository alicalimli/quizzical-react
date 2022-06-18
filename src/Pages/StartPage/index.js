import { useState, useEffect } from "react";
import StartForm from "../../Components/StartForm";
import LoadingSpinner from "../../Components/LoadingSpinner";
import ErrorPage from "../Error";

import "./Start.css";

const localCache = {};

const Start = () => {
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetcCategoryData();
  }, []);

  const fetcCategoryData = async () => {
    try {
      if (localCache.categories) {
        setCategories(localCache.categories);
      } else {
        setIsPending(true);
        setErrorMsg("");

        const categories = await fetch("https://opentdb.com/api_category.php");
        const categoriesResults = await categories.json();

        localCache.categories = categoriesResults.trivia_categories || [];

        setCategories(localCache.categories);
        setIsPending(false);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setIsPending(false);

      console.error(error);
    }
  };

  return (
    <div className="start-page">
      {isPending && <LoadingSpinner />}
      {errorMsg && <ErrorPage isReloading="true" />}
      {categories.length ? (
        <StartForm
          categories={categories}
          categoriesData={localCache.categories}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Start;
