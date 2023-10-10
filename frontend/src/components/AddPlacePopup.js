import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    }

    React.useEffect(() => {
        nameRef.current.value = '';
        linkRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm name="place-form" title="Новое место" buttonText="Создать" 
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="card-input" className="popup__field popup__field_el_card" type="text" placeholder="Название" 
             maxLength="30" minLength="2" ref={nameRef} required/>
            <span className="popup__field-error  card-input-error"></span>
            <input id="link-input" className="popup__field popup__field_el_link" type="url" 
             placeholder="Ссылка на картинку" ref={linkRef} required/>
            <span className="popup__field-error link-input-error"></span>
      </PopupWithForm>
    )
}

export default AddPlacePopup;