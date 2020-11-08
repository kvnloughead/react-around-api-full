import React from "react";
import Card from "./Card";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div>
          <img
            src={currentUser && currentUser.avatar}
            alt="Avatar"
            className="profile__image"
            onClick={props.onEditAvatar}
          />
          <button
            className="button button_action_change-avatar"
            aria-label="open-change-avatar-modal"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h2 className="profile__name">{currentUser && currentUser.name}</h2>
            <p className="profile__job">{currentUser && currentUser.about}</p>
          </div>
          <button
            className="button button_action_edit"
            aria-label="open-edit-profile-modal"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="button button_action_add"
          aria-label="open-new-card-modal"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <div className="places">
        <ul className="places__grid">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </div>

      <PopupWithForm
        name="delete"
        title="Are you sure?"
        isOpen={false}
        onClose={props.onCloseButtons}
      >
        <button
          className="button button_action_submit"
          type="submit"
          value="Save"
          aria-label="confirm-delete-card"
        >
          Yes
        </button>
      </PopupWithForm>

      <PopupWithImage
        onClose={props.onCloseButtons}
        card={props.selectedCard}
      />
    </main>
  );
}

export default Main;
