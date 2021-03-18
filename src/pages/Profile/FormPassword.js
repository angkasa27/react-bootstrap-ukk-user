import React, { useState } from 'react';

export default function ModalEdit({ data, handleSubmit }) {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const onSubmit = () => {
    if (password === rePassword)
      handleSubmit({
        password,
      });
  };

  return (
    <div className=" col-4 card  shadow p-4 rounded-3 border-0 ml-4">
      <span className="input-span">Password</span>
      <input
        placeholder="Password"
        autoFocus="true"
        type="password"
        className="form-control mb-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span className="input-span">Ketik Ulang Password</span>
      <input
        placeholder="Ketik Ulang Password"
        autoFocus="true"
        type="password"
        className="form-control mb-1"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
      />
      <button
        type="button"
        class="btn btn-primary mt-3"
        onClick={() => onSubmit()}
      >
        Kirim
      </button>
    </div>
  );
}
