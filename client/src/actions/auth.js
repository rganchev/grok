import { SERVER_URL } from '../constants/server';

function requestRegister(name, email, password) {
  const body = new FormData();
  body.append('name', name);
  body.append('email', email);
  body.append('password', password);

  return fetch(`${SERVER_URL}/auth/register`, {
    method: 'POST',
    body,
    mode: 'cors',
    credentials: 'include',
  });
}

function requestLogin(email, password) {
  const body = new FormData();
  body.append('email', email);
  body.append('password', password);

  return fetch(`${SERVER_URL}/auth/login`, {
    method: 'POST',
    body,
    mode: 'cors',
    credentials: 'include',
  });
}

function requestMe() {
  return fetch(`${SERVER_URL}/auth/me`, { mode: 'cors', credentials: 'include' });
}

export function register(name, email, password) {
  return (dispatch) => {
    dispatch({ type: 'REGISTER_REQUEST' });

    return requestRegister(name, email, password)
      .then(response => response.json())
      .then((user) => {
        dispatch({ type: 'REGISTER_SUCCESS', user });
      })
      .catch(() => {
        dispatch({ type: 'REGISTER_FAILURE' });
      });
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    return requestLogin(email, password)
      .then(response => response.json())
      .then((user) => {
        if (user.id) {
          dispatch({ type: 'LOGIN_SUCCESS', user });
        } else {
          dispatch({ type: 'LOGIN_FAILURE' });
        }
      })
      .catch(() => {
        dispatch({ type: 'LOGIN_FAILURE' });
      });
  };
}

export function renewSession() {
  return (dispatch) => {
    dispatch({ type: 'RENEW_SESSION_REQUEST' });

    return requestMe()
      .then(response => response.json())
      .then((user) => {
        if (user.id) {
          dispatch({ type: 'RENEW_SESSION_SUCCESS', user });
        } else {
          dispatch({ type: 'RENEW_SESSION_FAILURE' });
        }
      })
      .catch(() => {
        dispatch({ type: 'RENEW_SESSION_FAILURE' });
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT_REQUEST' });

    return fetch(`${SERVER_URL}/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    })
      .then(() => {
        dispatch({ type: 'LOGOUT_SUCCESS' });
      });
  };
}
