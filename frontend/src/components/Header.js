import React from "react";
import logo from '../images/header-logo.svg';
import { useNavigate } from 'react-router-dom';

function Header({ userEmail }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('token');
    navigate('/sign-in');
  }

    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Место"/>
        <div className="header__group">
          <p className="header__user-email">{userEmail}</p>
          <button onClick={signOut} className="header__link">Выйти</button>
        </div>
      </header>
    )
}

export default Header;