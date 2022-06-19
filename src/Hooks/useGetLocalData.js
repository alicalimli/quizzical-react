const useGetLocalData = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

export default useGetLocalData;
