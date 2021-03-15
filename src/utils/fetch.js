//Fetch.js berisi semua sambungan fe - be

import axios from 'axios';
import { getToken, clearStorage } from './storage';

//Fungsi buat nge get token dari localstorage
export function BEARER_AUTH() {
  return { Authorization: `${getToken()}` };
}

const BASE_URL = 'http://localhost:8080/admin';

const fetch = (url, method, param1, param2) => {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then((res) => {
        //cek jika token valid atau tidak
        //jika tidak valid maka storage yang berisi token akan dibersihkan
        //jika storage kosong maka akan langsung kembali ke login (useEffect di App.js)
        if (res.data.message === 'token tidak valid') clearStorage();
        //Lainya, langsung dikasih res.data
        else resolve(res.data);
      })
      .catch((err) => {
        //jika dapet error
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.',
        };
        if (!err.message) reject(defaultError);
        else reject(err);
      });
  });
};

// Tempat fetch nya disini

// Buat Login
export const loginAdmin = async (data) =>
  await fetch(`${BASE_URL}/login`, 'post', data);

// Ambil data profile
export const getProfile = async () =>
  await fetch(`${BASE_URL}/profile`, 'get', { headers: BEARER_AUTH() });

// Buat halaman statistik
export const getStatistic = async () =>
  await fetch(`${BASE_URL}/statistic`, 'get', { headers: BEARER_AUTH() });

// Buat halaman pengaduan
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

export const getDokumenPengaduan = async () =>
  await fetch(`${BASE_URL}/laporan/pengaduan`, 'get', {
    headers: BEARER_AUTH(),
  });

export const addTanggapanPengaduan = async (id, data) =>
  await fetch(`${BASE_URL}/pengaduan/${id}/response`, 'post', data, {
    headers: BEARER_AUTH(),
  });

export const deletePengaduan = async (id) =>
  await fetch(`${BASE_URL}/pengaduan/${id}`, 'delete', {
    headers: BEARER_AUTH(),
  });

// Buat halaman pengguna
export const getAllUsers = async (page) =>
  await fetch(`${BASE_URL}/user?page=${page}`, 'get', {
    headers: BEARER_AUTH(),
  });

export const putDataUser = async (id, data) =>
  await fetch(`${BASE_URL}/user/${id}`, 'put', data, {
    headers: BEARER_AUTH(),
  });

export const deleteUser = async (id) =>
  await fetch(`${BASE_URL}/user/${id}`, 'delete', {
    headers: BEARER_AUTH(),
  });

// Buat halaman petugas
export const getAllOperator = async (page) =>
  await fetch(`${BASE_URL}/operator?page=${page}`, 'get', {
    headers: BEARER_AUTH(),
  });

export const addOperator = async (data) =>
  await fetch(`${BASE_URL}/operator`, 'post', data, {
    headers: BEARER_AUTH(),
  });

export const editOperator = async (id, data) =>
  await fetch(`${BASE_URL}/operator/${id}`, 'put', data, {
    headers: BEARER_AUTH(),
  });

export const deleteOperator = async (id) =>
  await fetch(`${BASE_URL}/operator/${id}`, 'delete', {
    headers: BEARER_AUTH(),
  });
