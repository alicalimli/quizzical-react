const useFetch = async function (url) {
  const data = await fetch(url);

  const dataFetchResults = await data.json();

  console.log(dataFetchResults, url);

  if (!data.ok || !dataFetchResults.results.length) {
    throw new Error("Oops, Something wen't wrong");
  }

  return dataFetchResults;
};

export default useFetch;
