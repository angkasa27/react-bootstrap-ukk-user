import React, { useState, useEffect } from 'react';
import Modal from '../../component/fragment/Modal';
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
      nik: data.nik,
      name,
      username,
      phone,
    });
  };

  return (
    <Modal
      header="Edit pengguna"
      id="editUser"
      confirmText="Simpan"
      onClick={() => onSubmit()}
    >
      <form>
        <InputText
          name="name"
          label="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="col-md-12"
        />

        <InputText
          name="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="col-md-12"
        />

        <InputText
          name="phone"
          label="Nomor Telepon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="col-md-12"
        />
      </form>
    </Modal>
  );
}
