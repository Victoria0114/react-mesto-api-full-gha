import successImage from "../images/successImage.svg";
import failImage from "../images/failImage.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_type_tooltip ${
        props.isModalWindowOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <div className="popup__container popup__container-open">
        <button
          className="popup__button-close"
          type="reset"
          onClick={props.onClose}
        />
        <img
          className="popup__img-open"
          src={props.isSuccess ? successImage : failImage}
          alt="#"
        />
        <h2 className="popup__title popup__title-open">{props.message}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
