import { useEffect, useState } from "react";

const useGetLocalData = (key) => {
  const [data, setData] = useState();

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(key)) || {};

    return setData(localData[key]);
  }, [key]);

  return { data, setData };
};

export default useGetLocalData;
