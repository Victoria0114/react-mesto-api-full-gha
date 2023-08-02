//chenched avatar

import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef(null);

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isModalWindowOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleChangeAvatar() {
    return avatarRef.current.value;
  }

  return (
    <PopupWithForm
      name="popupEditAvatar"
      title="Обновить аватар"
      buttonText={props.onLoading ? `Сохранение` : `Сохранить`}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isModalWindowOpen={props.isModalWindowOpen}
      onCloseOverlay={props.onCloseOverlay}
    >
      <input
        type="url"
        name="avatar"
        className="popup__input popup__input_update-avatar"
        id="avatarLink"
        onChange={handleChangeAvatar}
        ref={avatarRef}
        placeholder="Введите ссылку URL"
        required
      />
      <span className="avatarLink-error popup__input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
