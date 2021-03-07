import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import {
  NavbarContainer,
  NavbarLink,
  NavbarA,
  NavbarNavLink,
  NavbarUL,
  NavbarUserImage,
} from './Navbar.styles';

export const Navbar = () => {
  const history = useHistory();
  const [path, setPath] = useState('/');
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  useEffect(() => {
    setPath(window.location.pathname);
  }, [history.location.pathname]);

  const onLogout = () => {
    logout();
    history.push('/');
  };

  const authLinks = (
    <>
      {user && (
        <>
          <li>
            <NavbarA
              href={`https://chat-cord-101.herokuapp.com/api/users/${user._id}/avatar`}
              target='_blank'
              rel='noreferrer'
            >
              <NavbarUserImage
                src={`https://chat-cord-101.herokuapp.com/api/users/${user._id}/avatar`}
                title={user.name}
                alt={user.name}
              />
            </NavbarA>
          </li>
          <li>{user.name.split(' ')[0]}</li>
        </>
      )}

      {path === '/chat' ? (
        ''
      ) : (
        <>
          {path === '/' ? (
            <>
              <li>
                <NavbarLink to='/me/avatar'>Update Profile</NavbarLink>
              </li>
              <li>
                <NavbarA onClick={onLogout} href='#!'>
                  <i className='fas fa-sign-out-alt'></i>
                  <span className='hide-sm'>Logout</span>
                </NavbarA>
              </li>{' '}
            </>
          ) : (
            <li>
              <NavbarA onClick={onLogout} href='#!'>
                <i className='fas fa-sign-out-alt'></i>
                <span className='hide-sm'>Logout</span>
              </NavbarA>
            </li>
          )}
        </>
      )}
    </>
  );

  const guestLinks = (
    <>
      <li>
        <NavbarNavLink to='/register'>Register</NavbarNavLink>
      </li>
      <li>
        <NavbarNavLink to='/login'>Login</NavbarNavLink>
      </li>
    </>
  );

  return (
    <NavbarContainer>
      <h1>
        <NavbarLink to='/'>
          <i className='fas fa-smile' style={{ marginRight: '1rem' }}></i>
          Chat Cord
        </NavbarLink>
      </h1>
      <NavbarUL>{isAuthenticated ? authLinks : guestLinks}</NavbarUL>
    </NavbarContainer>
  );
};
