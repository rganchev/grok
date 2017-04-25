import { combineReducers } from 'redux';

const loginError = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return false;

    case 'LOGIN_FAILURE':
      return true;

    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'RENEW_SESSION_SUCCESS':
      return action.data;

    case 'LOGIN_FAILURE':
    case 'LOGOUT_SUCCESS':
      return null;

    default:
      return state;
  }
};

const sessionInitialized = (state = false, action) => {
  switch (action.type) {
    case 'RENEW_SESSION_SUCCESS':
    case 'RENEW_SESSION_FAILURE':
      return true;

    default:
      return state;
  }
};

export default combineReducers({
  loginError,
  user,
  sessionInitialized,
});
