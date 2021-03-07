import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormControl } from '../components/FormControl/FormControl';
import { Button } from '../components/Button/Button.styles';
import AuthContext from '../context/AuthContext';
import { Header } from '../components/Header/Header.styles';
import { Spinner } from '../layout/Spinner/Spinner';
import {
  JoinContainerDiv,
  JoinMain,
  JoinSelectOptions,
} from '../components/JoinContainer/JoinContainer.styles';

export const Home = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser, loading } = authContext;
  const [text, setText] = useState({
    username: '',
    room: 'Javascript',
  });

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setText({ ...text, username: user ? user.name.split(' ')[0] : '' });
    // eslint-disable-next-line
  }, [user]);

  const handleChange = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {user !== null && !loading ? (
        <JoinContainerDiv>
          <Header>
            <h1>
              <i className='fas fa-smile'></i> Join Chat Room{' '}
              <i className='fas fa-smile'></i>
            </h1>
            <br />
            {user && (
              <>
                <a
                  href={`/api/users/${user._id}/avatar`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <img
                    src={`/api/users/${user._id}/avatar`}
                    title={user.name}
                    alt={user.name}
                    style={{
                      height: '100px',
                      borderRadius: '10%',
                      marginBottom: '1rem',
                    }}
                  />
                </a>
              </>
            )}
          </Header>

          <JoinMain>
            <form onSubmit={handleSubmit}>
              <FormControl
                label='Username'
                type='text'
                name='username'
                handleChange={handleChange}
                value={text.username}
              />

              <div className='form-control'>
                <label htmlFor='room'>Room</label>
                <JoinSelectOptions
                  name='room'
                  id='room'
                  onChange={handleChange}
                  value={text.room}
                >
                  <option value='Javascript'>Javascript</option>
                  <option value='Python'>Python</option>
                  <option value='PHP'>PHP</option>
                  <option value='C#'>C#</option>
                  <option value='Ruby'>Ruby</option>
                  <option value='Java'>Java</option>
                </JoinSelectOptions>
              </div>
              <div className='buttons' style={{ marginTop: '2rem' }}>
                <Link to={`/chat?username=${text.username}&room=${text.room}`}>
                  <Button type='submit'>Join Chat</Button>
                </Link>
              </div>
            </form>
          </JoinMain>
        </JoinContainerDiv>
      ) : (
        <Spinner />
      )}
    </>
  );
};
