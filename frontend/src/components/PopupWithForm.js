import React from "react";

//everyone form without img
function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isModalWindowOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <button
            className="popup__button-submit popup__button-submit_delete-card"
            type="submit"
          >
            {props.buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
