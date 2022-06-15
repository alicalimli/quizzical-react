import { Link, useNavigate } from "react-router-dom";
import bugImg from "../../Assets/bug-fixing.svg";
import error404Img from "../../Assets/404-error.svg";
import { useEffect } from "react";

import "./Error.css";

const Error = ({ errorMsg, isReloading, error404 }) => {
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
      {error404 ? (
        <img src={error404Img} alt="" className="error-img" />
      ) : (
        <img src={bugImg} alt="" className="error-img" />
      )}

      <h1>Oops, Something went wrong</h1>
      <p>
        <Link to="/">Click Here</Link>to go back or wait and you will be
        automatically redirected in the homepage in 5 seconds.
      </p>
    </div>
  );
};

export default Error;
