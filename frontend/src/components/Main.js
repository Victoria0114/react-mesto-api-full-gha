import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  // const [userName, setUserName] = useState("");
  // const [userDescription, setUserDescription] = useState("");
  // const [userAvatar, setUserAvatar] = useState("");
  // const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile" id="userId">
        <button
          className="profile__avatar-button"
          type="button"
          id="profileAvatar"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              id="profile-edit-button"
              type="button"
              onClick={onEditProfile}
              aria-label="Добавить"
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          id="profile-add-button"
          type="button"
          onClick={onAddPlace}
          aria-label="Добавить"
        ></button>
      </section>

      <div className="cards">
        {cards.map((card) => (
          <Card
            src={card.link}
            name={card.name}
            key={card._id}
            card={card}
            likes={card.likes}
            owner={card.owner}
            cardId={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </div>
    </main>
  );
}
