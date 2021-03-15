import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Modal from '../../component/fragment/Modal';
import InputText from '../../component/fragment/Input/InputText';

export const openModal = (id) => {
  $(`#${id}`).modal('show');
};

export const closeModal = (id) => {
  $(`#${id}`).modal('hide');
};

export function ModalDelete() {
  return (
    <Modal header="Hapus Petugas" id="deleteAdmin" confirmText="Hapus">
      Apakah anda yakin ingin menghapus akun ini?
    </Modal>
  );
}

export function ModalEdit({ data, handleSubmit }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.name);
      setUsername(data.username);
      setPhone(data.phone);
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
    <Modal
      header="Edit Petugas"
      id="editAdmin"
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
