import { encrypt, decrypt } from './encryption';
const ACCESS_TOKEN = 'myc_dash_access_token';
const ROLE = 'myc_dash_level';

export function setToken(value) {
  localStorage.setItem(ACCESS_TOKEN, value);
}

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}

export function setRole(value) {
  localStorage.setItem(ROLE, encrypt(value));
}

export function getRole() {
  const level = localStorage.getItem(ROLE);
  if (level) return decrypt(localStorage.getItem(ROLE));
}

export function clearStorage() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(ROLE);
}
