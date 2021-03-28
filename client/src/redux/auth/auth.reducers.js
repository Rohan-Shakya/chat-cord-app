import { AuthActionTypes } from './auth.types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.token ? true : false,
  loading: true,
  user: null,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case AuthActionTypes.REGISTER_FAIL:
    case AuthActionTypes.AUTH_ERROR:
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case AuthActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case AuthActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
