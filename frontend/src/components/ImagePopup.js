import React from "react";

function ImagePopup({ card, onClose, onCloseOverlay }) {
  const className = `popup popup_type_image image-popup ${
    card.name ? "popup_opened" : ""
  }`;
  return (
    <div className={className}
    onClick={onCloseOverlay}
    >
      
      <figure className="popup__open-image">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={card?.link || ""}
          alt={card && card.name}
        />
        <figcaption className="popup__place">
          {card && card.name}
        </figcaption>
      </figure>
    </div>
  );
}
export default ImagePopup;
