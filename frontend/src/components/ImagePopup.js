import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_img ${
        props.card.link ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <figure className="popup__container-img">
        <button
          className="popup__button-close popup__button-close_big-img"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__img"
          src={props.card.link}
          alt={props.card.name}
        />
        <figcaption className="popup__title-img">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
