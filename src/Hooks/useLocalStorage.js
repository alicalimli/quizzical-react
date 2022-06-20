import { WEBSITE_NAME } from "../config";

const websiteData = JSON.parse(localStorage.getItem(WEBSITE_NAME)) || {};

const useLocalStorage = (dataObject) => {
  Object.assign(websiteData, dataObject);

  localStorage.setItem(WEBSITE_NAME, JSON.stringify(websiteData));
};

export default useLocalStorage;
