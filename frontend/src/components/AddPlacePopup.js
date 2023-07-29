import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangePlace(e) {
    setName(e.target.value);
  }

  function handleChangeLinkForPlace(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-place"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__edit-form popup__edit-form_input_place-name"
        id="place-input"
        name="name"
        type="text"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        // defaultValue
        required
        value={name}
        onChange={handleChangePlace}
      />
      <span className="popup__span popup__span_error_visible place-input-error"></span>
      <input
        className="popup__edit-form popup__edit-form_input_link"
        id="link-input"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        // defaultValue
        required
        value={link}
        onChange={handleChangeLinkForPlace}
      />
      <span className="popup__span popup__span_error_visible link-input-error"></span>
    </PopupWithForm>
  );
}
