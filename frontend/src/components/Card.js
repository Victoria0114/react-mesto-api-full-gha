import { useContext } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"

function Card(props) {
  const currentUser = useContext(CurrentUserContext)
  // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = props.card.likes.some((user) => user === currentUser._id)

  const likeButtonClassName = `gallery__like ${
    (isLiked && "gallery__like_active") || ""
  }`

  const isOwner =
    (props.card.owner?._id || props.card.owner) === currentUser._id

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
    props.onPopupDeleteCard(true)
  }

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  return (
    <article className="gallery__item">
      <div className="gallery__img-block">
        <img
          className="gallery__img"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleCardClick}
        />
        {isOwner && (
          <button
            className="gallery__del"
            type="button"
            onClick={handleDeleteClick}
          />
        )}
      </div>
      <div className="gallery__text-block">
        <h2 className="gallery__title">{props.card.name}</h2>
        <div className="gallery__wrapper-like">
          <button
            className={likeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="gallery__count-like">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card
