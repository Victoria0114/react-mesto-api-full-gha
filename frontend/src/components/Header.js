import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.svg";
import "../blocks/header/header.css";

export default function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      <div className="header__container">
        <p className="header__email">{props.userEmail}</p>
        <Link className="header__link" to={props.link} onClick={props.onSignOut} >
          {props.linkText}
        </Link>
      </div>
    </header>
  );
}