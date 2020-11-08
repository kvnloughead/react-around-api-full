import React from "react";
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');


  React.useEffect(() => {
    setName(currentUser && currentUser.name);
    setDescription(currentUser && currentUser.about);
  }, [currentUser]);


  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  
  return (

    <PopupWithForm
        name="edit"
        title="Edit profile"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          className="popup__input"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required
          value={name || ''}
          onChange={handleNameChange}
          autoComplete="on"
        />
        <span className="popup__input-error" id="name-input-error"></span>
        <input
          className="popup__input"
          type="text"
          id="job"
          name="job"
          placeholder="About me"
          minLength="2"
          maxLength="200"
          required
          value={description || ''}
          onChange={handleDescriptionChange}
          autoComplete="on"
        />
        <span className="popup__input-error" id="job-input-error"></span>
        <button
          className="button button_action_submit button_inactive"
          type="submit"
          value="Save"
          aria-label="submit-edit-profile"
        >
          Save
        </button>
      </PopupWithForm>
  );
}

export default EditProfilePopup;
