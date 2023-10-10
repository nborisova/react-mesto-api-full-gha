import React from "react";

function PopupWithForm({ name, isOpen, title, buttonText, children, onClose, onSubmit }) {
  return(
      <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
          <div className="popup__container">
            <form className="popup__container-form" name={name} onSubmit={onSubmit} noValidate>
              <h2 className="popup__title">{title}</h2>
              {children}
              <button className="popup__submit-button" type="submit">{buttonText}</button>
            </form>
            <button className="popup__close-button" type="button" onClick={onClose}></button>
          </div>
      </div>
  )
}

export default PopupWithForm;