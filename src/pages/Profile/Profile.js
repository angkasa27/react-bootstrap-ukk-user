import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'querystring';
import { getUserProfile, updateProfile, updatePassword } from './action';
import Navbar from '../../component/fragment/Navbar';
import FormProfile from './FormProfile';
import FormPassword from './FormPassword';

export default function Profile() {
  const history = useHistory();
  const location = useLocation();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const { edit = false, changePassword = false } = queryString.parse(
    location.search.replace('?', '')
  );

  useEffect(() => {
    getUserProfile(setResponse);
  }, [loading]);

  const handleUpdate = (v) => {
    updateProfile(v, setLoading);
    history.push('/profile');
  };

  const handlePassword = (v) => {
    updatePassword(v, setLoading);
    history.push('/profile');
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <h1 className="my-4 h1">Profile</h1>
        </div>
        <div className="row">
          <div className="col-6 card shadow p-4 rounded-3 border-0">
            <span className="">Nama Lengkap</span>
            <p className="h4">
              <strong>{response.data && response.data.nama}</strong>
            </p>

            <span>Username</span>
            <p className="h5">
              <strong>{response.data && response.data.username}</strong>
            </p>

            <span>NIK</span>
            <p className="h5">
              <strong>{response.data && response.data.nik}</strong>
            </p>

            <span>Nomor Telepon</span>
            <p className="h5">
              <strong>{response.data && response.data.telp}</strong>
            </p>

            <div className="row mt-2">
              <button
                type="button"
                class="btn btn-primary col-5 mx-1"
                onClick={() =>
                  history.push({
                    search: queryString.stringify({
                      edit: true,
                    }),
                  })
                }
              >
                Edit Profile
              </button>
              <button
                type="button"
                class="btn btn-warning col-5 mx-1"
                onClick={() =>
                  history.push({
                    search: queryString.stringify({
                      changePassword: true,
                    }),
                  })
                }
              >
                Ganti Password
              </button>
            </div>
          </div>
          {edit && (
            <FormProfile data={response.data} handleSubmit={handleUpdate} />
          )}
          {changePassword && <FormPassword handleSubmit={handlePassword} />}
        </div>
      </div>
    </div>
  );
}
