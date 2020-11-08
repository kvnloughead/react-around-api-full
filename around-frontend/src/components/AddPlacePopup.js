import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddNewCard({ title, link })
  }

  return (

    <PopupWithForm
      name="add"
      title="New place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        required
        onChange={handleTitleChange}
        autoComplete="on"
      />
      <span className="popup__input-error" id="title-input-error"></span>
      <input
        className="popup__input"
        type="url"
        id="link"
        name="link"
        placeholder="Image link"
        required
        onChange={handleLinkChange}
        autoComplete="on"
      />
      <span className="popup__input-error" id="imageUrl-input-error"></span>
      <button
        className="button button_action_submit button_inactive"
        type="submit"
        value="Create"
        aria-label="submit-new-card-modal"
      >
        Create
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
