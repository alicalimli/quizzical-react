import { useEffect } from "react";

import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";

import useLocalStorage from "../../Hooks/useLocalStorage";
import useGetLocalData from "../../Hooks/useGetLocalData";

import "./Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useLocalStorage("darkmode", false);

  const toggleDarkMode = () => {
    const body = document.body;
    const darkmodeBtn = body.querySelector(".darkmode-btn");

    if (darkMode) {
      darkmodeBtn.classList.add("active");
      body.classList.add("darkmode");
    } else {
      darkmodeBtn.classList.remove("active");
      body.classList.remove("darkmode");
    }
  };

  useEffect(() => {
    toggleDarkMode();
    setDarkMode(darkMode);
  }, [darkMode, setDarkMode]);

  return (
    <header>
      {" "}
      <button
        onClick={() => {
          setDarkMode(!darkMode);
        }}
        className="darkmode-btn"
      >
        <FaMoon className="moon-icon" />
        <BsFillSunFill className="sun-icon" />
      </button>
    </header>
  );
};

export default Header;
