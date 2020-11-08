import React from "react";
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {

  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef
    });
  }

  return (
    
    <PopupWithForm
        name="avatar"
        title="Change profile picture"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          className="popup__input"
          type="url"
          id="avatar"
          name="avatar"
          placeholder="Enter link to image"
          minLength="2"
          required
          ref={avatarRef}
          autoComplete="on"
        />
        <span className="popup__input-error" id="avatar-input-error"></span>

        <button
          className="button button_action_submit button_inactive"
          type="submit"
          value="Save"
          aria-label="submit-change-avatar"
        >
          Save
        </button>
      </PopupWithForm>

  )
}

export default EditAvatarPopup;