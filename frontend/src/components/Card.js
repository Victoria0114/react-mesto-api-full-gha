import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // const cardLikeButtonClassName = (
  //   `card__like ${isLiked && 'card__like_active'}`
  // );

  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <article className="card">
      {isOwn && (
        <button className="card__trashbin" onClick={handleDeleteClick} />
      )}
      <img
        className="card__image"
        src={card.link || ""}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__info">
        <h2 className="card__mesto">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={`card__like ${isLiked && "card__like_active"}`}
            type="button"
            onClick={handleLikeClick}
            aria-label="Нравится"
          ></button>
          <span className="card__like-counter">
            {card.likes.length > 0 ? card.likes.length : null}
          </span>
        </div>
      </div>
    </article>
  );
}

// return (
//   <article className="card">
//     {isOwn && <button className='card__trashbin' onClick={handleDeleteClick} />}
//           <img className="card__image" src={card?.link || ""} alt={card && card.name} onClick={handleCardClick}/>
//           <div className="card__info">
//               <h2 className="card__mesto">{card && card.name}</h2>
//               <div className="card__like-container">
//                   <button className={`card__like ${isLiked && 'card__like_active'}`} type="button" onClick={handleLikeClick} aria-label="Нравится"></button>
//                   <span className="card__like-counter">
//                     {card.likes.length > 0 ? card.likes.length : null}
//                   </span>
//               </div>
//           </div>
//   </article>
// );
// export default function Card(props) {
//   const currentUser = useContext(CurrentUserContext);
//   // Определяем, являемся ли мы владельцем текущей карточки
//   const isOwn = props.owner._id === currentUser._id;
//   const isLiked = props.likes.some(i => i._id === currentUser._id)

//   function handleCardClick() {
//     props.onCardClick({name: props.name, link: props.src});
//   }
//   function handleLikeClick() {
//     props.onCardLike(props);
//   }
//   function handleDeleteClick() {
//     props.onCardDelete(props);
//   }
//   return (
//     <article className="card">
//       {isOwn && <button className='card__trashbin' onClick={handleDeleteClick} />}
//             <img className="card__image" src={props.src} alt={props.name} onClick={handleCardClick}/>
//             <div className="card__info">
//                 <h2 className="card__mesto">{props.name}</h2>
//                 <div className="card__like-container">
//                     <button className={`card__like ${isLiked && 'card__like_active'}`} type="button" onClick={handleLikeClick} aria-label="Нравится"></button>
//                     <span className="card__like-counter">
//                       {props.likes.length > 0 ? props.likes.length : null}
//                     </span>
//                 </div>
//             </div>
//     </article>
//   );
// }
