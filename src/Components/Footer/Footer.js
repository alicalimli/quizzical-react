import "./Footer.css";

const Footer = () => {
  return (
    <footer className="copyright">
      <p>
        {" "}
        Copyright © 2022{" "}
        <a
          className="copyright-user-link"
          href="https://twitter.com/alicalimli_dev"
        >
          @alicalimli_dev
        </a>
        . All Rights Reserved{" "}
      </p>
    </footer>
  );
};

export default Footer;
