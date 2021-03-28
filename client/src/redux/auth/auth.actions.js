import { AuthActionTypes } from './auth.types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

//   Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      'https://chat-cord-101.herokuapp.com/api/users/me'
    );
    dispatch({ type: AuthActionTypes.USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AuthActionTypes.AUTH_ERROR, payload: err.message });
  }
};

//   Register User
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      'https://chat-cord-101.herokuapp.com/api/users',
      formData,
      config
    );
    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: AuthActionTypes.REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

//   Login User
export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      'https://chat-cord-101.herokuapp.com/api/auth',
      formData,
      config
    );
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

//   Update User
export const update = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.patch(
      'https://chat-cord-101.herokuapp.com/api/users/me',
      formData,
      config
    );

    dispatch({
      type: AuthActionTypes.UPDATE_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    alert(err.data);
    dispatch(loadUser());
  }
};

// Logout
export const logout = () => {
  return { type: AuthActionTypes.LOGOUT, payload: null };
};

// Clear Errors
export const clearErrors = () => {
  return { type: AuthActionTypes.CLEAR_ERRORS };
};
