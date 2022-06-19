const useLocalStorage = (name, data) => {
  const quizzicalData = {};

  quizzicalData[name] = data;

  localStorage.setItem("quizzicalData", JSON.stringify(quizzicalData));
};

export default useLocalStorage;
