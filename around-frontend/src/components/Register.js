import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../blocks/splash-page/splash-page.css';
import PopupWithForm from './PopupWithForm';

function Register({ registered, handleRegisterSubmit, email, setEmail, password, setPassword, onClose }) {

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) { 
      history.push('/around');
    }
  }, [history]);

  useEffect(() => {
    if (registered) {
     
      history.push('/signin');
    }
  }, [history, registered]);

  return (
      <>
        <Link className='splash-page__call-out' to='/signin'>
          Log in
        </Link>
        <PopupWithForm
          name='signup'
          title='Sign up'
          isOpen={true}
          onClose={onClose}
          onSubmit={handleRegisterSubmit}
        >
          <input
            className='splash-page__input'
            type='email'
            id='email'
            name='email'
            placeholder='Email'
            required
            value={email || ''}
            onChange={e => setEmail(e.target.value)}
            autoComplete="on"
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
            onChange={e => setPassword(e.target.value)}
            autoComplete="on"
          />
          <button
            className='splash-page__submit'
            // onClick={handleSubmit}
            to='/around'
          >
            Sign up
          </button>
          <Link className='splash-page__text' to='/signin'>
            Already a member? Log in here!
          </Link>
        </PopupWithForm>
      </>
    );
  }

export default Register;

