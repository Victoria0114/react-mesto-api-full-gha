import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип" className="header__logo" />
      <div className="header__container">
        <span className="header__email">{props.email}</span>
        <Link
          to={props.buttonLink}
          onClick={props.onSignout}
          className="header__button"
          href="#"
        >
          {props.buttonText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
