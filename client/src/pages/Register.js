import React, { useState, useContext, useEffect } from 'react';
import { FormControl } from '../components/FormControl/FormControl';
import {
  JoinContainerDiv,
  JoinMain,
} from '../components/JoinContainer/JoinContainer.styles';
import { Button } from '../components/Button/Button.styles';
import AuthContext from '../context/AuthContext';
import { Header } from '../components/Header/Header.styles';

export const Register = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const authContext = useContext(AuthContext);

  const { register, error, avatar, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated && !avatar) {
      props.history.push('/me/avatar');
    } else if (isAuthenticated && avatar) {
      props.history.push('/');
    }

    if (
      error === 'User already exists' ||
      error === 'Please enter a password with 6 or more characters'
    ) {
      alert(error);
      setUser({
        name: '',
        email: '',
        password: '',
        password2: '',
      });
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { name, email, password, password2 } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      alert('Please enter all the fields');
    } else if (password !== password2) {
      alert('Password dd not match');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <JoinContainerDiv>
      <Header>
        <h1>
          Welcome to Chat Cord <i className='fas fa-smile'></i>
        </h1>
        <br />
        <p>Please fill this form to create an account!</p>
      </Header>
      <JoinMain>
        <form onSubmit={handleSubmit}>
          <FormControl
            label='Name'
            type='text'
            name='name'
            handleChange={handleChange}
            value={name}
          />

          <FormControl
            label='Email'
            type='email'
            name='email'
            handleChange={handleChange}
            value={email}
          />

          <FormControl
            label='Password'
            type='password'
            name='password'
            handleChange={handleChange}
            value={password}
          />

          <FormControl
            label='Confirm password'
            type='password'
            name='password2'
            handleChange={handleChange}
            value={password2}
          />
          <div className='buttons' style={{ marginTop: '2rem' }}>
            <Button type='submit'>Register</Button>
          </div>
        </form>
      </JoinMain>
    </JoinContainerDiv>
  );
};
