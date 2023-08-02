import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleteCard(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="popupDeleteCard"
      title="Вы уверены?"
      buttonText={props.onLoading ? `Удаление` : `Да`}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isModalWindowOpen={props.isModalWindowOpen}
      onCloseOverlay={props.onCloseOverlay}
    />
  );
}

export default PopupDeleteCard;
