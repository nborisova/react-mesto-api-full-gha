import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardClick, onCardLike, onCardDelete, card, card: {_id}, card: {link}, card: {name}, card: {likes} }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__button ${isLiked ? 'element__button_active' : ''}` 
      );; 

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleClick() {
        onCardClick(card);
    } 

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <li className="elements__list-item">
            <article className="element" key={_id}>
            <img className="element__image" src={link} onClick={handleClick}/>
            <div className="element__group">
                <h2 className="element__title">{name}</h2>
                <div className="element__like-button">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <div className="element__count">{likes.length}</div>
                </div>
            </div>
            {isOwn && <button className='element__trash-button' onClick={handleDeleteClick} type="button"/>} 
            </article>
        </li>
    )
}

export default Card;