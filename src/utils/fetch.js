import axios from 'axios';
// import { useLocation } from 'react-router-dom';

import { getToken, clearStorage } from './storage';

// const BEARER_AUTH = { Authorization: `${getToken()}` };
export function BEARER_AUTH() {
  return { Authorization: `${getToken()}` };
}

const BASE_URL = 'http://localhost:8080/users';

const fetch = (url, method, param1, param2) => {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then((res) => {
        if (res.data.message === 'token tidak valid') clearStorage();
        else resolve(res.data);
      })
      .catch((err) => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.',
        };
        // if (err === 'token tidak valid')
        if (!err.message) reject(defaultError);
        else reject(err);
      });
  });
};

export const loginUser = async (data) =>
  await fetch(`${BASE_URL}/login`, 'post', data);

export const registerUser = async (data) =>
  await fetch(`${BASE_URL}/register`, 'post', data);

export const getProfile = async () =>
  await fetch(`${BASE_URL}/profile`, 'get', { headers: BEARER_AUTH() });

export const getStatistic = async () =>
  await fetch(`${BASE_URL}/statistic`, 'get', { headers: BEARER_AUTH() });

export const getAllPengaduan = async (page) =>
  await fetch(`${BASE_URL}/pengaduan?page=${page}`, 'get', {
    headers: BEARER_AUTH(),
  });

export const getDetailPengaduan = async (id) =>
  await fetch(`${BASE_URL}/pengaduan/${id}`, 'get', {
    headers: BEARER_AUTH(),
  });

export const putStatusPengaduan = async (id, data) =>
  await fetch(`${BASE_URL}/pengaduan/${id}/status`, 'put', data, {
    headers: BEARER_AUTH(),
  });

export const addPengaduan = async (data) =>
  await fetch(`${BASE_URL}/pengaduan`, 'post', data, {
    headers: BEARER_AUTH(),
  });

export const editProfile = async (data) =>
  await fetch(`${BASE_URL}/profile`, 'put', data, { headers: BEARER_AUTH() });

export const editPassword = async (data) =>
  await fetch(`${BASE_URL}/password`, 'put', data, { headers: BEARER_AUTH() });
