import React from "react";
import successImg from '../images/success.svg';
import failImg from '../images/fail.svg';


function InfoTooltip({ onClose, status, text }) {
    const images = {
        success: successImg,
        fail: failImg
    };

    return (
        <div className={`popup ${status ? "popup_opened" : ''}`}>
            <div className="popup__container popup__container_type_tooltip">
                <img className="popup__image-registering" src={images[status]} alt="Иконка статуса"/>
                <h2 className="popup__title-registering">{text}</h2>
                <button className="popup__close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;
