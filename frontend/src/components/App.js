import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { Api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from './Auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const navigate = useNavigate();

  const api = new Api({
    baseUrl: 'https://api.mesto-nb.nomoredomain.nomoredomainsrocks.ru',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });

  React.useEffect(() => {

    api.getUserInfo()
    .then(userData => setCurrentUser(userData))
    .catch(err => console.error(err));

    api.getInitialCards()
    .then(cards => setCards(cards))
    .catch(err => console.error(err));

    function tokenCheck() {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        if (token) {
          auth.getUserEmail(token)
          .then(res => {
            if (res) {
              setLoggedIn(true);
              navigate("/", {replace: true});
              handleLogin(res);
            }
          })
          .catch(err => console.error(err));
        }
      }
    }

    tokenCheck();
  }, []);

  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard({ name, link })
    .then(newCard => setCards([newCard, ...cards]))
    .then(closeAllPopups)
    .catch(err => console.error(err));
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
    .then(res => setCurrentUser(res))
    .then(closeAllPopups)
    .catch(err => console.error(err));
  }

  function handleUpdateUser({ name, description }) {
    api.editProfile({ name, description })
    .then(data => setCurrentUser(data))
    .then(closeAllPopups)
    .catch(err => console.error(err));
  }

  function handleCardDelete(card) {

    api.deleteCard(card._id)
    .then(() => { 
      const cardsFiltered = cards.filter((item) => {
        if(card._id === item._id) {
          return false;
        } else { return true; }
      });

      setCards(cardsFiltered);
    })
    .catch(err => console.error(err));;
  }
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const changeCardLikeState = (newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    };

    if (isLiked) {
      api.dislike(card._id)
      .then(changeCardLikeState)
      .catch(err => console.error(err));;
    } else {
      api.like(card._id)
      .then(changeCardLikeState)
      .catch(err => console.error(err));;
    }
  }
  
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true); 
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false); 
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setUserEmail(email);
  }

  function MainPage() {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={userEmail} />
        <Routes>
          <Route path="/sign-up" />
          <Route path="/sign-in" />
        </Routes>
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm name="confirmation" title="Вы уверены?" buttonText="Да"/>
      </CurrentUserContext.Provider>
    )
  }

  return (
    <Routes>
      <Route 
        path="/"
        element={
          <ProtectedRouteElement 
            element={MainPage}
            loggedIn={loggedIn}
          />
        }
      />
      <Route path="/sign-up" element={<Register />}/>
      <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>} />
    </Routes>
  );
}

export default App;
