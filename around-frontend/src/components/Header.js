import React from 'react';
import HeaderLink from './HeaderLinks.js'
import headerLogo from '../images/icons/header-logo.svg';

function Header({ userEmail, loggedIn, handleSignOut }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Around the U.S. Logo"
      />
      <HeaderLink loggedIn={loggedIn} userEmail={userEmail} handleSignOut={handleSignOut}/>
    </header>
  )
}

export default Header; 