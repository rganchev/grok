import { get, post } from '../utils/http';
import { SERVER_URL } from '../constants/server';
import asyncAction from './asyncAction';

export function register(name, email, password) {
  return asyncAction('REGISTER', () => post(`${SERVER_URL}/auth/register`, { name, email, password }));
}

export function login(email, password) {
  return asyncAction('LOGIN', () => post(`${SERVER_URL}/auth/login`, { email, password })
      .then(user => (user.id ? user : Promise.reject())));
}

export function renewSession() {
  return asyncAction('RENEW_SESSION', () => get(`${SERVER_URL}/auth/me`)
      .then(user => (user.id ? user : Promise.reject())));
}

export function logout() {
  return asyncAction('LOGOUT', () => get(`${SERVER_URL}/auth/logout`));
}
