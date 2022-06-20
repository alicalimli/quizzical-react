import { useEffect, useState } from "react";

import { WEBSITE_NAME } from "../config";

const useGetLocalData = (key) => {
  const [data, setData] = useState();

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(WEBSITE_NAME)) || {};

    return setData(localData[key]);
  }, [key]);

  return { data, setData };
};

export default useGetLocalData;
