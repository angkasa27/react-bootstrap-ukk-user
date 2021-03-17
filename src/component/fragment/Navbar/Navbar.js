import React from 'react';
import { NavLink } from 'react-router-dom';
import { clearStorage } from '../../../utils/storage';
import { useHistory } from 'react-router-dom';
import Modal, { openModal, closeModal } from '../Modal';

export default function Navbar() {
  const history = useHistory();

  const handleLogout = () => {
    closeModal('logout');
    clearStorage();
    history.push('/login');
  };

  return (
    <div className="navbar navbar-expand-lg bg-dark navbar-dark">
      <p className="navbar-brand ">Web Pengaduan</p>

      {/* Show and ghide menu */}
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="menu"
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* Menu */}
      <div className="navbar-collapse collapse" id="menu">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/statistik">
              Statistik
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/pengaduan">
              Pengaduan
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>

          {/* Cek apakah rolenya admin
          jika admin maka menu petugas muncul */}
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => openModal('logout')}
              style={{ cursor: 'pointer' }}
            >
              Logout
            </span>
          </li>
        </ul>
      </div>
      <Modal
        header="logout"
        id="logout"
        confirmText="Logout"
        onClick={() => handleLogout()}
      >
        Apakah anda yakin ingin keluar dari akun ini
      </Modal>
    </div>
  );
}
