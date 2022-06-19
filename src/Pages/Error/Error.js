import { Link, useNavigate } from "react-router-dom";
import { errorImg, error404Img } from "../../Assets";
import { useEffect } from "react";

import "./Error.css";

const Error = ({ isReloading, error404 }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = setTimeout(() => {
      navigate("/");
      if (isReloading) {
        document.location.reload();
      }
    }, 5000);
    return () => {
      console.log("cleared");
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="error-container">
      {error404 ? (
        <img src={error404Img} alt="error 404" className="error-img" />
      ) : (
        <img src={errorImg} alt="error" className="error-img" />
      )}

      <h1>Oops, Something went wrong</h1>
      <p>
        <Link to="/">Click Here</Link> to go back or wait and you will be
        automatically redirected in the homepage in 5 seconds.
      </p>
    </div>
  );
};

export default Error;
