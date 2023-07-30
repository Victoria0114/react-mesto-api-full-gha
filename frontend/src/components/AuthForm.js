import { Link } from "react-router-dom";

const AuthForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit()
    }
  
  return (
    <form className="sign" onSubmit={handleSubmit}>
      <fieldset className="sign__fieldset">
        <h2 className="sign__header">{props.header}</h2>
        <label className="ol sign__label" htmlFor="email"></label>
        <input
          id="email"
          name="email"
          className="sign__input"
          placeholder="Email"
          type="email"
          required
          value={props.emailInput}
          onChange={props.handleChangeInput}
          autoComplete="off"
        ></input>
        <span id="email-error" className="ol sign__input-error">{props.error}</span>
        <label className="ol sign__label" htmlFor="password"></label>
        <input
          id="password"
          name="password"
          className="sign__input"
          placeholder="Пароль"
          type="password"
          required
          value={props.passwordInput}
          onChange={props.handleChangeInput}
          autoComplete="off"
        ></input>
        <span className="ol sign__input-error" id="password-error">{props.error}</span>
        <button className="sign__submit-button" type="submit">
          {props.buttonText}
        </button>
        <div
          className={`sign__question-container  ${
            props.hidden && "sign__question-container_hidden"
          }`}
        >
          <span className="sign__question">Уже зарегистрированы?</span>
          <Link className="sign__redirect" to="/sign-in">
            Войти
          </Link>
        </div>
      </fieldset>
    </form>
  );
};

export default AuthForm;
