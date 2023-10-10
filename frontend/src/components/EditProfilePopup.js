import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]); 

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({ name, description });
    }  

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }


    return (
        <PopupWithForm name="profile-form" title="Редактировать профиль" buttonText="Сохранить" 
        isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
              <input id="name-input" className="popup__field popup__field_el_name" type="text" 
                placeholder="Имя" maxLength="40" minLength="2" 
                value={name ?? ''} onChange={handleChangeName} required/>
              <span className="popup__field-error name-input-error"></span>
              <input id="job-input" className="popup__field popup__field_el_job" type="text" 
                placeholder="О себе" maxLength="200" minLength="2" 
                value={description ?? ''} onChange={handleChangeDescription} required/>
              <span className="popup__field-error job-input-error"></span>
        </PopupWithForm>  
    )
}

export default EditProfilePopup;