import React, { createRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = createRef();

  useEffect(() => {
    avatar.current.value = "";
  }, [avatar, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      buttonText="Сохранить"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__edit-form popup__edit-form_input_avatar"
        id="avatar-input"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        required
        ref={avatar}
      />
      <span className="popup__span popup__span_error_visible avatar-input-error"></span>
    </PopupWithForm>
  );
}
