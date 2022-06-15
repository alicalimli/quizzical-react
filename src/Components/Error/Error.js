import { Link } from "react-router-dom";
import "./Error.css";
import bugImg from "../../Assets/bug-fixing.svg";

const Error = ({ errorMsg }) => {
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
