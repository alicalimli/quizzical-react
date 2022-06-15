import { Link, useNavigate } from "react-router-dom";
import bugImg from "../../Assets/bug-fixing.svg";
import { useEffect } from "react";

import "./Error.css";

const Error = ({ errorMsg, isReloading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
      if (isReloading) {
        document.location.reload();
      }
    }, 5000);
  });

  return (
    <div className="error-container">
      <img src={bugImg} alt="" className="error-img" />
      <h1>{errorMsg}</h1>
      <p>
        <Link to="/">Click Here</Link> or wait and you will be automatically
        redirected in the homepage in 5 seconds.
      </p>
    </div>
  );
};

export default Error;
