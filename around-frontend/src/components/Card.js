import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwned = currentUser && (props.card.owner === currentUser._id);
  const cardDeleteButtonClassName = (
    `place__delete-btn ${!isOwned && 'place__delete-btn_hidden'}`
  );

  const isLiked = currentUser && props.card.likes.includes(currentUser._id);
  const cardLikeButtonClassName = `place__like-btn ${isLiked && 'place__like-btn_clicked'}`;

  return (
    <li key={props.card._id} className="place">
      <div
        className="place__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={() => {
          props.onCardClick(props.card);
        }}
      ></div>
      <button
        className={cardDeleteButtonClassName}
        aria-label="delete-card"
        onClick={() => {
          props.onCardDelete(props.card);
        }}
      ></button>
      <div className="place__footer">
        <h2 className="place__name">{props.card.name}</h2>
        <div className="place__like-container">
          <button
            className={`${cardLikeButtonClassName}${isLiked ? ' place__like-btn_clicked' : ''}`}
            aria-label="like-or-unlike-card"
            onClick={() => {
            
              props.onCardLike(props.card);
            }}
          ></button>
          <p className="place__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;

