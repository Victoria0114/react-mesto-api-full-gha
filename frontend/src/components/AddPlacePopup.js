//popup added new cards
import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [placeName, setPlaceName] = useState('');
    const [placeLink, setPlaceLink] = useState('');

    useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [props.isModalWindowOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: placeName,
            link: placeLink,
        });
    }

    function handleChangePlaceName(e) {
        setPlaceName(e.target.value);
    }

    function handleChangePlaceLink(e) {
        setPlaceLink(e.target.value);
    }

    return (
        <PopupWithForm
          name='popupAddCard'
          title='Новое место'
          buttonText={props.onLoading ? `Сохранение` : `Создать`}
          onSubmit={handleSubmit}
          onClose={props.onClose}
          isModalWindowOpen={props.isModalWindowOpen}
          onCloseOverlay={props.onCloseOverlay} 
        >

          <input 
          type="text" 
          name="name" 
          placeholder="Название" 
          required 
          className="popup__input popup__input_img-name" 
          id="title" 
          minLength={2} 
          maxLength={30}
          value={placeName}
          onChange={handleChangePlaceName} />
          <span className="title-error popup__input-error" />

          <input 
          name="link" 
          type="url" 
          placeholder="Ссылка на картинку" 
          required className="popup__input popup__input_img-link" 
          id="link"
          value={placeLink}
          onChange={handleChangePlaceLink} />
          <span className="link-error popup__input-error" />


        </PopupWithForm>
    )
}

export default AddPlacePopup;