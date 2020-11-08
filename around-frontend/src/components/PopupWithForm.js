import React from 'react';

function PopupWithForm(props) {
  return (
    <>
      <div
        className={
          'popup__overlay' +
          (props.isOpen && !props.name.startsWith('sign')
            ? ' popup__overlay_visible'
            : '')
        }
      ></div>
      <div
        className={
          `popup__container popup__container_type_${props.name}` +
          (props.isOpen ? ' popup__container_visible' : '') +
          (props.name.startsWith('sign') ? ' splash-page' : '')
        }
      >
        <button
          className={
            'button button_action_close' +
            (props.name.startsWith('sign') ? ' button_hidden' : '')
          }
          type='reset'
          aria-label={`close-${props.name}-modal`}
          onClick={props.onClose}
        ></button>
        <h2 className={props.name.startsWith('sign') ? 'splash-page__title' : 'popup__title'}>{props.title}</h2>
        <form
          id={`${props.name}-form`}
          name={`${props.name}Form`}
          className='popup__form'
          action='#'
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
        </form>
      </div>
    </>
  );
}

export default PopupWithForm;
