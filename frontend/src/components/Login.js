import { useState } from "react";
import Header from "./Header";

//вход после регистрации
const Login = (props) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onLogin(formValue);
  };

  //разметка авторизации (входа)
  return (
    <>
      <Header buttonText="Регистрация" buttonLink="/sign-up" />
      <section className="auth-form">
        <h2 className="auth-form__title">{props.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form__inputs-all">
            <label>
              <input
                className="auth-form__input"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={formValue.email || ""}
                onChange={handleChange}
                minLength="4"
                maxLength="30"
              />
            </label>
            <label>
              <input
                className="auth-form__input"
                name="password"
                type="password"
                placeholder="Пароль"
                required
                value={formValue.password || ""}
                onChange={handleChange}
                minLength="4"
                maxLength="30"
              />
            </label>
          </div>
          <button className={`auth-form__button button`} type="submit">
            {props.buttonText}
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
