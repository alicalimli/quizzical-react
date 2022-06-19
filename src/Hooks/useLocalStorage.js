const useLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export default useLocalStorage;
