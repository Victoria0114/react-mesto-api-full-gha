import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import profileEditAvatar from "../images/popup.svg";
import Card from "./Card";
import Header from "./Header";

// обработчики
function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        buttonText="Выйти"
        buttonLink="/sign-in"
        onSignout={props.onSignout}
        email={props.email}
      />
      <main>
        <section className="profile">
          <div className="profile__item">
            <div className="profile__wrapper-avatar">
              <img
                src={currentUser.avatar}
                alt="изображение владельца профиля"
                className="profile__img"
              />
              <button
                className="profile__edit-avatar-button"
                onClick={() => {
                  props.onEditAvatar(true);
                }}
              />
            </div>
            <div className="profile__form">
              <div className="profile__text">
                <h1 className="profile__title">{currentUser.name}</h1>
                <p className="profile__info">{currentUser.about}</p>
              </div>
              <button
                type="button"
                className="profile__button"
                onClick={() => {
                  props.onEditProfile(true);
                }}
              >
                <img
                  src={profileEditAvatar}
                  className="profile__button-img"
                  alt="кнопка для открытия формы редактирования"
                />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="profile__button-plus"
            onClick={() => {
              props.onAddPlace(true);
            }}
          />
        </section>

        <section className="gallery">
          {props.cards.map((card) => (
            <Card
            key={card._id}
              card={card}
              onCardDelete={props.onDeletedCard}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onPopupDeleteCard={props.onPopupDeleteCard}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
