import Header from "./Header";
import AuthForm from "./AuthForm";

const Register = (props) => {
   return (
    <>
      <Header link={"/sign-in"} linkText={"Войти"} />
      <AuthForm
        header="Регистрация"
        buttonText="Зарегистрироваться"
        hidden={false}
        handleSubmit={props.onRegister}
        passwordInput={props.passwordInput}
        emailInput={props.emailInput}
        handleChangeInput={props.handleChangeInput}
      />
    </>
  );
};
export default Register;