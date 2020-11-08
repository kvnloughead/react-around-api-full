import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../blocks/splash-page/splash-page.css';
import PopupWithForm from './PopupWithForm';
import auth from '../utils/Auth';

function Login({ loggedIn, email, setEmail, password, setPassword, handleLoginSubmit, userEmail, setUserEmail, onClose }) {
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/around');
      setUserEmail(email || userEmail);
    }
  });

  return (
    <>
      <Link className='splash-page__call-out' to='/signup'>
        Sign up
      </Link>
      <PopupWithForm
        name='signin'
        title='Log in'
        isOpen={true}
        onClose={onClose}
        onSubmit={handleLoginSubmit}
      >
        <input
          className='splash-page__input'
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          minLength='2'
          maxLength='40'
          required
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='on'
        />
        <input
          className='splash-page__input'
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          minLength='2'
          maxLength='200'
          required
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='on'
        />
        <button
          className='splash-page__submit'
          to='/around'
        >
          Log in
        </button>
        <Link className='splash-page__text' to='/signup'>
          Not a member yet? Sign up here!
        </Link>
      </PopupWithForm>
    </>
  );
}

export default Login;
