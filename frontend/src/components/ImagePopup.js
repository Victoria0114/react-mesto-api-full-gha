import React from "react";

function ImagePopup(props) {
  const className = `popup popup_type_image image-popup ${
    props.card.name ? "popup_opened" : ""
  }`;
  return (
    <div className={className}>
      <figure className="popup__open-image">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          src={props.card?.link || ""}
          alt={props.card && props.card.name}
        />
        <figcaption className="popup__place">
          {props.card && props.card.name}
        </figcaption>
      </figure>
    </div>
  );
}
export default ImagePopup;
