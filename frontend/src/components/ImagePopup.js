import React from "react";

function ImagePopup(props) {
    const name = props.card ? props.card.name : '';

    return (
        <div className={`popup popup_type_image ${props.card ? "popup_opened" : ''}`}>
            <div className="popup__container">
                <img className="popup__image" src={props.card ? props.card.link : ''} alt={name}/>
                <h2 className="popup__image-caption">{name}</h2>
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;