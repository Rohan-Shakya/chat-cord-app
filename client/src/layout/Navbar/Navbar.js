import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { logout } from '../../redux/auth/auth.actions';
import {
  selectIsAuthenticated,
  selectUser,
} from '../../redux/auth/auth.selectors';
import {
  NavbarContainer,
  NavbarLink,
  NavbarA,
  NavbarNavLink,
  NavbarUL,
  NavbarUserImage,
} from './Navbar.styles';

const Navbar = ({ isAuthenticated, logout, user }) => {
  const history = useHistory();
  const [path, setPath] = useState('/');

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
              href={`/api/users/${user._id}/avatar`}
              target='_blank'
              rel='noreferrer'
            >
              <NavbarUserImage
                src={`/api/users/${user._id}/avatar`}
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

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  user: selectUser,
});

export default connect(mapStateToProps, { logout })(Navbar);
