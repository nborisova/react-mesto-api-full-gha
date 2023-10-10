import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar(avatarRef.current.value);
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
}, [isOpen]);

    return (
        <PopupWithForm name="change-avatar" title="Обновить аватар" buttonText="Сохранить" 
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="avatar-input" className="popup__field popup__field_el_link" type="url" 
              placeholder="Ссылка на новый аватар" ref={avatarRef} required/>
            <span className="popup__field-error avatar-input-error"></span>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;