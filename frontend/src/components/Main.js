import React from "react";
import editButton from '../images/edit-button.svg';
import plusButton from '../images/plus-button.svg';
import pencilButton from '../images/Vector.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main>
        <section className="profile">
          <div className="profile__common">
            <div className="profile__avatar-group">
              <img className="profile__avatar" src={currentUser.avatar} alt="аватар владельца профиля"/>
              <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}>
                <img className="profile__pencil" src={pencilButton} alt="карандаш редактирования"/>
              </button>
            </div>
            <div className="profile__info">
              <div className="profile__name-and-button">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                  <img className="profile__edit-button-pen" src={editButton}
                  alt="кнопка редактирования профиля"/>
                </button>
              </div>
              <p className="profile__description">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
            <img className="profile__plus-button" src={plusButton} alt="кнопка добавления контента"/>
          </button>
        </section>
        <ul className="elements">{props.cards.map(card => <Card card={card} key={card._id} 
        onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)}
        </ul>
      </main>
  )
}

export default Main;