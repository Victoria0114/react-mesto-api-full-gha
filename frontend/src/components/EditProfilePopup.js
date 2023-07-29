import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      buttonText="Сохранить"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        className="popup__edit-form popup__edit-form_input_name"
        id="name-input"
        name="name"
        type="text"
        placeholders="Имя"
        minLength={2}
        maxLength={40}
        // defaultValue
        required
        onChange={handleChangeName}
      />
      <span className="popup__span popup__span_error_visible name-input-error"></span>
      <input
        value={description}
        className="popup__edit-form popup__edit-form_input_about "
        id="about-input"
        name="about"
        type="text"
        placeholders="О себе"
        minLength={2}
        maxLength={200}
        // defaultValue
        required
        onChange={handleChangeDescription}
      />
      <span className="popup__span popup__span_error_visible about-input-error"></span>
    </PopupWithForm>
  );
}
