import React, { useState, useEffect } from 'react';
import { register } from './action';
import { useHistory } from 'react-router-dom';
import Modal, { openModal, closeModal } from '../../component/fragment/Modal';
import moment from 'moment';
const date = () => {
  return moment().format();
};

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nik, setNik] = useState('');
  const [phone, setPhone] = useState('');
  const [response, setResponse] = useState({ success: false });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register(
      { username, password, name, nik, phone, createAt: date() },
      setResponse
    );
  };

  useEffect(() => {
    if (response.success) openModal('suksesDaftar');
    else setMessage(response.message);
  }, [response]);

  const handleModal = () => {
    closeModal('suksesDaftar');
    history.push('/login');
  };

  return (
    <div className="container d-flex h-100 justify-content-center align-items-center">
      <div className="col-sm-6 card my-5">
        <div className="card-header bg-primary text-white text-center">
          <h4>Pengaduan App</h4>
          <strong className="text-warning">User Sign Up</strong>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-danger mt-1">{message}</div>}
          <form>
            <input
              placeholder="Nama Lengkap"
              autoFocus="true"
              type="text"
              className="form-control mb-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Username"
              autoFocus="true"
              type="text"
              className="form-control mb-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Nomor Telepon"
              autoFocus="true"
              type="text"
              className="form-control mb-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              placeholder="NIK"
              autoFocus="true"
              type="text"
              className="form-control mb-1"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
            />
            <input
              placeholder="password"
              type="password"
              className="form-control mb-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="false"
            />
            <button
              className="btn btn-block btn-primary mb-1"
              onClick={(e) => handleSubmit(e)}
            >
              Daftar
            </button>
            <button
              className="btn btn-outline-primary btn-block mb-1"
              onClick={() => history.push('/login')}
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
      <Modal
        header="Berhasil mendaftar"
        id="suksesDaftar"
        confirmText="Masuk"
        onClick={() => handleModal()}
      >
        <p className="text-center">Akun telah berhasil didaftarkan</p>
      </Modal>
    </div>
  );
}
