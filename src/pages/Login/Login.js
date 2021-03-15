import React, { useState, useEffect } from 'react';
import { login } from './action';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState({ success: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password }, setResponse);
  };

  useEffect(() => {
    if (response.success) history.push('/');
    else setMessage(response.message);
  }, [response]);

  return (
    <div className="container d-flex h-100 justify-content-center align-items-center">
      <div className="col-sm-6 card my-5">
        <div className="card-header bg-primary text-white text-center">
          <h4>Pengaduan App</h4>
          <strong className="text-warning">Admin Sign In</strong>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-danger mt-1">{message}</div>}
          <form>
            <input
              placeholder="username"
              autoFocus="true"
              type="text"
              className="form-control mb-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
