export const cardSelector = "#card-template";
export const placesGridSelector = ".places__grid";
export const editBtn = document.querySelector(".button_action_edit");
export const addBtn = document.querySelector(".button_action_add");
export const profileNameSelector = ".profile__name";
export const profileJobSelector = ".profile__job";
export const profileImageSelector = ".profile__image";
export const profileImageElement = document.querySelector(profileImageSelector);
export const editContainer = document.querySelector(
  ".popup__container_type_edit"
);
export const editForm = editContainer.querySelector(".popup__form");
export const addContainer = document.querySelector(
  ".popup__container_type_add"
);
export const addForm = addContainer.querySelector(".popup__form");
export const avatarContainer = document.querySelector(".popup__container_type_avatar");
export const avatarForm = avatarContainer.querySelector('.popup__form');
export const deleteContainer = document.querySelector('.popup__container_type_delete');
export const deleteForm = deleteContainer.querySelector('.popup__form');

export const imagePopupSelector = ".popup__image-container";
export const popupOverlay = document.querySelector(".popup__overlay");
export const imagePopupTemplate = document.querySelector(
  "#image-popup-template"
);
export const cloneOfTemplate = imagePopupTemplate.content.cloneNode(true);
export const imagePopupContainer = cloneOfTemplate.querySelector(
  ".popup__image-container"
);

export const modalArgs = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_action_submit",
  closeButtonSelector: ".button_action_close",
  popupOverlaySelector: ".popup__overlay",
  inactiveInputClass: "popup__input_type_inactive",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
  cardSelector: "#card-template",
};

