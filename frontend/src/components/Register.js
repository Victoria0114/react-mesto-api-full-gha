import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register(props) {
  const [regFormValue, setRegFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegFormValue({
      ...regFormValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister(regFormValue);
  };

  return (
    <>
      <Header buttonText="Войти" buttonLink="/sign-in" />
      <section className="auth-form">
        <h2 className="auth-form__title">{props.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form__inputs-all">
            <input
              className="auth-form__input"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={regFormValue.email || ""}
              onChange={handleChange}
              minLength="4"
              maxLength="30"
            />
            <input
              className="auth-form__input"
              name="password"
              type="password"
              placeholder="Пароль"
              required
              value={regFormValue.password || ""}
              onChange={handleChange}
              minLength="4"
              maxLength="30"
            />
          </div>

          <button className={`auth-form__button button`} type="submit">
            {props.buttonText}
          </button>
        </form>
        <span className="auth-form__text">
          Уже зарегистрированы?
          <Link to="/sign-in" className="auth-form__link">
            Войти
          </Link>
        </span>
      </section>
    </>
  );
}

export default Register;
