import React, { useState, useEffect } from 'react';
import { FormControl } from '../components/FormControl/FormControl';
import { Button } from '../components/Button/Button.styles';
import { Header } from '../components/Header/Header.styles';
import {
  JoinContainerDiv,
  JoinMain,
} from '../components/JoinContainer/JoinContainer.styles';
import { connect } from 'react-redux';
import { login, clearErrors } from '../redux/auth/auth.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectError,
  selectIsAuthenticated,
} from '../redux/auth/auth.selectors';

const Login = ({ login, error, clearErrors, isAuthenticated, history }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
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
  }, [error, isAuthenticated, history]);

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

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  error: selectError,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
