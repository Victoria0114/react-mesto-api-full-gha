import imageSuccessPath from "../images/success.svg";
import imageErrorPath from "../images/error.svg";

const InfoTooltip = (props) => {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
      id={props.name}
      onClick={props.onClick}
    >
      <div className={`popup__container ${props.containerType}`}>
        <img className="popup__img" alt={props.alt} src={ props.isOk ? imageSuccessPath : imageErrorPath } />
        <span className="popup__caption">{ props.isOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</span>
        <button
          className={`popup__close popup__close_type_${props.name}`}
          id={`${props.name}-closer`}
          type="button"
          aria-label="Закрыть форму"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
};
export default InfoTooltip;