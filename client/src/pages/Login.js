import React, { useState, useContext, useEffect } from 'react';
import { FormControl } from '../components/FormControl/FormControl';
import { Button } from '../components/Button/Button.styles';
import { Header } from '../components/Header/Header.styles';
import AuthContext from '../context/AuthContext';
import {
  JoinContainerDiv,
  JoinMain,
} from '../components/JoinContainer/JoinContainer.styles';

export const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      alert(error);
      setUser({
        ...user,
        password: '',
      });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Email and password is required');
    } else {
      login({
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
        <p>Please enter your credentials to login</p>
      </Header>

      <JoinMain>
        <form onSubmit={handleSubmit}>
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
          <div className='buttons' style={{ marginTop: '2rem' }}>
            <Button type='submit'>LOG IN</Button>
          </div>
        </form>
      </JoinMain>
    </JoinContainerDiv>
  );
};
