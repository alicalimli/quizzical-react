import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";

import "./Error.css";
import { bugImg, error404Img } from "../../Assets";

const Error = ({ isReloading, error404 }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = setTimeout(() => {
      navigate("/");
      if (isReloading) document.location.reload();
    }, 5000);
    return () => {
      console.log("cleared");
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="error-container">
      {error404 ? (
        <img src={error404Img} alt="error image" className="error-img" />
      ) : (
        <img src={bugImg} alt="bug image" className="error-img" />
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
