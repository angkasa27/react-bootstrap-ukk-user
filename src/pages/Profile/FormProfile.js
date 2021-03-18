import React, { useState, useEffect } from 'react';
import InputText from '../../component/fragment/Input/InputText';

export default function ModalEdit({ data, handleSubmit }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.nama);
      setUsername(data.username);
      setPhone(data.telp);
    }
  }, [data]);

  const onSubmit = () => {
    handleSubmit({
      name,
      username,
      phone,
    });
  };

  return (
    <div className=" col-4 card  shadow p-4 rounded-3 border-0 ml-4">
      <span className="input-span">Nama</span>
      <input
        placeholder="Nama Lengkap"
        autoFocus="true"
        type="text"
        className="form-control mb-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="input-span">Username</span>
      <input
        placeholder="Username"
        autoFocus="true"
        type="text"
        className="form-control mb-1"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <span className="input-span">Nomor Telepon</span>
      <input
        placeholder="Nomor Telepon"
        autoFocus="true"
        type="text"
        className="form-control mb-1"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
