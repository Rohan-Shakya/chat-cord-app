import React, { useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {
  JoinContainerDiv,
  JoinMain,
} from '../JoinContainer/JoinContainer.styles';
import { Header } from '../Header/Header.styles';
import { FormControl } from '../FormControl/FormControl';
import { Spinner } from '../../layout/Spinner/Spinner';
import { Button } from '../Button/Button.styles';
import { ButtonsContainer, ToggleButton } from './ProfileUpdate.styles';
import { update } from '../../redux/auth/auth.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectIsAuthenticated,
  selectUser,
} from '../../redux/auth/auth.selectors';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ProfileUpdate = ({
  isAuthenticated,
  user,
  update,
  history,
  ...props
}) => {
  console.log(user);
  const [files, setFiles] = useState([]);
  const [updateBtn, setUpdateBtn] = useState('Profile');
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
  });

  useEffect(() => {
    setUserForm({
      name: user.name,
      email: user.email,
    });

    // eslint-disable-next-line
  }, []);

  const { name, email } = userForm;

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '') {
      alert('Please enter all the fields');
    } else {
      update({
        name,
        email,
      });
      window.location.href = '/';
    }
  };

  const ProfilePicture = (
    <JoinContainerDiv>
      <Header>
        <h1>Upload New Profile Picture</h1>
        <br />
        <p>Please upload valid picture (jpg, jpeg, png)!</p>
      </Header>
      <JoinMain>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={false}
          dropOnPage
          server={{
            process: {
              url: '/api/users/me/avatar',
              headers: {
                'x-auth-token': `${localStorage.token}`,
              },
            },
          }}
          name='avatar'
          labelIdle='Drag & Drop your files'
          acceptedFileTypes={props.fileTypes}
        />
        <div className='done' onClick={() => (window.location.href = '/')}>
          <Button className='btn'>Done</Button>
        </div>
      </JoinMain>
    </JoinContainerDiv>
  );

  const ProfileDetails = (
    <JoinContainerDiv>
      <Header>
        <h1>Update Profile Details</h1>
        <br />
        <p>Please update your valid credentials!</p>
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

          <div className='buttons' style={{ marginTop: '2rem' }}>
            <Button type='submit'>Update</Button>
          </div>
        </form>
      </JoinMain>
    </JoinContainerDiv>
  );

  return (
    <>
      {!user ? (
        <Spinner />
      ) : (
        <>
          <ButtonsContainer>
            <ToggleButton onClick={() => setUpdateBtn('Picture')}>
              Profile Picture
            </ToggleButton>
            <ToggleButton onClick={() => setUpdateBtn('Details')}>
              Profile Details
            </ToggleButton>
          </ButtonsContainer>

          {updateBtn === 'Picture' ? ProfilePicture : ProfileDetails}
        </>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  user: selectUser,
});

export default connect(mapStateToProps, { update })(ProfileUpdate);
