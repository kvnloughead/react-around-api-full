import React from "react";

function PopupWithImage(props) {
  return (
    <>
      <div
        className={
          "popup__overlay" + (props.card ? " popup__overlay_visible" : "")
        }
      ></div>
      <figure
        className={
          "popup__image-container popup__container_type_image" +
          (props.card ? " popup__image-container_visible" : "")
        }
      >
        <button
          className="button button_action_close"
          type="reset"
          aria-label="close-image-popup"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.title : ""}
          className="popup__image"
        />
        <figcaption className="popup__image-caption">
          {props.card ? props.card.title : ""}
        </figcaption>
      </figure>
    </>
  );
}

export default PopupWithImage;
